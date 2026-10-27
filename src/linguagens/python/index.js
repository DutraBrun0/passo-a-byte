import { python as suportePython } from '@codemirror/lang-python'
import { criarEstadoObservavel } from '../../nucleo/execucao/estadoObservavel.js'
import { SupervisorWorker, TempoEsgotadoError } from '../../nucleo/execucao/SupervisorWorker.js'
import { LIMITES_PYTHON, TEMPO_LIMITE_WORKER_MS } from './limites.js'
import { normalizarResultado, resultadoTempoEsgotado } from './resultado.js'

/*
 * Adaptador de Python: única porta de entrada do núcleo para tudo que é Python.
 * O Worker (e o Pyodide, ~12 MB) só é criado na primeira chamada a preparar().
 */

const carga = criarEstadoObservavel({ fase: 'parado' })
let supervisor = null

function obterSupervisor() {
  supervisor ??= new SupervisorWorker({
    criarWorker: () => new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module', name: 'python' }),
    tempoLimiteMs: TEMPO_LIMITE_WORKER_MS,
    aoProgresso: ({ tipo: _tipo, ...estado }) => carga.definir(estado),
  })
  return supervisor
}

async function preparar() {
  if (carga.obter().fase === 'pronto') return
  try {
    const { versao, ms } = await obterSupervisor().iniciar()
    carga.definir({ fase: 'pronto', versao, ms })
  } catch (erro) {
    carga.definir({ fase: 'erro', mensagem: erro.message })
    throw erro
  }
}

async function pedir(tipo, dados) {
  await preparar()
  try {
    return await obterSupervisor().pedir(tipo, dados)
  } catch (erro) {
    if (erro instanceof TempoEsgotadoError) {
      // O Worker foi encerrado; o próximo pedido carrega um novo (do cache).
      carga.definir({ fase: 'parado' })
      return null
    }
    throw erro
  }
}

export const python = {
  id: 'python',
  nome: 'Python',
  extensao: '.py',
  editor: { suporte: suportePython, indentacao: '    ' },
  limites: LIMITES_PYTHON,

  preparar,
  estadoCarga: carga.obter,
  assinarCarga: carga.assinar,

  async executar(codigo, { entrada = [], testes = [] } = {}) {
    const bruto = await pedir('executar', { codigo, opcoes: { entrada, testes, limites: LIMITES_PYTHON } })
    return bruto ? normalizarResultado(bruto) : resultadoTempoEsgotado()
  },
}
