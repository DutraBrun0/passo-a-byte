import { useEffect, useState } from 'react'
import { PixelSprite } from '../../design-system/sprites/PixelSprite.jsx'

/*
 * O Bit da página inicial: clique nele para ele pular e dizer alguma coisa.
 * A cada CLIQUES_PARA_GIRAR cliques seguidos, ele dá uma pirueta.
 */
const FALAS = [
  'Oi! Eu sou o Bit.',
  'Ctrl + Enter executa o seu código!',
  'Errou? O Python explica o erro em português.',
  'Já conhece os Desafios do Robô?',
  'Um passo por vez, um byte por vez.',
  'print("bip bop")',
  'Dica: as dicas abrem uma de cada vez.',
  'Ei, isso faz cócegas!',
]
const CLIQUES_PARA_GIRAR = 5
const TEMPO_DA_FALA_MS = 3200

export function BitInterativo() {
  const [cliques, setCliques] = useState(0)
  const [falando, setFalando] = useState(false)

  useEffect(() => {
    if (!falando) return
    const temporizador = setTimeout(() => setFalando(false), TEMPO_DA_FALA_MS)
    return () => clearTimeout(temporizador)
  }, [falando, cliques])

  const cutucar = () => {
    setCliques((n) => n + 1)
    setFalando(true)
  }

  const fala = FALAS[(cliques - 1 + FALAS.length) % FALAS.length]
  const girando = cliques > 0 && cliques % CLIQUES_PARA_GIRAR === 0

  return (
    <div className="relative">
      {falando && (
        <p
          key={cliques}
          role="status"
          className="absolute bottom-full right-0 mb-8 w-max max-w-[14rem] animate-estoura rounded-cards border-2 border-graphite-ink bg-paper-white px-16 py-8 text-left text-body-sm font-medium text-graphite-ink shadow-md"
        >
          {girando ? 'Uhuuu! Pirueta!' : fala}
          {/* Rabinho do balão, em pixel */}
          <span className="absolute -bottom-[10px] right-24 h-16 w-16 rotate-45 border-b-2 border-r-2 border-graphite-ink bg-paper-white" />
        </p>
      )}
      <button
        type="button"
        onClick={cutucar}
        aria-label="Cutucar o Bit, o robô mascote"
        className="block cursor-pointer rounded-md transition-transform duration-150 hover:scale-110 active:scale-95"
      >
        <span key={cliques} className={`block ${girando ? 'animate-giro' : cliques ? 'animate-pulo' : 'animate-flutua'}`}>
          <PixelSprite nome="robo" escala={4} />
        </span>
      </button>
    </div>
  )
}
