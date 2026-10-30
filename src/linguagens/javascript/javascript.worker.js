/*
 * Web Worker do JavaScript. Diferente do Python, não há nada para baixar: o
 * motor é o do próprio navegador. O Worker só isola o código do aluno da
 * página (sem DOM) e atende os pedidos do SupervisorWorker. A rede e a troca
 * de mensagens ficam fora do alcance do código do aluno.
 */
import { executar } from './runtime/executor.js'

const responder = self.postMessage.bind(self)

function bloquearAcessos() {
  const negado = () => {
    throw new Error('Acesso desativado no ambiente de execução')
  }
  const nomes = ['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'WebTransport', 'importScripts', 'postMessage', 'close']
  for (const nome of nomes) {
    if (nome in self) Object.defineProperty(self, nome, { value: negado, writable: false, configurable: false })
  }
}
bloquearAcessos()

const TRATADORES = {
  iniciar: () => ({ versao: 'JavaScript do navegador', ms: 0 }),
  executar: ({ codigo, opcoes }) => executar(codigo, opcoes),
}

self.onmessage = ({ data: { id, tipo, dados } }) => {
  try {
    const tratador = TRATADORES[tipo]
    if (!tratador) throw new Error(`Pedido desconhecido: ${tipo}`)
    responder({ id, ok: true, resultado: tratador(dados) })
  } catch (erro) {
    responder({ id, ok: false, erro: String(erro?.message ?? erro) })
  }
}
