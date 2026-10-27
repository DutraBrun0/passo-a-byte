import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const versaoPyodide = JSON.parse(readFileSync(new URL('./node_modules/pyodide/package.json', import.meta.url))).version

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __PYODIDE_VERSAO__: JSON.stringify(versaoPyodide),
  },
  // Workers em ES module: o Worker do Python usa import() para carregar o Pyodide.
  worker: { format: 'es' },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{js,jsx}', 'tests/js/**/*.test.js'],
    testTimeout: 30_000,
  },
})
