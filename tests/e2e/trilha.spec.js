import { expect, test } from '@playwright/test'

async function concluirOlaMundo(page) {
  await page.goto('/python/licao/ola-mundo')
  await page.getByRole('textbox', { name: /Código do exercício/ }).click()
  await page.keyboard.press('Control+A')
  await page.keyboard.type('print("Olá, mundo!")')
  await page.getByRole('button', { name: 'Executar' }).click()
  await expect(page.getByText('Exercício concluído!')).toBeVisible({ timeout: 60_000 })
}

test.describe('trilha e progresso', () => {
  test('a segunda lição começa bloqueada e abre depois da primeira', async ({ page }) => {
    await page.goto('/python/licao/varios-valores')
    await expect(page.getByText('Lição bloqueada')).toBeVisible()

    await page.goto('/python/trilha')
    await expect(page.getByText(/^0 de \d+ lições concluídas$/)).toBeVisible()

    await concluirOlaMundo(page)
    await expect(page.getByText(/novas? conquistas?!/i)).toBeVisible()

    await page.goto('/python/trilha')
    await expect(page.getByText(/^1 de \d+ lições concluídas$/)).toBeVisible()
    await expect(page.getByRole('link', { name: /Vários valores no mesmo print/ })).toBeVisible()
  })

  test('o rascunho sobrevive a um recarregamento', async ({ page }) => {
    await page.goto('/python/licao/ola-mundo')
    await page.getByRole('textbox', { name: /Código do exercício/ }).click()
    await page.keyboard.press('Control+A')
    await page.keyboard.type('print("rascunho")')
    await page.waitForTimeout(600)
    await page.reload()
    await expect(page.getByRole('textbox', { name: /Código do exercício/ })).toContainText('print("rascunho")')
  })

  test('exporta e importa o progresso em JSON', async ({ page }, info) => {
    await concluirOlaMundo(page)
    await page.goto('/progresso')
    await expect(page.getByText('Primeiro passo')).toBeVisible()

    const download = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Exportar arquivo' }).click()
    const arquivo = info.outputPath('progresso.json')
    await (await download).saveAs(arquivo)

    await page.getByRole('button', { name: 'Apagar progresso' }).click()
    await page.getByRole('button', { name: 'Sim, apagar' }).click()
    await expect(page.getByText(/^0 de \d+ lições$/)).toBeVisible()

    await page.locator('input[type=file]').setInputFiles(arquivo)
    await expect(page.getByText('Progresso importado com sucesso.')).toBeVisible()
    await expect(page.getByText(/^1 de \d+ lições$/)).toBeVisible()
  })
})
