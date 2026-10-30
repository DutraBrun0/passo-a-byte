import { traduzirErroJavaScript } from './erros.js'

/** Converte o resultado bruto do executor no ResultadoExecucao do contrato. */
export function normalizarResultado(bruto) {
  const testes = bruto.testes.map((teste) => ({ ...teste, erro: traduzirErroJavaScript(teste.erro) }))
  return {
    console: bruto.console,
    erro: traduzirErroJavaScript(bruto.erro),
    testes,
    passou: !bruto.erro && testes.length > 0 && testes.every((teste) => teste.passou),
    metricas: { passos: bruto.passos, ms: bruto.ms },
  }
}

/** Resultado para quando o Worker travou e precisou ser reiniciado. */
export function resultadoTempoEsgotado() {
  return normalizarResultado({
    console: '',
    erro: { tipo: 'TempoEsgotado', mensagem: '', linha: null },
    testes: [],
    passos: 0,
    ms: 0,
  })
}
