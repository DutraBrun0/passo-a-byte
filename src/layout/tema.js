import { useSyncExternalStore } from 'react'

/*
 * Tema claro/escuro. O valor vive no atributo data-tema do <html>, que o
 * script do index.html define antes do React carregar (sem piscar). Aqui só
 * trocamos o atributo, salvamos a escolha e avisamos quem estiver ouvindo.
 */
const CHAVE = 'passo-a-byte:tema'
const COR_BARRA = { claro: '#e3f1fe', escuro: '#0e1218' }
const ouvintes = new Set()

const temaAtual = () => (document.documentElement.dataset.tema === 'escuro' ? 'escuro' : 'claro')

function aplicar(tema) {
  document.documentElement.dataset.tema = tema
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COR_BARRA[tema])
  try {
    localStorage.setItem(CHAVE, tema)
  } catch {
    // Sem localStorage (modo privado): o tema vale só nesta visita.
  }
  ouvintes.forEach((avisar) => avisar())
}

/**
 * Alterna o tema. Onde o navegador permite, a troca se espalha em círculo a
 * partir de `origem` (o botão clicado), com a View Transitions API.
 */
export function alternarTema(origem) {
  const novo = temaAtual() === 'escuro' ? 'claro' : 'escuro'
  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || semAnimacao) {
    aplicar(novo)
    return
  }
  const { x, y } = origem ?? { x: innerWidth / 2, y: 0 }
  const raio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const transicao = document.startViewTransition(() => aplicar(novo))
  transicao.ready
    .then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${raio}px at ${x}px ${y}px)`] },
        { duration: 520, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => {})
}

function assinar(avisar) {
  ouvintes.add(avisar)
  return () => ouvintes.delete(avisar)
}

/** 'claro' ou 'escuro', atualizado quando o tema muda. */
export function useTema() {
  return useSyncExternalStore(assinar, temaAtual, () => 'claro')
}
