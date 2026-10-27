import { describe, expect, it } from 'vitest'
import { ErroDoRobo, MAX_ACOES, criarSimulador, lerMapa } from './simulador.js'

const fase = (mapa, direcao = 'leste') => ({ mapa, direcao })

describe('lerMapa', () => {
  it('encontra início, saída e chaves', () => {
    const mapa = lerMapa('#####\n#RCS#\n#####')
    expect(mapa).toMatchObject({ largura: 5, altura: 3, inicio: { x: 1, y: 1 }, saida: { x: 3, y: 1 } })
    expect(mapa.chaves).toEqual([{ x: 2, y: 1 }])
  })

  it('recusa mapas sem robô, sem saída ou com caracteres estranhos', () => {
    expect(() => lerMapa('#..S#')).toThrow(/R/)
    expect(() => lerMapa('#R..#')).toThrow(/S/)
    expect(() => lerMapa('#R.X.S#')).toThrow(/desconhecido/)
  })
})

describe('criarSimulador', () => {
  it('anda, vira e grava o trace com a linha e o estado de cada passo', () => {
    const sim = criarSimulador(fase('####\n#R.#\n#.S#\n####'))
    sim.api.andar(1)
    sim.api.virarDireita(2)
    sim.api.andar(3)
    expect(sim.trace.map((e) => [e.acao, e.linha, e.estado.x, e.estado.y, e.estado.direcao])).toEqual([
      ['andar', 1, 2, 1, 'leste'],
      ['virar_direita', 2, 2, 1, 'sul'],
      ['andar', 3, 2, 2, 'sul'],
    ])
    expect(sim.concluir()).toEqual({ sucesso: true, motivo: null })
  })

  it('bater na parede vira erro no trace e interrompe', () => {
    const sim = criarSimulador(fase('###\n#R#\n#S#'))
    expect(() => sim.api.andar(4)).toThrow(ErroDoRobo)
    expect(sim.trace.at(-1)).toMatchObject({ tipo: 'erro', linha: 4, mensagem: 'o Bit bateu na parede' })
  })

  it('sensores olham para frente e para os lados', () => {
    const sim = criarSimulador(fase('####\n#R.#\n#.S#\n####'))
    expect(sim.api.temParede(1)).toBe(false)
    expect(sim.api.temParede(1, 'esquerda')).toBe(true)
    expect(sim.api.temParede(1, 'direita')).toBe(false)
    expect(sim.api.naSaida(1)).toBe(false)
    expect(sim.trace.every((e) => e.tipo === 'sensor')).toBe(true)
  })

  it('exige todas as chaves para concluir', () => {
    const sim = criarSimulador(fase('#####\n#RCS#\n#####'))
    sim.api.andar(1)
    expect(sim.api.temChave(2)).toBe(true)
    sim.api.andar(3)
    expect(sim.concluir()).toEqual({ sucesso: false, motivo: 'faltou pegar 1 chave antes de sair' })
  })

  it('pegar chave onde não há chave é erro', () => {
    const sim = criarSimulador(fase('#####\n#R.S#\n#####'))
    expect(() => sim.api.pegarChave(1)).toThrow(/não há chave/)
  })

  it('limita o número de ações', () => {
    const sim = criarSimulador(fase('#####\n#R.S#\n#####'))
    expect(() => {
      for (let i = 0; i <= MAX_ACOES; i++) sim.api.virarDireita(1)
    }).toThrow(/descansar/)
  })
})
