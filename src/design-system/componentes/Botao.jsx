import { Link } from 'react-router'
import { PixelSprite } from '../sprites/PixelSprite.jsx'

/*
 * Botões do sistema (DESIGN.md › Components):
 * - primario: preenchido em Signal Orange, texto branco, anel laranja "pressionado".
 *   Só um por tela; o foco ganha um contorno externo para não sumir no próprio anel.
 *   No hover, um brilho atravessa o botão (.brilho, em index.css).
 * - secundario: contorno Cloud Mist, texto Graphite Ink.
 * - fantasma: só texto; o sublinhado laranja surge suave no hover (.link-suave).
 * Todos com raio de 6px.
 */
const BASE =
  'group/botao inline-flex items-center justify-center gap-8 rounded-buttons font-medium ' +
  'transition-[color,background-color,border-color,text-decoration-color,text-underline-offset,translate] duration-250 ease-out active:translate-y-[2px] ' +
  'disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'

const VARIANTES = {
  primario:
    'brilho bg-signal-orange text-pure-white font-bold shadow-subtle hover:bg-signal-deep ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-orange',
  secundario: 'border border-cloud-mist bg-paper-white text-graphite-ink hover:border-cloud-shade hover:bg-cloud-mist',
  fantasma: 'link-suave text-graphite-ink hover:text-ember-crust',
}

const TAMANHOS = {
  sm: 'px-8 py-8 text-body-sm',
  md: 'px-16 py-8 text-body',
  lg: 'px-32 py-16 text-subheading',
}

function classesBotao({ variante = 'secundario', tamanho = 'md', className = '' } = {}) {
  return `${BASE} ${VARIANTES[variante]} ${TAMANHOS[tamanho]} ${className}`
}

/** Botão ou link com cara de botão (passe `para` para virar um <Link>). */
export function Botao({ variante, tamanho, className, para, icone, children, ...resto }) {
  const classes = classesBotao({ variante, tamanho, className })
  const conteudo = (
    <>
      {children}
      {icone && (
        <PixelSprite
          nome={icone}
          escala={2}
          className="transition-transform duration-200 group-hover/botao:translate-x-[3px]"
        />
      )}
    </>
  )
  if (para) {
    return (
      <Link to={para} className={classes} {...resto}>
        {conteudo}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...resto}>
      {conteudo}
    </button>
  )
}
