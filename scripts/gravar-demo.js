/*
 * Grava docs/demo.gif para o README: sobe o Vite, abre o Chromium do
 * Playwright, resolve uma lição e uma fase do robô e junta as capturas num GIF.
 *
 *   npm run demo:gif
 *   DEMO_QUADROS=pasta npm run demo:gif   (também salva cada quadro em PNG, para conferir)
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'
import gifenc from 'gifenc'
import { PNG } from 'pngjs'
import { createServer } from 'vite'

const { GIFEncoder, quantize, applyPalette } = gifenc
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const destino = join(raiz, 'docs', 'demo.gif')
// Acima de 1024px a lição e a fase ficam em duas colunas (editor ao lado do conteúdo).
const LARGURA = 1100
const ALTURA = 800

const quadros = []
async function capturar(pagina, duracaoMs = 120) {
  const png = await pagina.screenshot()
  const anterior = quadros.at(-1)
  // Quadro idêntico ao anterior só estende a duração dele (GIF bem menor).
  if (anterior && anterior.png.equals(png)) anterior.duracaoMs += duracaoMs
  else quadros.push({ png, duracaoMs })
}

// Digita linha a linha deixando o editor cuidar do recuo (ele indenta depois de ":" e recua o "else:").
async function digitar(pagina, rotulo, codigo) {
  await pagina.getByRole('textbox', { name: rotulo }).click()
  await pagina.keyboard.press('Control+A')
  await pagina.keyboard.press('Delete')
  for (const [i, linha] of codigo.split('\n').entries()) {
    if (i > 0) await pagina.keyboard.press('Enter')
    await pagina.keyboard.type(linha, { delay: 25 })
    await capturar(pagina, 90)
  }
}

const servidor = await createServer({ root: raiz, server: { port: 5198, strictPort: true } })
await servidor.listen()
const navegador = await chromium.launch()
try {
  const contexto = await navegador.newContext({ viewport: { width: LARGURA, height: ALTURA } })
  // Libera a fase "Espiral" semeando o progresso das anteriores.
  await contexto.addInitScript(() => {
    const fase = { concluidaEm: '2026-10-01T12:00:00.000Z', melhorLinhas: 4 }
    const fases = Object.fromEntries(
      ['primeiros-passos', 'primeira-curva', 'escada', 'corredor-sem-fim', 'a-chave'].map((id) => [`python/${id}`, fase]),
    )
    const dados = { versao: 1, xp: 130, licoes: {}, fases, sequencia: { atual: 1, melhor: 1, ultimoDia: null }, conquistas: {} }
    if (!localStorage.getItem('passo-a-byte:progresso')) {
      localStorage.setItem('passo-a-byte:progresso', JSON.stringify({ state: { dados }, version: 1 }))
    }
  })
  const pagina = await contexto.newPage()
  const base = 'http://localhost:5198'

  // Cena 1: página inicial.
  await pagina.goto(base)
  await pagina.waitForTimeout(800)
  await capturar(pagina, 1800)

  // Cena 2: uma lição com erro amigável e depois acerto.
  await pagina.goto(`${base}/python/licao/ola-mundo`)
  await pagina.getByText('Escreva seu código').or(pagina.getByText(/Baixando|Ligando/)).first().waitFor({ timeout: 60_000 })
  await pagina.waitForFunction(() => document.body.innerText.includes('Escreva seu código'), null, { timeout: 60_000 })
  await capturar(pagina, 600)
  await digitar(pagina, /Código do exercício/, 'print(Olá, mundo!)')
  await pagina.getByRole('button', { name: 'Executar' }).click()
  await pagina.getByText('O Python não entendeu esta linha').first().waitFor()
  await capturar(pagina, 1800)
  await digitar(pagina, /Código do exercício/, 'print("Olá, mundo!")')
  await pagina.getByRole('button', { name: 'Executar' }).click()
  await pagina.getByText('Exercício concluído!').waitFor()
  await capturar(pagina, 2000)

  // Cena 3: o robô resolvendo a espiral, quadro a quadro.
  await pagina.goto(`${base}/python/robo/espiral`)
  await pagina.waitForFunction(() => !document.body.innerText.includes('Baixando'), null, { timeout: 60_000 })
  await pagina.evaluate(() => window.scrollTo(0, 200))
  await capturar(pagina, 600)
  await digitar(
    pagina,
    /Código do robô/,
    'while not na_saida():\nif tem_parede():\nvirar_direita()\nelse:\nandar()',
  )
  await pagina.getByRole('slider', { name: 'Velocidade' }).fill('3')
  await pagina.getByRole('button', { name: 'Executar' }).click()
  const fim = pagina.getByText('O Bit chegou à saída!')
  const limite = Date.now() + 30_000
  while (!(await fim.isVisible())) {
    if (Date.now() > limite) throw new Error('A animação não terminou: confira o código digitado na fase.')
    await capturar(pagina, 110)
  }
  await pagina.evaluate(() => window.scrollTo(0, 200))
  await capturar(pagina, 2500)
} finally {
  await navegador.close()
  await servidor.close()
}

// Monta o GIF (paleta de 48 cores por quadro: o sistema visual usa poucas cores).
const gif = GIFEncoder()
for (const { png, duracaoMs } of quadros) {
  const { data, width, height } = PNG.sync.read(png)
  const paleta = quantize(data, 48)
  gif.writeFrame(applyPalette(data, paleta), width, height, { palette: paleta, delay: duracaoMs })
}
gif.finish()
mkdirSync(dirname(destino), { recursive: true })
if (process.env.DEMO_QUADROS) {
  mkdirSync(process.env.DEMO_QUADROS, { recursive: true })
  quadros.forEach(({ png }, i) => writeFileSync(join(process.env.DEMO_QUADROS, `${String(i).padStart(3, '0')}.png`), png))
}
writeFileSync(destino, gif.bytes())
console.log(`${quadros.length} quadros → docs/demo.gif (${(gif.bytes().length / 1e6).toFixed(1)} MB)`)
