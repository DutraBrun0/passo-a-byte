import { expect, test } from '@playwright/test'

test.describe('página de lição', () => {
  test('o aluno escreve código, executa e vê os testes passarem', async ({ page }) => {
    await page.goto('/python/licao/ola-mundo')
    await expect(page.getByRole('heading', { level: 1, name: 'Olá, mundo!' })).toBeVisible()

    const editor = page.getByRole('textbox', { name: /Código do exercício/ })
    await editor.click()
    await page.keyboard.press('Control+A')
    await page.keyboard.type('print("Olá, mundo")')
    await page.getByRole('button', { name: 'Executar' }).click()

    await expect(page.getByText('Testes: 0 de 1')).toBeVisible({ timeout: 60_000 })
    await expect(page.getByText('Seu código produziu')).toBeVisible()

    await editor.click()
    await page.keyboard.press('Control+A')
    await page.keyboard.type('print("Olá, mundo!")')
    await page.keyboard.press('Control+Enter')

    await expect(page.getByText('Testes: 1 de 1')).toBeVisible()
    await expect(page.getByText('Exercício concluído!')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Próxima lição' })).toBeVisible()
  })

  test('mostra o erro em português com a linha', async ({ page }) => {
    await page.goto('/python/licao/ola-mundo')
    const editor = page.getByRole('textbox', { name: /Código do exercício/ })
    await editor.click()
    await page.keyboard.press('Control+A')
    await page.keyboard.type('print(mensagem)')
    await page.getByRole('button', { name: 'Executar' }).click()
    await expect(page.getByText('Nome não encontrado · linha 1').first()).toBeVisible({ timeout: 60_000 })
  })

  test('a solução libera depois de 3 tentativas', async ({ page }) => {
    await page.goto('/python/licao/ola-mundo')
    await expect(page.getByText(/Libera depois de 3 tentativas/)).toBeVisible()
    for (let i = 0; i < 3; i++) {
      await page.getByRole('button', { name: 'Executar' }).click()
      await expect(page.getByRole('button', { name: 'Executar' })).toBeEnabled({ timeout: 60_000 })
    }
    await page.getByRole('button', { name: 'Ver a solução' }).click()
    await expect(page.getByText('print("Olá, mundo!")')).toBeVisible()
  })
})
