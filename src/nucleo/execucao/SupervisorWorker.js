/*
 * Supervisor genérico de um Web Worker de execução (não sabe nada de Python).
 *
 * - Protocolo: { id, tipo, dados } → { id, ok, resultado | erro }; mensagens sem
 *   id são de progresso ({ tipo: 'progresso', ... }) e vão para `aoProgresso`.
 * - Um pedido por vez: o interpretador é single-thread, então os pedidos entram numa fila.
 * - Cão de guarda: se um pedido passa de `tempoLimiteMs`, o Worker é encerrado com
 *   terminate() e um novo é criado no próximo pedido. É a última linha de defesa
 *   contra código que trava sem passar pelo rastreamento de linhas.
 */
export class TempoEsgotadoError extends Error {
  constructor() {
    super('A execução passou do tempo limite e o interpretador foi reiniciado.')
    this.name = 'TempoEsgotadoError'
  }
}

export class SupervisorWorker {
  /**
   * @param {object} opcoes
   * @param {() => Worker} opcoes.criarWorker
   * @param {number} opcoes.tempoLimiteMs
   * @param {(progresso: object) => void} [opcoes.aoProgresso]
   */
  constructor({ criarWorker, tempoLimiteMs, aoProgresso = () => {} }) {
    this.criarWorker = criarWorker
    this.tempoLimiteMs = tempoLimiteMs
    this.aoProgresso = aoProgresso
    this.worker = null
    this.pronto = null
    this.pendentes = new Map()
    this.proximoId = 1
    this.fila = Promise.resolve()
    this.reinicios = 0
  }

  /** Cria o Worker (se preciso) e espera ele carregar o interpretador. */
  iniciar() {
    if (!this.pronto) {
      this.worker = this.criarWorker()
      this.worker.onmessage = (evento) => this.receber(evento.data)
      this.worker.onerror = (evento) => this.falharTudo(new Error(evento.message || 'Falha no Worker de execução'))
      this.pronto = this.enviar('iniciar', {}, Infinity).catch((erro) => {
        this.encerrar()
        throw erro
      })
    }
    return this.pronto
  }

  /** Enfileira um pedido; resolve com o resultado do Worker. */
  pedir(tipo, dados, tempoLimiteMs = this.tempoLimiteMs) {
    const tarefa = this.fila.then(async () => {
      await this.iniciar()
      return this.enviar(tipo, dados, tempoLimiteMs)
    })
    this.fila = tarefa.catch(() => {})
    return tarefa
  }

  enviar(tipo, dados, tempoLimiteMs) {
    const id = this.proximoId++
    return new Promise((resolve, reject) => {
      const temporizador = Number.isFinite(tempoLimiteMs)
        ? setTimeout(() => {
            this.pendentes.delete(id)
            this.reiniciar()
            reject(new TempoEsgotadoError())
          }, tempoLimiteMs)
        : null
      this.pendentes.set(id, { resolve, reject, temporizador })
      this.worker.postMessage({ id, tipo, dados })
    })
  }

  receber(mensagem) {
    if (mensagem.id == null) {
      if (mensagem.tipo === 'progresso') this.aoProgresso(mensagem)
      return
    }
    const pendente = this.pendentes.get(mensagem.id)
    if (!pendente) return
    this.pendentes.delete(mensagem.id)
    clearTimeout(pendente.temporizador)
    if (mensagem.ok) pendente.resolve(mensagem.resultado)
    else pendente.reject(new Error(mensagem.erro))
  }

  falharTudo(erro) {
    for (const { reject, temporizador } of this.pendentes.values()) {
      clearTimeout(temporizador)
      reject(erro)
    }
    this.pendentes.clear()
  }

  /** Mata o Worker travado; o próximo pedido cria outro do zero. */
  reiniciar() {
    this.reinicios++
    this.encerrar()
  }

  encerrar() {
    this.worker?.terminate()
    this.worker = null
    this.pronto = null
    this.falharTudo(new TempoEsgotadoError())
  }
}
