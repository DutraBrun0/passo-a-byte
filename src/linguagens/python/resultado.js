import { traduzirErroPython } from './erros.js'

/** Converte o resultado bruto do executor.py no ResultadoExecucao do contrato. */
export function normalizarResultado(bruto) {
  const testes = bruto.testes.map((teste) => ({ ...teste, erro: traduzirErroPython(teste.erro) }))
  return {
    console: bruto.console,
    erro: traduzirErroPython(bruto.erro),
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

/** Resultado de um programa do robô: o trace vem pronto do simulador. */
export function normalizarResultadoRobo(bruto) {
  return {
    trace: bruto.trace,
    sucesso: bruto.sucesso,
    motivo: bruto.motivo,
    console: bruto.console,
    erro: traduzirErroPython(bruto.erro),
    metricas: { passos: bruto.passos, ms: bruto.ms },
  }
}
