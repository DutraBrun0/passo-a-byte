import { beforeAll, describe, expect, it } from 'vitest'
import { LIMITES_PYTHON } from '../limites.js'
import { runtimePythonNode } from '../../../../tests/js/apoio/pyodide.js'

let runtime
const rodar = (codigo, opcoes = {}) => runtime.executar(codigo, { limites: LIMITES_PYTHON, ...opcoes })

beforeAll(async () => {
  runtime = await runtimePythonNode()
}, 60_000)

describe('executor Python: execução', () => {
  it('captura o print', () => {
    const r = rodar('print("olá")\nprint(1 + 2)')
    expect(r.erro).toBeNull()
    expect(r.console).toBe('olá\n3\n')
  })

  it('simula input() com a fila de entrada e mostra o que foi "digitado"', () => {
    const r = rodar('nome = input("Nome: ")\nprint("Oi,", nome)', { entrada: ['Ana'] })
    expect(r.console).toBe('Nome: Ana\nOi, Ana\n')
  })

  it('avisa quando o input() não tem dados', () => {
    const r = rodar('x = input()')
    expect(r.erro).toMatchObject({ tipo: 'EOFError', linha: 1 })
  })

  it('aponta a linha do erro de sintaxe', () => {
    const r = rodar('print("a")\nif True\n    print("b")')
    expect(r.erro).toMatchObject({ tipo: 'SyntaxError', linha: 2 })
    expect(r.console).toBe('')
  })

  it('aponta a linha de um erro em tempo de execução', () => {
    const r = rodar('x = 1\nprint(y)')
    expect(r.erro).toMatchObject({ tipo: 'NameError', linha: 2 })
  })

  it('aponta a linha dentro de uma função do aluno', () => {
    const r = rodar('def f():\n    return 1 / 0\n\nf()')
    expect(r.erro).toMatchObject({ tipo: 'ZeroDivisionError', linha: 2 })
  })
})

describe('executor Python: limites e restrições', () => {
  it('interrompe loop infinito pelo limite de passos', () => {
    const r = rodar('while True:\n    pass', { limites: { ...LIMITES_PYTHON, passos: 10_000 } })
    expect(r.erro.tipo).toBe('LimiteDePassos')
  })

  it('o limite não é engolido por except Exception', () => {
    const codigo = 'while True:\n    try:\n        pass\n    except Exception:\n        pass'
    const r = rodar(codigo, { limites: { ...LIMITES_PYTHON, passos: 10_000 } })
    expect(r.erro.tipo).toBe('LimiteDePassos')
  })

  it('interrompe saída exagerada', () => {
    const r = rodar('for i in range(10**6):\n    print(i)', { limites: { ...LIMITES_PYTHON, saida: 1000 } })
    expect(r.erro.tipo).toBe('LimiteDeSaida')
  })

  it.each(['js', 'pyodide', 'os', 'sys', 'subprocess', 'socket', 'urllib.request', 'importlib'])(
    'bloqueia import %s',
    (modulo) => {
      expect(rodar(`import ${modulo}`).erro.tipo).toBe('ImportError')
    },
  )

  it('bloqueia import dentro de função e via from', () => {
    expect(rodar('def f():\n    import js\nf()').erro.tipo).toBe('ImportError')
    expect(rodar('from os import path').erro.tipo).toBe('ImportError')
  })

  it('permite módulos da biblioteca padrão liberados', () => {
    const r = rodar('import math\nfrom collections import Counter\nprint(math.sqrt(16), Counter("aab")["a"])')
    expect(r.erro).toBeNull()
    expect(r.console).toBe('4.0 2\n')
  })

  it('remove open, eval e exec', () => {
    for (const codigo of ['open("x")', 'eval("1")', 'exec("x = 1")']) {
      expect(rodar(codigo).erro.tipo).toBe('NameError')
    }
  })

  it('cada execução começa com um namespace limpo', () => {
    rodar('segredo = 42')
    expect(rodar('print(segredo)').erro.tipo).toBe('NameError')
  })
})

describe('executor Python: testes automáticos', () => {
  it('compara a saída ignorando espaços no fim das linhas, sem os prompts do input', () => {
    const r = rodar('n = int(input("Número: "))\nprint(n * 2, "  ")', {
      testes: [
        { tipo: 'saida', entrada: ['4'], esperado: '8' },
        { tipo: 'saida', entrada: ['5'], esperado: '11' },
      ],
      entrada: ['1'],
    })
    expect(r.testes.map((t) => t.passou)).toEqual([true, false])
    expect(r.testes[1]).toMatchObject({ esperado: '11', obtido: '10' })
  })

  it('testa o retorno de funções', () => {
    const r = rodar('def dobro(x):\n    return x * 2', {
      testes: [
        { tipo: 'funcao', funcao: 'dobro', args: [3], esperado: 6 },
        { tipo: 'funcao', funcao: 'dobro', args: [0.1], esperado: 0.2 },
        { tipo: 'funcao', funcao: 'triplo', args: [1], esperado: 3 },
      ],
    })
    expect(r.testes.map((t) => t.passou)).toEqual([true, true, false])
  })

  it('não confunde True com 1', () => {
    const r = rodar('def f():\n    return 1', { testes: [{ tipo: 'funcao', funcao: 'f', esperado: true }] })
    expect(r.testes[0].passou).toBe(false)
  })

  it('compara tuplas com listas e conjuntos com listas', () => {
    const r = rodar('par = (1, 2)\nletras = {"a", "b"}', {
      testes: [
        { tipo: 'variavel', nome: 'par', esperado: [1, 2] },
        { tipo: 'variavel', nome: 'letras', esperado: ['b', 'a'] },
      ],
    })
    expect(r.testes.every((t) => t.passou)).toBe(true)
  })

  it('verifica o tipo de uma variável', () => {
    const r = rodar('preco = 9.9', { testes: [{ tipo: 'variavel', nome: 'preco', tipo_esperado: 'float' }] })
    expect(r.testes[0].passou).toBe(true)
  })

  it('roda asserts arbitrários', () => {
    const r = rodar('def soma(*n):\n    return sum(n)', {
      testes: [
        { tipo: 'python', codigo: 'assert soma(1, 2, 3) == 6' },
        { tipo: 'python', codigo: 'assert soma() == 1' },
      ],
    })
    expect(r.testes.map((t) => t.passou)).toEqual([true, false])
  })

  it('verifica a estrutura do código (ex.: exige um for, proíbe while)', () => {
    const testes = [{ tipo: 'estrutura', usa: ['For'], nao_usa: ['While'] }]
    expect(rodar('for i in range(3):\n    print(i)', { testes }).testes[0].passou).toBe(true)
    expect(rodar('i = 0\nwhile i < 3:\n    i += 1', { testes }).testes[0].passou).toBe(false)
  })

  it('um loop infinito dentro da função testada também é interrompido', () => {
    const r = rodar('def f():\n    while True:\n        pass', {
      limites: { ...LIMITES_PYTHON, passos: 10_000 },
      testes: [{ tipo: 'funcao', funcao: 'f', esperado: 1 }],
    })
    expect(r.testes[0].erro.tipo).toBe('LimiteDePassos')
  })
})
