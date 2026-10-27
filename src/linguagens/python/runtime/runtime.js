import codigoExecutor from './executor.py?raw'
import { criarSimulador } from '../../../nucleo/robo/simulador.js'

/**
 * Instala o executor em uma instância já carregada do Pyodide.
 * É o mesmo código no Web Worker do navegador e nos testes em Node, então o que
 * os testes validam é exatamente o que o aluno executa.
 */
export function instalarRuntime(pyodide) {
  const escopo = pyodide.globals.get('dict')()
  pyodide.runPython(codigoExecutor, { globals: escopo })
  const executarJson = escopo.get('executar_json')
  const executarRoboJson = escopo.get('executar_robo_json')

  return {
    versaoPython: pyodide.runPython('import sys; sys.version.split()[0]'),

    /** @returns {object} resultado bruto do executor (ver executor.py › executar) */
    executar(codigo, opcoes) {
      return JSON.parse(executarJson(codigo, JSON.stringify(opcoes)))
    },

    /**
     * Roda um programa do robô. O simulador (JS) é passado ao Python, que chama
     * andar(), tem_parede() etc. de forma síncrona; o trace sai do simulador.
     */
    executarRobo(codigo, fase, opcoes) {
      const simulador = criarSimulador(fase)
      const bruto = JSON.parse(executarRoboJson(codigo, JSON.stringify(opcoes), simulador.api))
      const veredito = simulador.concluir()
      return {
        ...bruto,
        trace: simulador.trace,
        sucesso: !bruto.erro && veredito.sucesso,
        motivo: bruto.erro ? null : veredito.motivo,
      }
    },
  }
}
