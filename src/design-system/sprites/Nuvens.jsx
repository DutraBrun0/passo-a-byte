import { PixelSprite } from './PixelSprite.jsx'

const POSICOES = {
  'topo-esquerda': 'left-0 top-24 -translate-x-1/3',
  'topo-direita': 'right-0 top-64 translate-x-1/4',
  'base-esquerda': 'left-0 bottom-32 -translate-x-1/4',
  'base-direita': 'right-0 bottom-16 translate-x-1/3',
}

/**
 * Nuvens decorativas nos cantos de uma seção. O pai precisa de `relative`.
 * Ficam atrás do conteúdo, nunca centralizadas, e não recebem eventos.
 */
export function Nuvens({ cantos = ['topo-esquerda', 'base-direita'] }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {cantos.map((canto, i) => (
        <div key={canto} className={`absolute animate-drift ${POSICOES[canto]}`} style={{ animationDelay: `${i * -3}s` }}>
          <PixelSprite nome={i % 2 === 0 ? 'nuvem' : 'nuvemPequena'} escala={4} />
        </div>
      ))}
    </div>
  )
}
