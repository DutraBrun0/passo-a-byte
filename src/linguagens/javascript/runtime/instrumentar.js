/*
 * Instrumentação do código do aluno, o equivalente ao sys.settrace do Python.
 *
 * Antes de cada instrução é inserida uma chamada `marcador(linha)`, e o corpo
 * de todo laço é envolvido em `{ marcador(linha); ... }`. Com isso o executor
 * sabe a linha atual (para apontar o erro no editor) e conta os passos, o que
 * permite interromper laços infinitos com uma mensagem amigável em vez de
 * travar o Worker. Até `while (true) {}` passa pelo marcador a cada volta.
 *
 * As inserções são feitas por posição no texto original, a partir da AST do
 * acorn: nada do código do aluno é reescrito, só acrescentado.
 */

const LACOS = new Set(['ForStatement', 'ForInStatement', 'ForOfStatement', 'WhileStatement', 'DoWhileStatement'])

// Listas de instruções: o corpo do programa, de um bloco e de cada case de um switch.
function instrucoesDe(no) {
  if (no.type === 'Program' || no.type === 'BlockStatement' || no.type === 'StaticBlock') return no.body
  if (no.type === 'SwitchCase') return no.consequent
  return null
}

/**
 * @param {string} codigo  código original
 * @param {object} ast     AST do acorn (com `locations: true`)
 * @param {string} marcador nome da função chamada antes de cada instrução
 * @returns {string} código instrumentado (as linhas continuam as mesmas)
 */
export function instrumentar(codigo, ast, marcador) {
  const insercoes = []

  const visitar = (no) => {
    for (const instrucao of instrucoesDe(no) ?? []) {
      // Declarações de função são içadas: não "executam" na linha onde estão.
      if (instrucao.type === 'FunctionDeclaration' || instrucao.type === 'EmptyStatement') continue
      insercoes.push([instrucao.start, `${marcador}(${instrucao.loc.start.line});`])
    }
    if (LACOS.has(no.type)) {
      insercoes.push([no.body.start, `{${marcador}(${no.body.loc.start.line});`])
      insercoes.push([no.body.end, '}'])
    }
    for (const [chave, valor] of Object.entries(no)) {
      if (chave === 'loc') continue
      if (Array.isArray(valor)) valor.forEach((filho) => filho?.type && visitar(filho))
      else if (valor?.type) visitar(valor)
    }
  }
  visitar(ast)

  // Ordena por posição, mantendo a ordem de inserção nos empates, e costura os pedaços.
  insercoes.sort((a, b) => a[0] - b[0])
  let resultado = ''
  let anterior = 0
  for (const [posicao, texto] of insercoes) {
    resultado += codigo.slice(anterior, posicao) + texto
    anterior = posicao
  }
  return resultado + codigo.slice(anterior)
}
