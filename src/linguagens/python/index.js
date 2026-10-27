import { python as suportePython } from '@codemirror/lang-python'
import { criarEstadoObservavel } from '../../nucleo/execucao/estadoObservavel.js'
import { SupervisorWorker, TempoEsgotadoError } from '../../nucleo/execucao/SupervisorWorker.js'
import { LIMITES_PYTHON, TEMPO_LIMITE_WORKER_MS } from './limites.js'
import { normalizarResultado, normalizarResultadoRobo, resultadoTempoEsgotado } from './resultado.js'

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
  // Tipos de teste que o executor.py sabe rodar (validados no conteúdo).
  tiposDeTeste: ['saida', 'funcao', 'variavel', 'python', 'estrutura'],

  preparar,
  estadoCarga: carga.obter,
  assinarCarga: carga.assinar,

  async executar(codigo, { entrada = [], testes = [] } = {}) {
    const bruto = await pedir('executar', { codigo, opcoes: { entrada, testes, limites: LIMITES_PYTHON } })
    return bruto ? normalizarResultado(bruto) : resultadoTempoEsgotado()
  },

  // Capacidade opcional do contrato: Desafios do Robô.
  robo: {
    /** Referência da API, mostrada na página da fase (os nomes são da linguagem). */
    funcoes: [
      { assinatura: 'andar()', descricao: 'anda uma casa para a frente' },
      { assinatura: 'virar_esquerda()', descricao: 'gira 90° para a esquerda' },
      { assinatura: 'virar_direita()', descricao: 'gira 90° para a direita' },
      { assinatura: 'pegar_chave()', descricao: 'pega a chave da casa atual' },
      { assinatura: 'tem_parede()', descricao: 'True se há parede à frente (aceita "esquerda" ou "direita")' },
      { assinatura: 'na_saida()', descricao: 'True se o Bit está na saída' },
      { assinatura: 'tem_chave()', descricao: 'True se há uma chave na casa atual' },
    ],

    /** Linhas que contam no limite dos desafios: ignora linhas vazias e comentários. */
    contarLinhas: (codigo) =>
      codigo.split('\n').filter((linha) => linha.trim() && !linha.trim().startsWith('#')).length,

    async executar(codigo, { mapa, direcao }) {
      const bruto = await pedir('executarRobo', { codigo, fase: { mapa, direcao }, opcoes: { limites: LIMITES_PYTHON } })
      if (!bruto) return { ...resultadoTempoEsgotado(), trace: [], sucesso: false, motivo: null }
      return normalizarResultadoRobo(bruto)
    },
  },
}
