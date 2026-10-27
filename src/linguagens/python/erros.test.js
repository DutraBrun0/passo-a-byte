import { describe, expect, it } from 'vitest'
import { traduzirErroPython } from './erros.js'

const traduzir = (tipo, mensagem, linha = 1) => traduzirErroPython({ tipo, mensagem, linha })

describe('traduzirErroPython', () => {
  it('explica concatenação de texto com número', () => {
    const e = traduzir('TypeError', 'can only concatenate str (not "int") to str')
    expect(e.titulo).toBe('Tipos que não combinam')
    expect(e.explicacao).toMatch(/str\(numero\)/)
    expect(e.original).toBe('TypeError: can only concatenate str (not "int") to str')
  })

  it('cita o nome desconhecido e a sugestão do Python', () => {
    const e = traduzir('NameError', "name 'idadee' is not defined. Did you mean: 'idade'?")
    expect(e.explicacao).toMatch(/"idadee"/)
    expect(e.explicacao).toMatch(/"idade"\?/)
  })

  it('sugere aspas quando o nome parece um texto esquecido', () => {
    expect(traduzir('NameError', "name 'Maria' is not defined").explicacao).toMatch(/aspas/)
  })

  it('explica o dois-pontos que faltou', () => {
    expect(traduzir('SyntaxError', "expected ':'").explicacao).toMatch(/dois-pontos/)
  })

  it('explica int() com texto inválido', () => {
    const e = traduzir('ValueError', "invalid literal for int() with base 10: 'abc'")
    expect(e.explicacao).toMatch(/'abc'/)
  })

  it('cobre os limites do executor', () => {
    for (const tipo of ['LimiteDePassos', 'LimiteDeTempo', 'LimiteDeSaida', 'TempoEsgotado']) {
      expect(traduzir(tipo, '').titulo).not.toMatch(/^Erro:/)
    }
  })

  it('mantém a linha e cai num texto genérico para erros desconhecidos', () => {
    const e = traduzir('OverflowError', 'math range error', 7)
    expect(e.linha).toBe(7)
    expect(e.titulo).toBe('Erro: OverflowError')
  })

  it('devolve null sem erro', () => {
    expect(traduzirErroPython(null)).toBeNull()
  })
})
