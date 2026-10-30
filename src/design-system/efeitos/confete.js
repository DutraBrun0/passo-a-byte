import { corDoToken } from '../sprites/cores.js'

/*
 * Confete em pixel art: quadradinhos nas cores da paleta, lançados de um ponto
 * da tela, com gravidade. Um canvas temporário cobre a tela por ~2 s e some.
 * Os quadrados "viram" encolhendo a largura, sem rotação, para manter o pixel
 * reto como no resto do site.
 */
const CORES = ['signal-orange', 'ember-crust', 'warm-cream', 'cloud-shade', 'ash-mist']
const DURACAO_MS = 2000
const GRAVIDADE = 0.38
const ARRASTO = 0.985

const sortear = (min, max) => min + Math.random() * (max - min)

/** Solta confete a partir de (x, y), em coordenadas da janela. */
export function soltarConfete({ x = innerWidth / 2, y = innerHeight / 2, quantidade = 80 } = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const escala = window.devicePixelRatio || 1
  const canvas = document.createElement('canvas')
  canvas.width = innerWidth * escala
  canvas.height = innerHeight * escala
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '60' })
  document.body.append(canvas)

  const ctx = canvas.getContext('2d')
  ctx.scale(escala, escala)
  const cores = CORES.map(corDoToken)
  const pecas = Array.from({ length: quantidade }, () => ({
    x,
    y,
    vx: sortear(-7, 7),
    vy: sortear(-13, -4),
    tamanho: [4, 6, 8][Math.floor(Math.random() * 3)],
    cor: cores[Math.floor(Math.random() * cores.length)],
    fase: sortear(0, Math.PI * 2),
    giro: sortear(0.08, 0.25),
  }))

  const inicio = performance.now()
  const quadro = (agora) => {
    const decorrido = agora - inicio
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.globalAlpha = Math.min(1, 2 - (decorrido / DURACAO_MS) * 2)
    for (const peca of pecas) {
      peca.vx *= ARRASTO
      peca.vy = peca.vy * ARRASTO + GRAVIDADE
      peca.x += peca.vx
      peca.y += peca.vy
      peca.fase += peca.giro
      const largura = Math.max(1, Math.round(peca.tamanho * Math.abs(Math.cos(peca.fase))))
      ctx.fillStyle = peca.cor
      ctx.fillRect(Math.round(peca.x - largura / 2), Math.round(peca.y), largura, peca.tamanho)
    }
    if (decorrido < DURACAO_MS) requestAnimationFrame(quadro)
    else canvas.remove()
  }
  requestAnimationFrame(quadro)
}

/** Confete saindo do centro de um elemento (por exemplo, o botão clicado). */
export function soltarConfeteDe(elemento, opcoes) {
  if (!elemento) return soltarConfete(opcoes)
  const caixa = elemento.getBoundingClientRect()
  return soltarConfete({ x: caixa.left + caixa.width / 2, y: caixa.top + caixa.height / 2, ...opcoes })
}
