import { beforeAll, describe, expect, it } from 'vitest'
import { obterCurso } from '../../src/nucleo/conteudo/cursos.js'
import { validarFases } from '../../src/nucleo/conteudo/montarCurso.js'
import { lerMapa } from '../../src/nucleo/robo/simulador.js'
import { python } from '../../src/linguagens/python/index.js'
import { LIMITES_PYTHON } from '../../src/linguagens/python/limites.js'
import { runtimePythonNode } from './apoio/pyodide.js'

// Toda fase do robô precisa ter solução que funciona, dentro do limite de linhas.
const curso = obterCurso('python')

let runtime
beforeAll(async () => {
  runtime = await runtimePythonNode()
}, 60_000)

const rodar = (codigo, fase) => runtime.executarRobo(codigo, fase, { limites: LIMITES_PYTHON })

describe('fases do robô em Python', () => {
  it('existem e seguem o formato', () => {
    expect(curso.fases.length).toBeGreaterThan(0)
    expect(validarFases(curso, lerMapa)).toEqual([])
  })

  describe.each(curso.fases.map((fase) => [fase.id, fase]))('%s', (_id, fase) => {
    it('a solução leva o Bit à saída com todas as chaves', () => {
      const resultado = rodar(fase.solucao, fase)
      expect(resultado.erro).toBeNull()
      expect(resultado.motivo).toBeNull()
      expect(resultado.sucesso).toBe(true)
    })

    it('a solução cabe no limite de linhas', () => {
      if (fase.max_linhas) expect(python.robo.contarLinhas(fase.solucao)).toBeLessThanOrEqual(fase.max_linhas)
    })

    it('o código inicial não resolve a fase', () => {
      expect(rodar(fase.codigo_inicial, fase).sucesso).toBe(false)
    })
  })
})
