import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'

/**
 * Badge em pixel art. Bloqueada fica em tons de cinza e com opacidade reduzida;
 * desbloqueada balança no hover e inclina seguindo o mouse.
 */
export function Conquista({ conquista, desbloqueadaEm, compacta = false }) {
  const bloqueada = !desbloqueadaEm
  const cartao = compacta
    ? ''
    : `rounded-cards border border-card-edge bg-paper-white p-16 ${bloqueada ? '' : 'levita group hover:border-signal-orange hover:shadow-xl'}`
  return (
    <div className={`flex items-center gap-16 ${cartao}`} data-inclinar={compacta || bloqueada ? undefined : ''}>
      <div
        className={`flex shrink-0 items-center justify-center rounded-md p-8 ${
          bloqueada ? 'bg-cloud-mist opacity-40 grayscale' : 'balanca-no-hover bg-warm-cream'
        }`}
      >
        <PixelSprite nome={conquista.sprite} escala={3} />
      </div>
      <div className="min-w-0">
        <p className="text-body-sm font-bold text-midnight-ink">{conquista.titulo}</p>
        <p className="text-caption text-slate-pencil">
          {conquista.descricao}
          {bloqueada ? ' (bloqueada)' : ''}
        </p>
      </div>
    </div>
  )
}

/** Comemoração das conquistas recém-desbloqueadas: cada uma "estoura" na tela. */
export function ConquistasNovas({ conquistas }) {
  if (!conquistas?.length) return null
  return (
    <div className="mt-8 flex flex-col gap-8" role="status">
      <p className="animate-estoura text-body-sm font-bold text-ember-crust">
        {conquistas.length === 1 ? 'Nova conquista!' : `${conquistas.length} novas conquistas!`}
      </p>
      {conquistas.map((conquista, i) => (
        <div key={conquista.id} className="animate-estoura" style={{ animationDelay: `${150 + i * 150}ms` }}>
          <Conquista conquista={conquista} desbloqueadaEm compacta />
        </div>
      ))}
    </div>
  )
}
