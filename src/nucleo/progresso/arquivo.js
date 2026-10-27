import { VERSAO_PROGRESSO, estadoInicial } from './regras.js'

/*
 * Exportar e importar o progresso em JSON (o app não tem servidor, então o
 * arquivo é a forma de levar o progresso para outro navegador).
 * A importação valida tudo: um arquivo editado à mão não pode quebrar o app.
 */

const APP = 'passo-a-byte'

export function paraArquivo(estado, agora = new Date()) {
  return { app: APP, versao: VERSAO_PROGRESSO, exportadoEm: agora.toISOString(), progresso: estado }
}

const ehObjeto = (valor) => typeof valor === 'object' && valor !== null && !Array.isArray(valor)
const ehNumero = (valor) => typeof valor === 'number' && Number.isFinite(valor) && valor >= 0
const ehDataOuNulo = (valor) => valor == null || (typeof valor === 'string' && !Number.isNaN(Date.parse(valor)))

export class ArquivoInvalidoError extends Error {}

function falhar(motivo) {
  throw new ArquivoInvalidoError(`Arquivo de progresso inválido: ${motivo}.`)
}

function lerLicao(id, dados) {
  if (!ehObjeto(dados)) falhar(`a lição ${id} está malformada`)
  if (!ehNumero(dados.tentativas ?? 0) || !ehNumero(dados.dicasVistas ?? 0)) falhar(`números inválidos em ${id}`)
  if (!ehDataOuNulo(dados.concluidaEm)) falhar(`data inválida em ${id}`)
  if (dados.rascunho != null && typeof dados.rascunho !== 'string') falhar(`rascunho inválido em ${id}`)
  return {
    tentativas: dados.tentativas ?? 0,
    dicasVistas: dados.dicasVistas ?? 0,
    solucaoVista: Boolean(dados.solucaoVista),
    rascunho: dados.rascunho ?? null,
    concluidaEm: dados.concluidaEm ?? null,
    ...(dados.concluidaEm && {
      xpGanho: ehNumero(dados.xpGanho) ? dados.xpGanho : 0,
      dePrimeira: Boolean(dados.dePrimeira),
      semDicas: Boolean(dados.semDicas),
    }),
  }
}

function lerFase(id, dados) {
  if (!ehObjeto(dados) || !ehDataOuNulo(dados.concluidaEm)) falhar(`a fase ${id} está malformada`)
  return { concluidaEm: dados.concluidaEm ?? null, melhorLinhas: ehNumero(dados.melhorLinhas) ? dados.melhorLinhas : null }
}

/** Converte o conteúdo de um arquivo (texto ou objeto) em estado de progresso válido. */
export function deArquivo(conteudo) {
  let dados = conteudo
  if (typeof conteudo === 'string') {
    try {
      dados = JSON.parse(conteudo)
    } catch {
      falhar('não é um JSON válido')
    }
  }
  if (!ehObjeto(dados) || dados.app !== APP) falhar('não foi exportado pelo Passo a Byte')
  if (dados.versao !== VERSAO_PROGRESSO) falhar(`versão ${dados.versao} não suportada`)
  const p = dados.progresso
  if (!ehObjeto(p)) falhar('falta o progresso')
  if (!ehNumero(p.xp)) falhar('XP inválido')
  if (!ehObjeto(p.licoes) || !ehObjeto(p.fases) || !ehObjeto(p.conquistas) || !ehObjeto(p.sequencia)) {
    falhar('estrutura incompleta')
  }
  const { atual, melhor, ultimoDia } = p.sequencia
  if (!ehNumero(atual) || !ehNumero(melhor) || !(ultimoDia == null || /^\d{4}-\d{2}-\d{2}$/.test(ultimoDia))) {
    falhar('sequência de dias inválida')
  }

  return {
    ...estadoInicial(),
    xp: p.xp,
    licoes: Object.fromEntries(Object.entries(p.licoes).map(([id, l]) => [id, lerLicao(id, l)])),
    fases: Object.fromEntries(Object.entries(p.fases).map(([id, f]) => [id, lerFase(id, f)])),
    sequencia: { atual, melhor, ultimoDia: ultimoDia ?? null },
    conquistas: Object.fromEntries(Object.entries(p.conquistas).filter(([, data]) => ehDataOuNulo(data) && data)),
  }
}
