import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { loadPyodide } from 'pyodide'
import { instalarRuntime } from '../../../src/linguagens/python/runtime/runtime.js'

// No Vitest o Pyodide não descobre sozinho a própria pasta, então ela é passada explicitamente.
const pastaPyodide = dirname(createRequire(import.meta.url).resolve('pyodide'))

let promessa
/** Uma instância por arquivo de teste: carregar o Pyodide leva alguns segundos. */
export function runtimePythonNode() {
  promessa ??= loadPyodide({ indexURL: `${pastaPyodide}/` }).then(instalarRuntime)
  return promessa
}
