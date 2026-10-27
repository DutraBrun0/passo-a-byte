import { useEffect, useSyncExternalStore } from 'react'

/** Estado de carga do interpretador de uma linguagem; dispara a carga ao montar. */
export function useEstadoCarga(adaptador) {
  const estado = useSyncExternalStore(adaptador.assinarCarga, adaptador.estadoCarga)
  useEffect(() => {
    // Erros de carga ficam no próprio estado (fase "erro"); aqui só disparamos.
    adaptador.preparar().catch(() => {})
  }, [adaptador])
  return estado
}
