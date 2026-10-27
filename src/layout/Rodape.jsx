import { Link } from 'react-router'
import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'
import { LINGUAGEM_PADRAO } from '../linguagens/catalogo.js'

// Rodapé em Ember Crust: a única superfície escura do site (DESIGN.md › Footer Block).
export function Rodape() {
  return (
    <footer className="bg-ember-crust text-warm-cream">
      <div className="mx-auto flex max-w-page flex-col gap-24 px-16 py-48 md:flex-row md:items-center md:justify-between md:px-32">
        <div className="flex items-center gap-16">
          <PixelSprite nome="robo" escala={3} />
          <div>
            <p className="text-subheading font-bold lowercase text-paper-white">passo a byte</p>
            <p className="text-body-sm">Python de verdade, rodando no seu navegador. Sem cadastro, sem servidor.</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-16 text-body-sm font-medium">
          <li>
            <Link className="rounded-links text-paper-white underline-offset-4 hover:underline" to={`/${LINGUAGEM_PADRAO}/trilha`}>
              Trilha
            </Link>
          </li>
          <li>
            <Link className="rounded-links text-paper-white underline-offset-4 hover:underline" to={`/${LINGUAGEM_PADRAO}/robo`}>
              Desafios do Robô
            </Link>
          </li>
          <li>
            <Link className="rounded-links text-paper-white underline-offset-4 hover:underline" to="/progresso">
              Progresso
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
