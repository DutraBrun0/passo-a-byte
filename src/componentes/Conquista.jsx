import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'

/** Badge em pixel art. Bloqueada fica em tons de cinza e com opacidade reduzida. */
export function Conquista({ conquista, desbloqueadaEm, compacta = false }) {
  const bloqueada = !desbloqueadaEm
  return (
    <div className={`flex items-center gap-16 ${compacta ? '' : 'rounded-cards border border-cloud-mist bg-paper-white p-16'}`}>
      <div
        className={`flex shrink-0 items-center justify-center rounded-md bg-cloud-mist p-8 ${bloqueada ? 'opacity-40 grayscale' : ''}`}
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

/** Comemoração das conquistas recém-desbloqueadas. */
export function ConquistasNovas({ conquistas }) {
  if (!conquistas?.length) return null
  return (
    <div className="flex flex-col gap-8" role="status">
      <p className="text-body-sm font-bold text-ember-crust">
        {conquistas.length === 1 ? 'Nova conquista!' : `${conquistas.length} novas conquistas!`}
      </p>
      {conquistas.map((conquista) => (
        <Conquista key={conquista.id} conquista={conquista} desbloqueadaEm compacta />
      ))}
    </div>
  )
}
