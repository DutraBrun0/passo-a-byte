import codigoExecutor from './executor.py?raw'

/**
 * Instala o executor em uma instância já carregada do Pyodide.
 * É o mesmo código no Web Worker do navegador e nos testes em Node, então o que
 * os testes validam é exatamente o que o aluno executa.
 */
export function instalarRuntime(pyodide) {
  const escopo = pyodide.globals.get('dict')()
  pyodide.runPython(codigoExecutor, { globals: escopo })
  const executarJson = escopo.get('executar_json')

  return {
    versaoPython: pyodide.runPython('import sys; sys.version.split()[0]'),

    /** @returns {object} resultado bruto do executor (ver executor.py › executar) */
    executar(codigo, opcoes) {
      return JSON.parse(executarJson(codigo, JSON.stringify(opcoes)))
    },
  }
}
