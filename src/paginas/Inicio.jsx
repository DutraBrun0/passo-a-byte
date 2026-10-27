import { Botao } from '../design-system/componentes/Botao.jsx'
import { Cartao } from '../design-system/componentes/Cartao.jsx'
import { Nuvens } from '../design-system/sprites/Nuvens.jsx'
import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'

export function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-16 pb-64 pt-80">
        <Nuvens cantos={['topo-esquerda', 'topo-direita', 'base-esquerda']} />
        <div className="mx-auto flex max-w-page flex-col items-center text-center">
          <h1 className="font-jersey-10 font-normal">
            <span className="block text-heading-lg text-graphite-ink md:text-display">Aprenda Python</span>
            <span className="block text-heading-lg text-signal-orange md:text-display">um passo por vez</span>
          </h1>
          <p className="mt-24 max-w-prose text-body text-slate-pencil">
            Lições curtas, exercícios corrigidos na hora e um robô que obedece cada linha do seu código. Tudo roda no
            navegador, com Python de verdade.
          </p>
          <div className="mt-32">
            <Botao variante="primario" tamanho="lg" para="/python/trilha" icone="seta">
              Começar a trilha
            </Botao>
          </div>
        </div>
        <div className="absolute bottom-16 left-32 hidden animate-flutua md:block">
          <PixelSprite nome="robo" escala={4} rotulo="Bit, o robô mascote" />
        </div>
      </section>

      <section className="mx-auto max-w-page px-16 pb-64 md:px-32">
        <Cartao className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-body font-bold text-graphite-ink">Em breve, outras linguagens</p>
            <p className="text-body-sm text-slate-pencil">JavaScript, SQL, C e Java estão no roadmap.</p>
          </div>
          <ul className="flex flex-wrap gap-8 text-body-sm text-slate-pencil" aria-label="Linguagens planejadas">
            {['JavaScript', 'SQL', 'C', 'Java'].map((nome) => (
              <li key={nome} className="rounded-md border border-cloud-mist px-8 py-4">
                {nome}
              </li>
            ))}
          </ul>
        </Cartao>
      </section>
    </>
  )
}
