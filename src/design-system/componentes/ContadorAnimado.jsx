import { useEffect, useRef, useState } from 'react'

const DURACAO_MS = 1100

/**
 * Número que conta de 0 até `valor` quando entra na tela (com desaceleração
 * no fim). Com prefers-reduced-motion, mostra o valor final direto.
 */
export function ContadorAnimado({ valor, className = '' }) {
  const ref = useRef(null)
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    const elemento = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setAtual(valor)
      return
    }
    let quadro = 0
    const animar = () => {
      const inicio = performance.now()
      const passo = (agora) => {
        const t = Math.min(1, (agora - inicio) / DURACAO_MS)
        setAtual(Math.round(valor * (1 - (1 - t) ** 3)))
        if (t < 1) quadro = requestAnimationFrame(passo)
      }
      quadro = requestAnimationFrame(passo)
    }
    const observador = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      observador.disconnect()
      animar()
    })
    observador.observe(elemento)
    return () => {
      observador.disconnect()
      cancelAnimationFrame(quadro)
    }
  }, [valor])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {atual}
    </span>
  )
}
