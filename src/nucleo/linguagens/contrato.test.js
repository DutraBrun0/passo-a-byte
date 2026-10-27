import { describe, expect, it } from 'vitest'
import { validarAdaptador } from './contrato.js'
import { python } from '../../linguagens/python/index.js'

describe('contrato do adaptador de linguagem', () => {
  it('o adaptador de Python cumpre o contrato', () => {
    expect(() => validarAdaptador(python)).not.toThrow()
  })

  it('aponta os campos que faltam', () => {
    expect(() => validarAdaptador({ id: 'js', nome: 'JavaScript' })).toThrow(/"executar" deveria ser function/)
  })
})
