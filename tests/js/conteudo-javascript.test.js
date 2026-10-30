import { describe, expect, it } from 'vitest'
import { obterCurso } from '../../src/nucleo/conteudo/cursos.js'
import { validarCurso } from '../../src/nucleo/conteudo/montarCurso.js'
import { javascript } from '../../src/linguagens/javascript/index.js'
import { LIMITES_JAVASCRIPT } from '../../src/linguagens/javascript/limites.js'
import { normalizarResultado } from '../../src/linguagens/javascript/resultado.js'
import { executar as executarBruto } from '../../src/linguagens/javascript/runtime/executor.js'

/*
 * Garantias sobre o conteúdo de JavaScript, com o mesmo executor do Worker:
 * - todo arquivo de lição segue o formato;
 * - a solução de referência de TODO exercício passa nos próprios testes;
 * - o código inicial NÃO passa (senão o exercício seria trivial).
 */
const curso = obterCurso('javascript')
const licoes = [...curso.licoes.values()].filter((licao) => licao.exercicio)

const executar = (codigo, exercicio) =>
  normalizarResultado(
    executarBruto(codigo, { entrada: exercicio.entrada ?? [], testes: exercicio.testes, limites: LIMITES_JAVASCRIPT }),
  )

describe('conteúdo de JavaScript', () => {
  it('tem lições', () => {
    expect(licoes.length).toBeGreaterThan(0)
  })

  it('todas as lições seguem o formato', () => {
    expect(validarCurso(curso, javascript.tiposDeTeste)).toEqual([])
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
