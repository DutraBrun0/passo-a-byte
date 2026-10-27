/*
 * Limites de segurança do Python. O executor interrompe o código com um erro
 * amigável ao atingir passos/tempo/saída; o supervisor do Worker é a última
 * linha de defesa (terminate) para o que o rastreamento não alcança, como uma
 * única chamada em C muito longa: sum(range(10**12)).
 */
export const LIMITES_PYTHON = {
  passos: 300_000, // linhas executadas do código do aluno
  segundos: 4, // tempo de execução dentro do Python
  saida: 50_000, // caracteres impressos
}

export const TEMPO_LIMITE_WORKER_MS = 10_000
