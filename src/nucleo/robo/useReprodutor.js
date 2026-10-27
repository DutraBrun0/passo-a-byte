import { useEffect, useState } from 'react'
import { duracaoDoQuadro } from './reprodutor.js'

/**
 * Controla a reprodução de um trace: tocar, pausar, avançar um passo e reiniciar.
 * `indice` -1 significa "antes do primeiro passo" (robô na posição inicial).
 */
export function useReprodutor(trace, velocidade) {
  const [indice, setIndice] = useState(-1)
  const [tocando, setTocando] = useState(false)
  const ultimo = (trace?.length ?? 0) - 1
  const terminou = trace != null && indice >= ultimo

  useEffect(() => {
    if (!tocando) return undefined
    if (indice >= ultimo) {
      setTocando(false)
      return undefined
    }
    const temporizador = setTimeout(() => setIndice((i) => i + 1), duracaoDoQuadro(trace[indice + 1], velocidade))
    return () => clearTimeout(temporizador)
  }, [tocando, indice, ultimo, trace, velocidade])

  return {
    indice,
    tocando,
    terminou,
    tocar: () => setTocando(true),
    pausar: () => setTocando(false),
    passo: () => {
      setTocando(false)
      setIndice((i) => Math.min(i + 1, ultimo))
    },
    reiniciar: () => {
      setTocando(false)
      setIndice(-1)
    },
  }
}
