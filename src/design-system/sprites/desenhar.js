import { COR_ATUAL, PALETA, SPRITES } from './sprites.js'
import { corDoToken } from './cores.js'

/**
 * Desenha um sprite pixel a pixel em um contexto 2D, na posição (x, y) e com
 * `tamanho` pixels de tela por pixel do sprite. Usado pelo <PixelSprite> e
 * pelo canvas do labirinto, para que todo o site use o mesmo atlas.
 */
export function desenharSprite(ctx, nome, { x = 0, y = 0, tamanho = 1, corAtual = 'currentColor' } = {}) {
  const grade = SPRITES[nome]
  if (!grade) throw new Error(`Sprite desconhecido: ${nome}`)
  ctx.imageSmoothingEnabled = false
  for (let linha = 0; linha < grade.length; linha++) {
    for (let coluna = 0; coluna < grade[linha].length; coluna++) {
      const ch = grade[linha][coluna]
      if (ch === '.') continue
      ctx.fillStyle = ch === COR_ATUAL ? corAtual : corDoToken(PALETA[ch])
      ctx.fillRect(x + coluna * tamanho, y + linha * tamanho, tamanho, tamanho)
    }
  }
}
