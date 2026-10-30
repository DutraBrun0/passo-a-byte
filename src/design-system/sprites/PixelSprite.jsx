import { useEffect, useRef } from 'react'
import { useTema } from '../../layout/tema.js'
import { dimensoes } from './sprites.js'
import { desenharSprite } from './desenhar.js'

/**
 * Renderiza um sprite no tamanho nativo (1 pixel de canvas por pixel do sprite)
 * e amplia via CSS com `image-rendering: pixelated`, sem antialiasing.
 * Sem `rotulo`, o sprite é decorativo e fica oculto para leitores de tela.
 * `trocas` repinta cores da grade (ver desenharSprite); passe um objeto estável.
 */
export function PixelSprite({ nome, escala = 4, rotulo, trocas, className = '' }) {
  const ref = useRef(null)
  const { largura, altura } = dimensoes(nome)
  // Os pixels 'x' usam a cor do texto, que muda com o tema: redesenha na troca.
  const tema = useTema()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, largura, altura)
    desenharSprite(ctx, nome, { corAtual: getComputedStyle(canvas).color, trocas })
  }, [nome, largura, altura, tema, trocas])

  return (
    <canvas
      ref={ref}
      width={largura}
      height={altura}
      className={`pixelated inline-block shrink-0 ${className}`}
      style={{ width: largura * escala, height: altura * escala }}
      role={rotulo ? 'img' : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
    />
  )
}
