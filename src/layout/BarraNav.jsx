import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'
import { LINGUAGEM_PADRAO, linguagemDoCaminho } from '../linguagens/catalogo.js'
import { alternarTema, useTema } from './tema.js'

// A trilha acompanha a linguagem da página atual; os Desafios do Robô existem só em Python.
const links = (linguagem) => [
  { para: `/${linguagem}/trilha`, rotulo: 'Trilha' },
  { para: `/${LINGUAGEM_PADRAO}/robo`, rotulo: 'Desafios do Robô' },
  { para: '/progresso', rotulo: 'Progresso' },
]

// Link de navegação: o sublinhado laranja cresce no hover; o ativo ganha texto laranja + anel.
function classeLink({ isActive }) {
  const base = 'sublinha rounded-nav px-8 py-4 text-body-sm font-medium transition-colors duration-300'
  return isActive ? `${base} text-ember-crust shadow-subtle` : `${base} text-graphite-ink hover:text-ember-crust`
}

/** Botão discreto de tema: só o ícone, que gira ao trocar. */
function BotaoTema() {
  const tema = useTema()
  const escuro = tema === 'escuro'
  const [giros, setGiros] = useState(0)

  const trocar = (evento) => {
    const caixa = evento.currentTarget.getBoundingClientRect()
    setGiros((n) => n + 1)
    alternarTema({ x: caixa.left + caixa.width / 2, y: caixa.top + caixa.height / 2 })
  }

  return (
    <button
      type="button"
      onClick={trocar}
      aria-label={escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      title={escuro ? 'Tema claro' : 'Tema escuro'}
      className="flex h-32 w-32 items-center justify-center rounded-nav text-slate-pencil transition-colors hover:bg-cloud-mist hover:text-signal-orange"
    >
      <span key={giros} className={giros ? 'animate-giro' : ''}>
        <PixelSprite nome={escuro ? 'sol' : 'lua'} escala={2} />
      </span>
    </button>
  )
}

export function BarraNav() {
  const linguagem = linguagemDoCaminho(useLocation().pathname)
  // A barra ganha borda e sombra depois que a página começa a rolar.
  const [rolou, setRolou] = useState(false)
  useEffect(() => {
    const atualizar = () => setRolou(window.scrollY > 8)
    atualizar()
    window.addEventListener('scroll', atualizar, { passive: true })
    return () => window.removeEventListener('scroll', atualizar)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper-white/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        rolou ? 'border-cloud-mist shadow-md' : 'border-transparent'
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-16 px-16 py-16 md:px-32"
      >
        <Link to="/" className="group flex items-center gap-8 rounded-nav text-subheading font-bold lowercase text-graphite-ink">
          <span className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
            <PixelSprite nome="robo" escala={2} />
          </span>
          passo a byte
        </Link>
        <div className="flex flex-wrap items-center gap-8">
          <ul className="flex flex-wrap items-center gap-8">
            {links(linguagem).map((link) => (
              <li key={link.para}>
                <NavLink to={link.para} className={classeLink}>
                  {link.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
          <BotaoTema />
        </div>
      </nav>
    </header>
  )
}
