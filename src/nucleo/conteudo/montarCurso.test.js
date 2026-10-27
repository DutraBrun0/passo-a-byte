import { describe, expect, it } from 'vitest'
import { montarCursos } from './montarCurso.js'
import { lerArquivoConteudo } from '../../../scripts/vite-plugin-conteudo.js'

const licao = (titulo) => ({ meta: { titulo, xp: 10 }, corpo: 'texto' })

const arquivos = {
  niveis: {
    '/content/python/2-basico/nivel.json': { titulo: 'Básico' },
    '/content/python/1-iniciante/nivel.json': { titulo: 'Iniciante' },
  },
  modulos: {
    '/content/python/1-iniciante/02-variaveis/modulo.json': { titulo: 'Variáveis' },
    '/content/python/1-iniciante/01-print/modulo.json': { titulo: 'Print' },
    '/content/python/2-basico/01-lacos/modulo.json': { titulo: 'Laços' },
  },
  licoes: {
    '/content/python/1-iniciante/01-print/02-varios-prints.md': licao('Vários prints'),
    '/content/python/1-iniciante/01-print/01-ola-mundo.md': licao('Olá'),
    '/content/python/1-iniciante/02-variaveis/01-criando.md': licao('Criando'),
    '/content/python/2-basico/01-lacos/01-for.md': licao('For'),
  },
}

describe('montarCursos', () => {
  const python = montarCursos(arquivos).get('python')

  it('ordena níveis, módulos e lições pelo prefixo numérico', () => {
    expect(python.niveis.map((n) => n.id)).toEqual(['iniciante', 'basico'])
    expect(python.niveis[0].modulos.map((m) => m.id)).toEqual(['iniciante/print', 'iniciante/variaveis'])
    expect(python.sequencia.map((l) => l.id)).toEqual(['ola-mundo', 'varios-prints', 'criando', 'for'])
  })

  it('encadeia as lições dentro de cada nível, atravessando módulos', () => {
    expect(python.licoes.get('varios-prints')).toMatchObject({ anterior: 'ola-mundo', proxima: 'criando' })
    expect(python.licoes.get('criando').proxima).toBeNull()
    expect(python.licoes.get('for').anterior).toBeNull()
  })

  it('separa as linguagens pela primeira pasta', () => {
    const cursos = montarCursos({
      ...arquivos,
      niveis: { ...arquivos.niveis, '/content/javascript/1-iniciante/nivel.json': { titulo: 'JS' } },
    })
    expect([...cursos.keys()].sort()).toEqual(['javascript', 'python'])
  })

  it('recusa ids repetidos e pastas sem prefixo', () => {
    expect(() =>
      montarCursos({
        ...arquivos,
        licoes: { ...arquivos.licoes, '/content/python/2-basico/01-lacos/02-ola-mundo.md': licao('x') },
      }),
    ).toThrow(/já existe uma lição/)
    expect(() => montarCursos({ niveis: { '/content/python/iniciante/nivel.json': {} } })).toThrow(/prefixo numérico/)
  })
})

describe('lerArquivoConteudo', () => {
  it('separa o YAML do Markdown', () => {
    const { meta, corpo } = lerArquivoConteudo('---\ntitulo: Oi\nxp: 5\n---\n# Corpo\n')
    expect(meta).toEqual({ titulo: 'Oi', xp: 5 })
    expect(corpo).toBe('# Corpo')
  })

  it('explica quando falta o frontmatter', () => {
    expect(() => lerArquivoConteudo('# só markdown', 'x.md')).toThrow(/x.md: falta o bloco de metadados/)
  })
})
