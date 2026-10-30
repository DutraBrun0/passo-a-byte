import { PixelSprite } from './PixelSprite.jsx'

const POSICOES = {
  'topo-esquerda': 'left-0 top-24 -translate-x-1/3',
  'topo-direita': 'right-0 top-64 translate-x-1/4',
  'base-esquerda': 'left-0 bottom-32 -translate-x-1/4',
  'base-direita': 'right-0 bottom-16 translate-x-1/3',
}

// Posições fixas (em %) para as estrelas não mudarem de lugar a cada render.
const ESTRELAS = [
  [8, 14], [22, 62], [35, 22], [48, 78], [61, 12], [74, 48], [88, 26], [93, 70], [15, 85], [55, 40], [80, 88], [30, 45],
]

/**
 * Céu decorativo de uma seção. O pai precisa de `relative`. No tema claro são
 * nuvens nos cantos; no escuro, as nuvens quase somem e aparecem estrelas que
 * piscam (a troca é só CSS, em index.css). Nada aqui recebe eventos.
 */
export function Nuvens({ cantos = ['topo-esquerda', 'base-direita'] }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="ceu-nuvens">
        {cantos.map((canto, i) => (
          <div key={canto} className={`absolute animate-drift ${POSICOES[canto]}`} style={{ animationDelay: `${i * -3}s` }}>
            <PixelSprite nome={i % 2 === 0 ? 'nuvem' : 'nuvemPequena'} escala={4} />
          </div>
        ))}
      </div>
      <div className="ceu-estrelas">
        {ESTRELAS.map(([x, y], i) => (
          <span
            key={i}
            className="absolute animate-brilha"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i * 370) % 2400}ms` }}
          >
            <PixelSprite nome="faisca" escala={i % 3 === 0 ? 2 : 1} />
          </span>
        ))}
      </div>
    </div>
  )
}
