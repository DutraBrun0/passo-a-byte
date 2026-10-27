/*
 * Copia o núcleo do Pyodide de node_modules para public/pyodide/<versão>/,
 * para que o site sirva o interpretador do próprio domínio (sem CDN externo).
 * A versão no caminho permite cache "immutable": uma atualização muda a URL.
 * Também gera manifesto.json com os tamanhos, usado na barra de progresso.
 */
import { createRequire } from 'node:module'
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const origem = dirname(createRequire(import.meta.url).resolve('pyodide'))
const { version } = JSON.parse(readFileSync(join(origem, 'package.json'), 'utf8'))
const destinoBase = join(raiz, 'public', 'pyodide')
const destino = join(destinoBase, version)

// Baixados via fetch (entram na barra de progresso) e carregados via import().
const MEDIDOS = ['pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json']
const IMPORTADOS = ['pyodide.mjs', 'pyodide.asm.mjs']

if (existsSync(join(destino, 'manifesto.json'))) {
  console.log(`Pyodide ${version} já está em public/pyodide/`)
} else {
  rmSync(destinoBase, { recursive: true, force: true })
  mkdirSync(destino, { recursive: true })
  for (const arquivo of [...MEDIDOS, ...IMPORTADOS]) copyFileSync(join(origem, arquivo), join(destino, arquivo))
  const tamanhos = Object.fromEntries(MEDIDOS.map((arquivo) => [arquivo, statSync(join(origem, arquivo)).size]))
  const total = Object.values(tamanhos).reduce((a, b) => a + b, 0)
  writeFileSync(join(destino, 'manifesto.json'), JSON.stringify({ versao: version, total, tamanhos }, null, 2))
  console.log(`Pyodide ${version} copiado para public/pyodide/ (${(total / 1e6).toFixed(1)} MB medidos)`)
}
