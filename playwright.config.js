import { defineConfig, devices } from '@playwright/test'

const PORTA = 5199

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 90_000,
  fullyParallel: false,
  reporter: 'list',
  use: { baseURL: `http://localhost:${PORTA}`, ...devices['Desktop Chrome'] },
  webServer: {
    command: `npm run dev -- --port ${PORTA} --strictPort`,
    url: `http://localhost:${PORTA}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
})
