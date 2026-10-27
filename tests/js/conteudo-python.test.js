import { beforeAll, describe, expect, it } from 'vitest'
import { obterCurso } from '../../src/nucleo/conteudo/cursos.js'
import { validarCurso } from '../../src/nucleo/conteudo/montarCurso.js'
import { python } from '../../src/linguagens/python/index.js'
import { LIMITES_PYTHON } from '../../src/linguagens/python/limites.js'
import { normalizarResultado } from '../../src/linguagens/python/resultado.js'
import { runtimePythonNode } from './apoio/pyodide.js'

/*
 * Garantias sobre o conteúdo de Python, rodando no mesmo Pyodide do navegador:
 * - todo arquivo de lição segue o formato;
 * - a solução de referência de TODO exercício passa nos próprios testes;
 * - o código inicial NÃO passa (senão o exercício seria trivial).
 */
const curso = obterCurso('python')
const licoes = [...curso.licoes.values()].filter((licao) => licao.exercicio)

let runtime
beforeAll(async () => {
  runtime = await runtimePythonNode()
}, 60_000)

const executar = (codigo, exercicio) =>
  normalizarResultado(
    runtime.executar(codigo, { entrada: exercicio.entrada ?? [], testes: exercicio.testes, limites: LIMITES_PYTHON }),
  )

describe('conteúdo de Python', () => {
  it('tem lições', () => {
    expect(licoes.length).toBeGreaterThan(0)
  })

  it('todas as lições seguem o formato', () => {
    expect(validarCurso(curso, python.tiposDeTeste)).toEqual([])
  })

  describe.each(licoes.map((licao) => [licao.id, licao]))('%s', (_id, licao) => {
    it('a solução de referência passa em todos os testes', () => {
      const resultado = executar(licao.exercicio.solucao, licao.exercicio)
      const falhas = resultado.testes.filter((teste) => !teste.passou)
      expect(resultado.erro, resultado.erro?.original).toBeNull()
      expect(falhas, JSON.stringify(falhas, null, 2)).toEqual([])
    })

    it('o código inicial não passa', () => {
      expect(executar(licao.exercicio.codigo_inicial, licao.exercicio).passou).toBe(false)
    })
  })
})
