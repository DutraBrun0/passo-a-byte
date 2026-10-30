import { describe, expect, it } from 'vitest'
import { LIMITES_JAVASCRIPT } from '../limites.js'
import { executar } from './executor.js'

const rodar = (codigo, opcoes = {}) => executar(codigo, { limites: LIMITES_JAVASCRIPT, ...opcoes })
const umTeste = (codigo, teste, opcoes = {}) => rodar(codigo, { testes: [teste], ...opcoes }).testes[0]

describe('executor de JavaScript', () => {
  it('captura o console.log no formato do Node', () => {
    const { console: saida, erro } = rodar('console.log("oi", 2, [1, "a"], { nome: "Ana" })')
    expect(erro).toBeNull()
    expect(saida).toBe("oi 2 [ 1, 'a' ] { nome: 'Ana' }\n")
  })

  it('simula o prompt com a entrada do exercício', () => {
    const { console: saida } = rodar('const nome = prompt("Nome: ")\nconsole.log("Oi, " + nome)', { entrada: ['Bia'] })
    expect(saida).toBe('Nome: Bia\nOi, Bia\n')
  })

  it('aponta a linha e a coluna de um erro de sintaxe', () => {
    const { erro } = rodar('let x = 1\nconsole.log("oi)')
    expect(erro).toMatchObject({ tipo: 'SyntaxError', linha: 2 })
  })

  it('aponta a linha de um erro de execução, inclusive dentro de função', () => {
    expect(rodar('let a = 1\nconsole.log(b)').erro).toMatchObject({ tipo: 'ReferenceError', linha: 2 })
    expect(rodar('function f() {\n  return x.y\n}\nf()').erro).toMatchObject({ tipo: 'ReferenceError', linha: 2 })
  })

  it('interrompe laços infinitos, mesmo vazios ou dentro de try/catch', () => {
    expect(rodar('while (true) {}').erro.tipo).toBe('LimiteDePassos')
    expect(rodar('for (;;) { try { x } catch (e) {} }').erro.tipo).toBe('LimiteDePassos')
  })

  it('usa modo estrito: variável sem let é erro', () => {
    expect(rodar('total = 5').erro.tipo).toBe('ReferenceError')
  })

  it('lê variáveis let e const e chama funções nos testes', () => {
    const codigo = 'const nomes = ["a", "b"]\nlet total = 3\nfunction dobro(x) { return x * 2 }\nconst triplo = (x) => x * 3'
    expect(umTeste(codigo, { tipo: 'variavel', nome: 'v', variavel: 'nomes', esperado: ['a', 'b'] }).passou).toBe(true)
    expect(umTeste(codigo, { tipo: 'variavel', nome: 'v', variavel: 'total', tipo_esperado: 'number' }).passou).toBe(true)
    expect(umTeste(codigo, { tipo: 'funcao', nome: 'f', funcao: 'dobro', args: [4], esperado: 8 }).passou).toBe(true)
    expect(umTeste(codigo, { tipo: 'funcao', nome: 'f', funcao: 'triplo', args: [2], esperado: 6 }).passou).toBe(true)
    expect(umTeste(codigo, { tipo: 'variavel', nome: 'v', variavel: 'naoExiste', esperado: 1 })).toMatchObject({
      passou: false,
      obtido: 'a variável não foi criada',
    })
  })

  it('roda asserts no escopo do aluno', () => {
    const codigo = 'function soma(a, b) { return a + b }'
    expect(umTeste(codigo, { tipo: 'js', nome: 't', codigo: 'assert(soma(1, 2) === 3)' }).passou).toBe(true)
    expect(umTeste(codigo, { tipo: 'js', nome: 't', codigo: 'assert(soma(1, 2) === 4)' })).toMatchObject({ passou: false, erro: null })
  })

  it('verifica a estrutura: nós, var/let/const e chamadas de método', () => {
    const codigo = 'let x = 0\nfor (let i = 0; i < 3; i++) { console.log(i) }\nconsole.log(x)'
    const estrutura = (extra) => umTeste(codigo, { tipo: 'estrutura', nome: 'e', ...extra }).passou
    expect(estrutura({ usa: ['ForStatement', 'VariableDeclaration:let'] })).toBe(true)
    expect(estrutura({ nao_usa: ['VariableDeclaration:var'] })).toBe(true)
    expect(estrutura({ max_chamadas: { 'console.log': 1 } })).toBe(false)
    expect(estrutura({ min_chamadas: { '.log': 2 } })).toBe(true)
  })

  it('compara números com tolerância e booleanos pelo tipo', () => {
    expect(umTeste('const x = 0.1 + 0.2', { tipo: 'variavel', nome: 'v', variavel: 'x', esperado: 0.3 }).passou).toBe(true)
    expect(umTeste('const x = 1', { tipo: 'variavel', nome: 'v', variavel: 'x', esperado: true }).passou).toBe(false)
  })
})
