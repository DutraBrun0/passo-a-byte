import { expect, test } from '@playwright/test'

async function escrever(page, codigo) {
  await page.getByRole('textbox', { name: /Código do robô/ }).click()
  await page.keyboard.press('Control+A')
  await page.keyboard.press('Delete')
  // O editor auto-indenta depois de ":"; digitar linha a linha sem o recuo original evita recuo dobrado.
  for (const [i, linha] of codigo.split('\n').entries()) {
    if (i > 0) {
      await page.keyboard.press('Enter')
      await page.keyboard.press('Shift+Home')
      await page.keyboard.press('Delete')
    }
    await page.keyboard.type(linha)
  }
}

test.describe('Desafios do Robô', () => {
  test('lista as fases e só a primeira começa liberada', async ({ page }) => {
    await page.goto('/python/robo')
    await expect(page.getByRole('heading', { name: 'Desafios do Robô' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Primeiros passos/ })).toBeVisible()
    await expect(page.getByText('Bloqueada').first()).toBeVisible()
  })

  test('executa, anima o trace e conclui a fase', async ({ page }) => {
    await page.goto('/python/robo/primeiros-passos')
    await escrever(page, 'for i in range(4):\n    andar()')
    await page.getByRole('slider', { name: 'Velocidade' }).fill('4')
    await page.getByRole('button', { name: 'Executar' }).click()
    await expect(page.getByText('O Bit chegou à saída!')).toBeVisible({ timeout: 60_000 })
    await expect(page.getByRole('link', { name: 'Próxima fase' })).toBeVisible()
  })

  test('passo a passo destaca a linha atual e mostra o erro ao bater na parede', async ({ page }) => {
    await page.goto('/python/robo/primeiros-passos')
    await escrever(page, 'andar()\nvirar_direita()\nandar()')
    await page.getByRole('button', { name: 'Passo a passo' }).click()
    await expect(page.getByText('O Bit andou uma casa.')).toBeVisible({ timeout: 60_000 })
    await expect(page.locator('.cm-linha-atual')).toHaveText('andar()')

    await page.getByRole('button', { name: 'Passo a passo' }).click()
    await expect(page.getByText('O Bit virou para a direita.')).toBeVisible()
    await expect(page.locator('.cm-linha-atual')).toHaveText('virar_direita()')

    await page.getByRole('button', { name: 'Passo a passo' }).click()
    await expect(page.getByText('O Bit não conseguiu · linha 3')).toBeVisible()
    await expect(page.locator('.cm-linha-erro')).toHaveText('andar()')
  })

  test('concluir uma fase libera a próxima', async ({ page }) => {
    await page.goto('/python/robo/primeiros-passos')
    await escrever(page, 'andar()\nandar()\nandar()\nandar()')
    await page.getByRole('button', { name: 'Executar' }).click()
    await expect(page.getByText('O Bit chegou à saída!')).toBeVisible({ timeout: 60_000 })
    await page.getByRole('link', { name: 'Próxima fase' }).click()
    await expect(page.getByRole('heading', { name: 'A primeira curva' })).toBeVisible()
  })

  test('recusa executar acima do limite de linhas', async ({ page }) => {
    // Semeia o progresso salvo como se as fases 1 e 2 já estivessem concluídas.
    await page.addInitScript(() => {
      const fase = { concluidaEm: '2026-10-01T12:00:00.000Z', melhorLinhas: 4 }
      const dados = {
        versao: 1,
        xp: 40,
        licoes: {},
        fases: { 'python/primeiros-passos': fase, 'python/primeira-curva': fase },
        sequencia: { atual: 1, melhor: 1, ultimoDia: '2026-10-01' },
        conquistas: {},
      }
      localStorage.setItem('passo-a-byte:progresso', JSON.stringify({ state: { dados }, version: 1 }))
    })
    await page.goto('/python/robo/escada')
    await escrever(page, 'andar()\n'.repeat(7).trim())
    await expect(page.getByText('Linhas: 7 de 6')).toBeVisible()
    await page.getByRole('button', { name: 'Executar' }).click()
    await expect(page.getByText(/no máximo 6 linhas/)).toBeVisible()
  })
})
