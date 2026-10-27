import { useEffect, useRef, useState } from 'react'
import { desenharSprite } from '../../design-system/sprites/desenhar.js'

const CASA = 16 // pixels de sprite por casa
const SETAS = { norte: 'setaNorte', sul: 'setaSul', leste: 'setaLeste', oeste: 'setaOeste' }

/**
 * Canvas 2D do labirinto. Desenha na resolução nativa dos sprites (1 pixel de
 * sprite = 1 pixel de canvas) e amplia por CSS com um fator inteiro, para os
 * pixels ficarem quadrados e nítidos em qualquer largura.
 */
export function Labirinto({ mapa, estado, descricao, escalaMaxima = 4 }) {
  const canvas = useRef(null)
  const caixa = useRef(null)
  const [escala, setEscala] = useState(3)
  const largura = mapa.largura * CASA
  const altura = mapa.altura * CASA

  useEffect(() => {
    const observador = new ResizeObserver(([entrada]) => {
      const disponivel = entrada.contentRect.width
      setEscala(Math.max(1, Math.min(escalaMaxima, Math.floor(disponivel / largura))))
    })
    observador.observe(caixa.current)
    return () => observador.disconnect()
  }, [largura, escalaMaxima])

  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0, 0, largura, altura)
    for (let y = 0; y < mapa.altura; y++) {
      for (let x = 0; x < mapa.largura; x++) {
        desenharSprite(ctx, mapa.paredes[y][x] ? 'parede' : 'chao', { x: x * CASA, y: y * CASA })
      }
    }
    desenharSprite(ctx, 'bandeira', { x: mapa.saida.x * CASA, y: mapa.saida.y * CASA })
    for (const chave of estado.chaves) desenharSprite(ctx, 'chave', { x: chave.x * CASA + 2, y: chave.y * CASA + 2 })
    desenharSprite(ctx, 'roboLabirinto', { x: estado.x * CASA, y: estado.y * CASA })
    desenharSprite(ctx, SETAS[estado.direcao], { x: estado.x * CASA + 5, y: estado.y * CASA + 10 })
  }, [mapa, estado, largura, altura])

  return (
    <div ref={caixa} className="flex w-full justify-center">
      <canvas
        ref={canvas}
        width={largura}
        height={altura}
        className="pixelated rounded-cards border border-cloud-mist"
        style={{ width: largura * escala, height: altura * escala }}
        role="img"
        aria-label={descricao}
      />
    </div>
  )
}
