import { useEffect } from 'react'

const SELETOR = '[data-inclinar]'
const GRAUS_MAXIMOS = 6

/**
 * Cards marcados com data-inclinar acompanham o ponteiro: inclinam em 3D e um
 * brilho segue o mouse (CSS em index.css). Um só listener na raiz atende todos
 * os cards, inclusive os que aparecem depois. Só com mouse e sem
 * prefers-reduced-motion.
 */
export function useInclinarCartoes(raiz) {
  useEffect(() => {
    const elemento = raiz.current
    const podeAnimar =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!elemento || !podeAnimar) return

    let quadro = 0
    let ultimo = null

    const mover = (evento) => {
      const cartao = evento.target.closest?.(SELETOR)
      if (ultimo && ultimo !== cartao) soltar(ultimo)
      ultimo = cartao
      if (!cartao) return
      cancelAnimationFrame(quadro)
      quadro = requestAnimationFrame(() => {
        const caixa = cartao.getBoundingClientRect()
        const x = (evento.clientX - caixa.left) / caixa.width
        const y = (evento.clientY - caixa.top) / caixa.height
        cartao.style.setProperty('--inclina-x', `${((0.5 - y) * GRAUS_MAXIMOS).toFixed(2)}deg`)
        cartao.style.setProperty('--inclina-y', `${((x - 0.5) * GRAUS_MAXIMOS).toFixed(2)}deg`)
        cartao.style.setProperty('--luz-x', `${(x * 100).toFixed(1)}%`)
        cartao.style.setProperty('--luz-y', `${(y * 100).toFixed(1)}%`)
        cartao.dataset.inclinado = ''
      })
    }

    const soltar = (cartao) => {
      cancelAnimationFrame(quadro)
      delete cartao.dataset.inclinado
      cartao.style.removeProperty('--inclina-x')
      cartao.style.removeProperty('--inclina-y')
    }

    const sair = () => {
      if (ultimo) soltar(ultimo)
      ultimo = null
    }

    elemento.addEventListener('pointermove', mover)
    elemento.addEventListener('pointerleave', sair)
    return () => {
      cancelAnimationFrame(quadro)
      elemento.removeEventListener('pointermove', mover)
      elemento.removeEventListener('pointerleave', sair)
    }
  }, [raiz])
}
