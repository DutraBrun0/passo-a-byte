/*
 * Contrato de um adaptador de linguagem.
 *
 * O núcleo (páginas, trilha, progresso, editor) só conversa com esta interface.
 * Tudo o que é específico de uma linguagem (como executar, como traduzir erros,
 * qual modo do editor usar) fica dentro do adaptador.
 *
 * @typedef {object} ResultadoTeste
 * @property {string} nome          descrição curta do caso de teste
 * @property {boolean} passou
 * @property {string|null} esperado o que o teste esperava, já formatado para exibir
 * @property {string|null} obtido   o que o código do aluno produziu
 * @property {string} mensagem      dica do autor do exercício, mostrada quando falha
 * @property {ErroAmigavel|null} erro
 *
 * @typedef {object} ErroAmigavel
 * @property {string} tipo          ex.: 'NameError'
 * @property {string} titulo        frase curta em português
 * @property {string} explicacao    o que provavelmente aconteceu e como corrigir
 * @property {string} original      mensagem original do interpretador
 * @property {number|null} linha
 * @property {number|null} coluna
 *
 * @typedef {object} ResultadoExecucao
 * @property {string} console       tudo o que apareceria no terminal
 * @property {ErroAmigavel|null} erro
 * @property {ResultadoTeste[]} testes
 * @property {boolean} passou       sem erro e com todos os testes aprovados
 * @property {{passos: number, ms: number}} metricas
 *
 * @typedef {object} EstadoCarga
 * @property {'parado'|'baixando'|'iniciando'|'pronto'|'erro'} fase
 * @property {number} [carregado]  bytes baixados
 * @property {number|null} [total] bytes esperados (null = indeterminado)
 * @property {string} [mensagem]
 *
 * @typedef {object} AdaptadorLinguagem
 * @property {string} id                 usado nas rotas e em content/<id>/
 * @property {string} nome               nome exibido
 * @property {string} extensao           ex.: '.py'
 * @property {{suporte: () => import('@codemirror/language').LanguageSupport, indentacao: string}} editor
 * @property {{passos: number, segundos: number, saida: number}} limites
 * @property {() => Promise<void>} preparar  carrega o interpretador (pode demorar)
 * @property {() => EstadoCarga} estadoCarga
 * @property {(ouvinte: (estado: EstadoCarga) => void) => () => void} assinarCarga
 * @property {(codigo: string, opcoes: {entrada?: string[], testes?: object[]}) => Promise<ResultadoExecucao>} executar
 * @property {object} [robo]  capacidade opcional: Desafios do Robô (ver nucleo/robo)
 */

const OBRIGATORIOS = {
  id: 'string',
  nome: 'string',
  extensao: 'string',
  editor: 'object',
  limites: 'object',
  preparar: 'function',
  estadoCarga: 'function',
  assinarCarga: 'function',
  executar: 'function',
}

/** Garante, na hora do registro, que o adaptador cumpre o contrato. */
export function validarAdaptador(adaptador) {
  const problemas = Object.entries(OBRIGATORIOS)
    .filter(([campo, tipo]) => typeof adaptador?.[campo] !== tipo)
    .map(([campo, tipo]) => `"${campo}" deveria ser ${tipo}`)
  if (typeof adaptador?.editor?.suporte !== 'function') problemas.push('"editor.suporte" deveria ser function')
  if (problemas.length) {
    throw new Error(`Adaptador de linguagem inválido (${adaptador?.id ?? '?'}): ${problemas.join(', ')}`)
  }
  return adaptador
}
