import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SupervisorWorker, TempoEsgotadoError } from './SupervisorWorker.js'

// Worker falso: responde na hora, a não ser que o pedido seja "travar".
class WorkerFalso {
  static criados = []
  constructor() {
    this.encerrado = false
    WorkerFalso.criados.push(this)
  }
  postMessage({ id, tipo, dados }) {
    if (tipo === 'travar') return
    queueMicrotask(() => {
      if (this.encerrado) return
      if (tipo === 'iniciar') this.onmessage({ data: { tipo: 'progresso', fase: 'baixando' } })
      if (tipo === 'falhar') return this.onmessage({ data: { id, ok: false, erro: 'deu ruim' } })
      this.onmessage({ data: { id, ok: true, resultado: tipo === 'iniciar' ? 'pronto' : dados } })
    })
  }
  terminate() {
    this.encerrado = true
  }
}

describe('SupervisorWorker', () => {
  let progressos
  let supervisor

  beforeEach(() => {
    WorkerFalso.criados = []
    progressos = []
    supervisor = new SupervisorWorker({
      criarWorker: () => new WorkerFalso(),
      tempoLimiteMs: 1000,
      aoProgresso: (p) => progressos.push(p.fase),
    })
  })

  afterEach(() => vi.useRealTimers())

  it('inicia o Worker uma vez e repassa o progresso', async () => {
    await Promise.all([supervisor.pedir('eco', 1), supervisor.pedir('eco', 2)])
    expect(WorkerFalso.criados).toHaveLength(1)
    expect(progressos).toEqual(['baixando'])
  })

  it('devolve o resultado de cada pedido na ordem', async () => {
    const resultados = await Promise.all([1, 2, 3].map((n) => supervisor.pedir('eco', n)))
    expect(resultados).toEqual([1, 2, 3])
  })

  it('rejeita quando o Worker responde com erro', async () => {
    await expect(supervisor.pedir('falhar')).rejects.toThrow('deu ruim')
  })

  it('encerra o Worker travado e cria outro no próximo pedido', async () => {
    vi.useFakeTimers()
    await supervisor.iniciar()
    const travado = supervisor.pedir('travar')
    const verificacao = expect(travado).rejects.toBeInstanceOf(TempoEsgotadoError)
    await vi.advanceTimersByTimeAsync(1001)
    await verificacao
    expect(WorkerFalso.criados[0].encerrado).toBe(true)

    vi.useRealTimers()
    await expect(supervisor.pedir('eco', 'de novo')).resolves.toBe('de novo')
    expect(WorkerFalso.criados).toHaveLength(2)
    expect(supervisor.reinicios).toBe(1)
  })
})
