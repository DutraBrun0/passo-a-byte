import { javascript as suporteJavaScript } from '@codemirror/lang-javascript'
import { criarEstadoObservavel } from '../../nucleo/execucao/estadoObservavel.js'
import { SupervisorWorker, TempoEsgotadoError } from '../../nucleo/execucao/SupervisorWorker.js'
import { LIMITES_JAVASCRIPT, TEMPO_LIMITE_WORKER_MS } from './limites.js'
import { normalizarResultado, resultadoTempoEsgotado } from './resultado.js'

/*
 * Adaptador de JavaScript. O código roda num Web Worker com o motor do próprio
 * navegador, então a "carga" é instantânea: não há interpretador para baixar.
 */

const carga = criarEstadoObservavel({ fase: 'parado' })
let supervisor = null

function obterSupervisor() {
  supervisor ??= new SupervisorWorker({
    criarWorker: () =>
      new Worker(new URL('./javascript.worker.js', import.meta.url), { type: 'module', name: 'javascript' }),
    tempoLimiteMs: TEMPO_LIMITE_WORKER_MS,
  })
  return supervisor
}

async function preparar() {
  if (carga.obter().fase === 'pronto') return
  carga.definir({ fase: 'iniciando' })
  try {
    const { versao, ms } = await obterSupervisor().iniciar()
    carga.definir({ fase: 'pronto', versao, ms })
  } catch (erro) {
    carga.definir({ fase: 'erro', mensagem: erro.message })
    throw erro
  }
}

export const javascript = {
  id: 'javascript',
  nome: 'JavaScript',
  extensao: '.js',
  editor: { suporte: suporteJavaScript, indentacao: '  ' },
  limites: LIMITES_JAVASCRIPT,
  // Tipos de teste que o executor.js sabe rodar (validados no conteúdo).
  tiposDeTeste: ['saida', 'funcao', 'variavel', 'js', 'estrutura'],

  preparar,
  estadoCarga: carga.obter,
  assinarCarga: carga.assinar,

  async executar(codigo, { entrada = [], testes = [] } = {}) {
    await preparar()
    try {
      const bruto = await obterSupervisor().pedir('executar', {
        codigo,
        opcoes: { entrada, testes, limites: LIMITES_JAVASCRIPT },
      })
      return normalizarResultado(bruto)
    } catch (erro) {
      if (!(erro instanceof TempoEsgotadoError)) throw erro
      // O Worker foi encerrado; o próximo pedido cria um novo.
      carga.definir({ fase: 'parado' })
      return resultadoTempoEsgotado()
    }
  },
}
