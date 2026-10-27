/** Valor com assinantes, no formato que o useSyncExternalStore do React espera. */
export function criarEstadoObservavel(inicial) {
  let atual = inicial
  const ouvintes = new Set()
  return {
    obter: () => atual,
    definir(proximo) {
      atual = proximo
      for (const ouvinte of ouvintes) ouvinte(atual)
    },
    assinar(ouvinte) {
      ouvintes.add(ouvinte)
      return () => ouvintes.delete(ouvinte)
    },
  }
}
