import { describe, expect, it } from 'vitest'
import * as r from './regras.js'
import { avaliarConquistas } from './conquistas.js'
import { ArquivoInvalidoError, deArquivo, paraArquivo } from './arquivo.js'

const dia = (texto) => new Date(`${texto}T12:00:00`)
const ID = 'python/ola-mundo'

describe('sequência de dias', () => {
  it('conta dias seguidos, mantém no mesmo dia e recomeça depois de um intervalo', () => {
    let s = { atual: 0, melhor: 0, ultimoDia: null }
    s = r.atualizarSequencia(s, '2026-10-01')
    s = r.atualizarSequencia(s, '2026-10-01')
    s = r.atualizarSequencia(s, '2026-10-02')
    expect(s).toEqual({ atual: 2, melhor: 2, ultimoDia: '2026-10-02' })
    s = r.atualizarSequencia(s, '2026-10-05')
    expect(s).toEqual({ atual: 1, melhor: 2, ultimoDia: '2026-10-05' })
  })

  it('atravessa a virada do mês', () => {
    const s = r.atualizarSequencia({ atual: 4, melhor: 4, ultimoDia: '2026-10-31' }, '2026-11-01')
    expect(s.atual).toBe(5)
  })

  it('a sequência exibida zera quando o aluno pulou um dia', () => {
    const s = { atual: 3, melhor: 3, ultimoDia: '2026-10-01' }
    expect(r.sequenciaVigente(s, '2026-10-02')).toBe(3)
    expect(r.sequenciaVigente(s, '2026-10-03')).toBe(0)
  })
})

describe('tentativas e XP', () => {
  it('conclui na primeira vez que passa e não dá XP de novo', () => {
    let e = r.estadoInicial()
    e = r.registrarTentativa(e, ID, { passou: false, xp: 10 }, dia('2026-10-01'))
    e = r.registrarTentativa(e, ID, { passou: true, xp: 10 }, dia('2026-10-01'))
    e = r.registrarTentativa(e, ID, { passou: true, xp: 10 }, dia('2026-10-02'))
    expect(e.xp).toBe(10)
    expect(e.licoes[ID]).toMatchObject({ tentativas: 3, dePrimeira: false, semDicas: true })
    expect(e.sequencia.atual).toBe(1)
  })

  it('dá metade do XP se a solução foi vista antes de acertar', () => {
    let e = r.marcarSolucaoVista(r.estadoInicial(), ID)
    e = r.registrarTentativa(e, ID, { passou: true, xp: 15 }, dia('2026-10-01'))
    expect(e.xp).toBe(8)
    expect(e.licoes[ID].semDicas).toBe(false)
  })

  it('não revela mais dicas do que existem', () => {
    let e = r.estadoInicial()
    for (let i = 0; i < 5; i++) e = r.revelarDica(e, ID, 3)
    expect(e.licoes[ID].dicasVistas).toBe(3)
  })
})

describe('status das lições', () => {
  const licoes = [
    { id: 'a', anterior: null },
    { id: 'b', anterior: 'a' },
    { id: 'c', anterior: 'b' },
  ]
  const nivel = { modulos: [{ licoes }] }

  it('libera em sequência dentro do nível', () => {
    let e = r.estadoInicial()
    expect(licoes.map((l) => r.statusLicao(e, 'python', l))).toEqual(['disponivel', 'bloqueada', 'bloqueada'])
    e = r.registrarTentativa(e, 'python/a', { passou: true, xp: 10 }, dia('2026-10-01'))
    e = r.salvarRascunho(e, 'python/b', 'print()')
    expect(licoes.map((l) => r.statusLicao(e, 'python', l))).toEqual(['concluida', 'andamento', 'bloqueada'])
    expect(r.proximaLicao(e, 'python', nivel).id).toBe('b')
    expect(r.contarConcluidas(e, 'python', licoes)).toBe(1)
  })
})

describe('conquistas', () => {
  const contexto = { niveis: [{ licoes: [ID] }], fases: ['python/fase-1'] }

  it('desbloqueia uma vez só', () => {
    let e = r.registrarTentativa(r.estadoInicial(), ID, { passou: true, xp: 10 }, dia('2026-10-01'))
    const primeira = avaliarConquistas(e, contexto, dia('2026-10-01'))
    expect(primeira.novas.map((c) => c.id)).toEqual(['primeiro-passo', 'de-primeira', 'nivel-completo'])
    const segunda = avaliarConquistas(primeira.estado, contexto, dia('2026-10-02'))
    expect(segunda.novas).toEqual([])
  })

  it('reconhece as fases do robô', () => {
    const e = r.concluirFase(r.estadoInicial(), 'python/fase-1', { xp: 20, linhas: 4 }, dia('2026-10-01'))
    const ids = avaliarConquistas(e, contexto, dia('2026-10-01')).novas.map((c) => c.id)
    expect(ids).toEqual(['robo-primeira', 'robo-todas'])
    expect(e.xp).toBe(20)
  })
})

describe('exportar e importar', () => {
  it('ida e volta preserva o progresso', () => {
    let e = r.registrarTentativa(r.estadoInicial(), ID, { passou: true, xp: 10 }, dia('2026-10-01'))
    e = r.salvarRascunho(e, 'python/outra', 'x = 1')
    e = { ...e, conquistas: { 'primeiro-passo': '2026-10-01T15:00:00.000Z' } }
    const arquivo = JSON.stringify(paraArquivo(e))
    expect(deArquivo(arquivo)).toEqual(e)
  })

  it.each([
    ['texto que não é JSON', 'oi'],
    ['JSON de outro app', JSON.stringify({ app: 'outro' })],
    ['XP negativo', JSON.stringify({ ...paraArquivo(r.estadoInicial()), progresso: { ...r.estadoInicial(), xp: -5 } })],
    [
      'lição malformada',
      JSON.stringify({ ...paraArquivo(r.estadoInicial()), progresso: { ...r.estadoInicial(), licoes: { x: 'oi' } } }),
    ],
  ])('recusa %s', (_caso, conteudo) => {
    expect(() => deArquivo(conteudo)).toThrow(ArquivoInvalidoError)
  })
})
