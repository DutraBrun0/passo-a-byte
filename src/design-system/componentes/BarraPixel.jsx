/*
 * Barra de progresso em blocos (estilo barra de vida de jogo 8-bit).
 * `valor` vai de 0 a 1; sem valor, os blocos piscam em sequência (indeterminado).
 */
export function BarraPixel({ valor, blocos = 20, rotulo, className = '' }) {
  const preenchidos = valor == null ? 0 : Math.round(Math.min(1, Math.max(0, valor)) * blocos)
  const indeterminado = valor == null
  return (
    <div
      role="progressbar"
      aria-label={rotulo}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminado ? undefined : Math.round(valor * 100)}
      className={`flex gap-4 rounded-md border-2 border-graphite-ink bg-paper-white p-4 ${className}`}
    >
      {Array.from({ length: blocos }, (_, i) => (
        <span
          key={i}
          className={`h-16 flex-1 ${
            indeterminado
              ? 'animate-pisca bg-signal-orange'
              : i < preenchidos
                ? 'bg-signal-orange'
                : 'bg-cloud-mist'
          }`}
          style={indeterminado ? { animationDelay: `${(i % blocos) * 80}ms` } : undefined}
        />
      ))}
    </div>
  )
}
