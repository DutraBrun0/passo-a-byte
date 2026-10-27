import { expect, test } from '@playwright/test'

test.describe('executor Python no navegador (Web Worker + Pyodide)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/e2e/paginas/executor.html')
    await page.waitForFunction(() => window.prontoParaTeste)
  })

  test('carrega o Pyodide com progresso medido e executa código', async ({ page }) => {
    const resultado = await page.evaluate(() =>
      window.python.executar('nome = input()\nprint(f"Olá, {nome}!")', {
        entrada: ['Bit'],
        testes: [{ tipo: 'saida', entrada: ['Ana'], esperado: 'Olá, Ana!' }],
      }),
    )
    expect(resultado.console).toBe('Bit\nOlá, Bit!\n')
    expect(resultado.passou).toBe(true)

    const fases = await page.evaluate(() => window.fases)
    const downloads = fases.filter((f) => f.fase === 'baixando' && f.carregado > 0)
    expect(downloads.length).toBeGreaterThan(0)
    expect(downloads.at(-1).carregado).toBe(downloads.at(-1).total)
    expect(fases.at(-1)).toMatchObject({ fase: 'pronto' })
  })

  test('traduz erros e corta loops infinitos', async ({ page }) => {
    const erro = await page.evaluate(() => window.python.executar('print("a" + 1)').then((r) => r.erro))
    expect(erro).toMatchObject({ tipo: 'TypeError', titulo: 'Tipos que não combinam', linha: 1 })

    const loop = await page.evaluate(() => window.python.executar('while True:\n    x = 1').then((r) => r.erro))
    expect(['LimiteDePassos', 'LimiteDeTempo']).toContain(loop.tipo)
  })

  test('reinicia o Worker quando uma linha trava e volta a funcionar', async ({ page }) => {
    const travou = await page.evaluate(() => window.python.executar('sum(range(10**13))').then((r) => r.erro.tipo))
    expect(travou).toBe('TempoEsgotado')

    const depois = await page.evaluate(() => window.python.executar('print(2 + 2)').then((r) => r.console))
    expect(depois).toBe('4\n')
  })
})
