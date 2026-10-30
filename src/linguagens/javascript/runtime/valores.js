/*
 * Como os valores de JavaScript aparecem na tela e como são comparados nos testes.
 *
 * O console.log imita o Node (o formato que a pessoa vai ver ao rodar JavaScript
 * fora do navegador): `[ 1, 2, 3 ]`, `{ nome: 'Ana' }`, textos soltos sem aspas
 * e textos dentro de listas com aspas simples.
 */

const PROFUNDIDADE_MAXIMA = 2
const IDENTIFICADOR = /^[A-Za-z_$][\w$]*$/

function chaveDeObjeto(chave) {
  return IDENTIFICADOR.test(chave) ? chave : `'${chave}'`
}

/** Representação de um valor; `citar` põe aspas em textos (dentro de listas e nos testes). */
export function inspecionar(valor, citar = true, nivel = 0) {
  if (typeof valor === 'string') return citar ? `'${valor.replaceAll("'", "\\'")}'` : valor
  if (typeof valor === 'number') return Object.is(valor, -0) ? '-0' : String(valor)
  if (typeof valor === 'bigint') return `${valor}n`
  if (valor === null || valor === undefined || typeof valor === 'boolean' || typeof valor === 'symbol') return String(valor)
  if (typeof valor === 'function') {
    if (/^class\b/.test(Function.prototype.toString.call(valor))) return `[class ${valor.name || '(anonymous)'}]`
    return valor.name ? `[Function: ${valor.name}]` : '[Function (anonymous)]'
  }

  const dentro = (item) => inspecionar(item, true, nivel + 1)
  if (Array.isArray(valor)) {
    if (!valor.length) return '[]'
    if (nivel > PROFUNDIDADE_MAXIMA) return '[Array]'
    return `[ ${valor.map(dentro).join(', ')} ]`
  }
  if (valor instanceof Set) {
    return valor.size ? `Set(${valor.size}) { ${[...valor].map(dentro).join(', ')} }` : 'Set(0) {}'
  }
  if (valor instanceof Map) {
    const pares = [...valor].map(([chave, item]) => `${dentro(chave)} => ${dentro(item)}`)
    return valor.size ? `Map(${valor.size}) { ${pares.join(', ')} }` : 'Map(0) {}'
  }
  if (valor instanceof Error) return `${valor.name}: ${valor.message}`
  if (valor instanceof Date) return valor.toISOString()

  const construtor = Object.getPrototypeOf(valor)?.constructor?.name
  const prefixo = construtor && construtor !== 'Object' ? `${construtor} ` : ''
  const chaves = Object.keys(valor)
  if (!chaves.length) return `${prefixo}{}`
  if (nivel > PROFUNDIDADE_MAXIMA) return '[Object]'
  return `${prefixo}{ ${chaves.map((chave) => `${chaveDeObjeto(chave)}: ${dentro(valor[chave])}`).join(', ')} }`
}

/** Texto de um console.log com vários argumentos. */
export function formatarLog(valores) {
  return valores.map((valor) => inspecionar(valor, false)).join(' ')
}

/** Tipo para os testes de variável: como o typeof, mas distinguindo array e null. */
export function tipoDe(valor) {
  if (Array.isArray(valor)) return 'array'
  if (valor === null) return 'null'
  return typeof valor
}

const ehObjeto = (valor) => valor !== null && typeof valor === 'object' && !Array.isArray(valor) && !(valor instanceof Set)

function numerosProximos(a, b) {
  return Math.abs(a - b) <= Math.max(1e-9 * Math.max(Math.abs(a), Math.abs(b)), 1e-9)
}

/**
 * Compara o valor produzido pelo aluno com o esperado do teste (que vem do YAML).
 * Booleanos exigem o mesmo tipo, números aceitam diferença de arredondamento,
 * um Set pode ser comparado com uma lista e objetos precisam das mesmas chaves.
 */
export function valoresIguais(obtido, esperado) {
  if (typeof obtido === 'boolean' || typeof esperado === 'boolean') return obtido === esperado
  if (typeof obtido === 'number' && typeof esperado === 'number') return numerosProximos(obtido, esperado)
  if (obtido instanceof Set && Array.isArray(esperado)) {
    const alvo = new Set(esperado)
    return obtido.size === alvo.size && [...alvo].every((item) => obtido.has(item))
  }
  if (Array.isArray(obtido) && Array.isArray(esperado)) {
    return obtido.length === esperado.length && obtido.every((item, i) => valoresIguais(item, esperado[i]))
  }
  if (ehObjeto(obtido) && ehObjeto(esperado)) {
    const chaves = Object.keys(obtido)
    const chavesEsperadas = Object.keys(esperado)
    return (
      chaves.length === chavesEsperadas.length &&
      chavesEsperadas.every((chave) => Object.hasOwn(obtido, chave) && valoresIguais(obtido[chave], esperado[chave]))
    )
  }
  return obtido === esperado
}

/** Ignora espaços no fim das linhas e linhas vazias no final, como no Python. */
export function normalizarTexto(texto) {
  const linhas = texto.replaceAll('\r\n', '\n').split('\n').map((linha) => linha.trimEnd())
  while (linhas.length && !linhas.at(-1)) linhas.pop()
  return linhas.join('\n')
}
