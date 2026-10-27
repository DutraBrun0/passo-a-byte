import { Link, NavLink } from 'react-router'
import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'
import { LINGUAGEM_PADRAO } from '../linguagens/catalogo.js'

const LINKS = [
  { para: `/${LINGUAGEM_PADRAO}/trilha`, rotulo: 'Trilha' },
  { para: `/${LINGUAGEM_PADRAO}/robo`, rotulo: 'Desafios do Robô' },
  { para: '/progresso', rotulo: 'Progresso' },
]

// Link de navegação: fantasma, e o ativo ganha texto laranja + anel (DESIGN.md › Navigation Bar).
function classeLink({ isActive }) {
  const base = 'rounded-nav px-8 py-4 text-body-sm font-medium transition-colors'
  return isActive
    ? `${base} text-ember-crust shadow-subtle`
    : `${base} text-graphite-ink underline-offset-4 decoration-signal-orange decoration-2 hover:underline`
}

export function BarraNav() {
  return (
    <header className="bg-paper-white">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-16 px-16 py-16 md:px-32"
      >
        <Link to="/" className="flex items-center gap-8 rounded-nav text-subheading font-bold lowercase text-graphite-ink">
          <PixelSprite nome="robo" escala={2} />
          passo a byte
        </Link>
        <ul className="flex flex-wrap items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.para}>
              <NavLink to={link.para} className={classeLink}>
                {link.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
