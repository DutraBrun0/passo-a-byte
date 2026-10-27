import { test } from '@playwright/test'

// Gera capturas de tela para revisão visual (não falha): CAPTURAS=pasta npx playwright test capturas
const pasta = process.env.CAPTURAS
test.skip(!pasta, 'defina CAPTURAS para gerar as imagens')

const PAGINAS = [
  ['inicio', '/'],
  ['licao', '/python/licao/ola-mundo'],
  ['trilha', '/python/trilha'],
  ['progresso', '/progresso'],
]

for (const [nome, caminho] of PAGINAS) {
  for (const [largura, altura, rotulo] of [
    [1280, 900, 'desktop'],
    [820, 1180, 'tablet'],
  ]) {
    test(`${nome} (${rotulo})`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: altura })
      await page.goto(caminho)
      await page.waitForTimeout(1500)
      await page.screenshot({ path: `${pasta}/${nome}-${rotulo}.png`, fullPage: true })
    })
  }
}
