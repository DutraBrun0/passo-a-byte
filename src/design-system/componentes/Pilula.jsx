import { PixelSprite } from '../sprites/PixelSprite.jsx'

/*
 * Status pill (DESIGN.md › Components): Manrope 500 14px, raio 6px, ícone à esquerda.
 * O laranja preenchido fica reservado ao botão primário; aqui o estado positivo
 * usa contorno laranja e o negativo, o tom quente de Blush Shadow.
 */
const TONS = {
  sucesso: { classes: 'bg-paper-white text-ember-crust border border-signal-orange', icone: 'check' },
  falha: { classes: 'bg-blush-shadow text-graphite-ink border border-blush-shadow', icone: 'cruz' },
  neutro: { classes: 'bg-cloud-mist text-slate-pencil border border-cloud-mist', icone: null },
  bloqueado: { classes: 'bg-cloud-mist text-slate-pencil border border-cloud-mist', icone: 'cadeado' },
}

export function Pilula({ tom = 'neutro', icone, className = '', children }) {
  const { classes, icone: iconePadrao } = TONS[tom]
  const nome = icone === undefined ? iconePadrao : icone
  return (
    <span className={`inline-flex items-center gap-8 rounded-md px-8 py-4 text-body-sm font-medium ${classes} ${className}`}>
      {nome && <PixelSprite nome={nome} escala={2} />}
      {children}
    </span>
  )
}
