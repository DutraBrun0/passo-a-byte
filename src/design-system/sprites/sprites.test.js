import { describe, expect, it } from 'vitest'
import { COR_ATUAL, PALETA, SPRITES, dimensoes } from './sprites.js'

describe('sprites', () => {
  for (const [nome, grade] of Object.entries(SPRITES)) {
    it(`${nome} é uma grade retangular`, () => {
      const { largura } = dimensoes(nome)
      for (const linha of grade) expect(linha).toHaveLength(largura)
    })

    it(`${nome} só usa cores da paleta de tokens`, () => {
      const validos = new Set(['.', COR_ATUAL, ...Object.keys(PALETA)])
      for (const ch of grade.join('')) expect(validos.has(ch), `caractere "${ch}"`).toBe(true)
    })
  }

  it('o mascote respeita o limite de 80px na escala 4', () => {
    expect(dimensoes('robo').altura * 4).toBeLessThanOrEqual(80)
  })

  it('as nuvens não passam de ~120px na escala 4', () => {
    expect(dimensoes('nuvem').largura * 4).toBeLessThanOrEqual(120)
  })
})

describe('conquistas', () => {
  it('toda conquista aponta para um sprite existente', async () => {
    const { CONQUISTAS } = await import('../../nucleo/progresso/conquistas.js')
    for (const conquista of CONQUISTAS) expect(SPRITES[conquista.sprite], conquista.id).toBeDefined()
  })
})
