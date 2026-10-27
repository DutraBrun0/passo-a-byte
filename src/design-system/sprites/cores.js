// Lê as cores dos tokens no :root, para que canvas e sprites usem a mesma fonte do CSS.
const cache = new Map()

export function corDoToken(nome) {
  if (cache.has(nome)) return cache.get(nome)
  const valor = getComputedStyle(document.documentElement).getPropertyValue(`--color-${nome}`).trim()
  if (valor) cache.set(nome, valor)
  return valor || 'transparent'
}
