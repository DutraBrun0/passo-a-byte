/*
 * Limites de segurança do JavaScript. O executor interrompe o código com um
 * erro amigável ao atingir passos/tempo/saída; o supervisor do Worker é a
 * última linha de defesa (terminate) para uma única operação gigante que não
 * passa pelos marcadores de instrução, como new Array(1e9).fill(0).
 */
export const LIMITES_JAVASCRIPT = {
  passos: 500_000, // instruções executadas do código do aluno
  segundos: 4, // tempo de execução
  saida: 50_000, // caracteres mostrados
}

export const TEMPO_LIMITE_WORKER_MS = 10_000
