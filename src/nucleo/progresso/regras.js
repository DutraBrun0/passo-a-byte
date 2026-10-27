/*
 * Regras de progresso como funções puras (estado antigo → estado novo).
 * A store do Zustand só chama estas funções e persiste o resultado, então
 * toda a lógica de XP, sequência e status é testável sem navegador.
 */

export const VERSAO_PROGRESSO = 1

export function estadoInicial() {
  return {
    versao: VERSAO_PROGRESSO,
    xp: 0,
    licoes: {},
    fases: {},
    sequencia: { atual: 0, melhor: 0, ultimoDia: null },
    conquistas: {},
  }
}

/** Chave de uma lição ou fase no progresso: "python/ola-mundo". */
export const chave = (linguagem, id) => `${linguagem}/${id}`

/** Data local no formato AAAA-MM-DD (a sequência conta dias do calendário do aluno). */
export function diaLocal(data) {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

function diaAnterior(dia) {
  const [ano, mes, d] = dia.split('-').map(Number)
  return diaLocal(new Date(ano, mes - 1, d - 1))
}

export function atualizarSequencia(sequencia, hoje) {
  if (sequencia.ultimoDia === hoje) return sequencia
  const atual = sequencia.ultimoDia === diaAnterior(hoje) ? sequencia.atual + 1 : 1
  return { atual, melhor: Math.max(sequencia.melhor, atual), ultimoDia: hoje }
}

/** A sequência exibida zera se o aluno pulou um dia, mesmo antes de concluir algo hoje. */
export function sequenciaVigente(sequencia, hoje) {
  const { ultimoDia } = sequencia
  return ultimoDia === hoje || ultimoDia === diaAnterior(hoje) ? sequencia.atual : 0
}

const registroLicao = (estado, id) =>
  estado.licoes[id] ?? { tentativas: 0, dicasVistas: 0, solucaoVista: false, rascunho: null, concluidaEm: null }

function comLicao(estado, id, alteracoes) {
  return { ...estado, licoes: { ...estado.licoes, [id]: { ...registroLicao(estado, id), ...alteracoes } } }
}

export const salvarRascunho = (estado, id, codigo) => comLicao(estado, id, { rascunho: codigo })

export const revelarDica = (estado, id, total) =>
  comLicao(estado, id, { dicasVistas: Math.min(total, registroLicao(estado, id).dicasVistas + 1) })

export const marcarSolucaoVista = (estado, id) => comLicao(estado, id, { solucaoVista: true })

/**
 * Registra uma execução. Na primeira vez que passa, a lição é concluída e
 * rende XP (metade, se a solução foi vista antes de acertar).
 */
export function registrarTentativa(estado, id, { passou, xp }, agora) {
  const anterior = registroLicao(estado, id)
  const tentativas = anterior.tentativas + 1
  if (!passou || anterior.concluidaEm) return comLicao(estado, id, { tentativas })

  const ganho = anterior.solucaoVista ? Math.ceil(xp / 2) : xp
  const novo = comLicao(estado, id, {
    tentativas,
    concluidaEm: agora.toISOString(),
    xpGanho: ganho,
    dePrimeira: tentativas === 1,
    semDicas: anterior.dicasVistas === 0 && !anterior.solucaoVista,
  })
  return { ...novo, xp: estado.xp + ganho, sequencia: atualizarSequencia(estado.sequencia, diaLocal(agora)) }
}

export function concluirFase(estado, id, { xp, linhas }, agora) {
  const anterior = estado.fases[id]
  const melhorLinhas = Math.min(linhas, anterior?.melhorLinhas ?? Infinity)
  const fase = { concluidaEm: anterior?.concluidaEm ?? agora.toISOString(), melhorLinhas }
  if (anterior?.concluidaEm) return { ...estado, fases: { ...estado.fases, [id]: fase } }
  return {
    ...estado,
    xp: estado.xp + xp,
    fases: { ...estado.fases, [id]: fase },
    sequencia: atualizarSequencia(estado.sequencia, diaLocal(agora)),
  }
}

export const licaoConcluida = (estado, id) => Boolean(estado.licoes[id]?.concluidaEm)

/**
 * Status de uma lição na trilha. Dentro de um nível as lições são sequenciais;
 * os níveis são livres (quem já sabe o básico pode começar no Intermediário).
 * @returns {'concluida'|'andamento'|'disponivel'|'bloqueada'}
 */
export function statusLicao(estado, linguagem, licao) {
  const registro = estado.licoes[chave(linguagem, licao.id)]
  if (registro?.concluidaEm) return 'concluida'
  if (licao.anterior && !licaoConcluida(estado, chave(linguagem, licao.anterior))) return 'bloqueada'
  if (registro?.tentativas || registro?.rascunho) return 'andamento'
  return 'disponivel'
}

/** Próxima lição a fazer em um nível (a primeira não concluída), ou null se acabou. */
export function proximaLicao(estado, linguagem, nivel) {
  for (const modulo of nivel.modulos) {
    for (const licao of modulo.licoes) {
      if (statusLicao(estado, linguagem, licao) !== 'concluida') return licao
    }
  }
  return null
}

export function contarConcluidas(estado, linguagem, licoes) {
  return licoes.filter((licao) => licaoConcluida(estado, chave(linguagem, licao.id))).length
}
