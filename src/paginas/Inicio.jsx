import { Link } from 'react-router'
import { Botao } from '../design-system/componentes/Botao.jsx'
import { Cartao } from '../design-system/componentes/Cartao.jsx'
import { Pilula } from '../design-system/componentes/Pilula.jsx'
import { Titulo } from '../design-system/componentes/Titulo.jsx'
import { Nuvens } from '../design-system/sprites/Nuvens.jsx'
import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'
import { LINGUAGEM_PADRAO as LINGUAGEM, LINGUAGENS_PLANEJADAS } from '../linguagens/index.js'
import { obterCurso } from '../nucleo/conteudo/cursos.js'
import { contarConcluidas } from '../nucleo/progresso/regras.js'
import { useProgresso } from '../nucleo/progresso/useProgresso.js'

function CartaoNivel({ nivel, indice, progresso }) {
  const licoes = nivel.modulos.flatMap((m) => m.licoes)
  const feitas = contarConcluidas(progresso, LINGUAGEM, licoes)
  return (
    <Link
      to={`/${LINGUAGEM}/trilha?nivel=${nivel.id}`}
      className="group flex h-full flex-col gap-16 rounded-cards border border-cloud-mist bg-paper-white p-16 shadow-md transition-colors hover:border-signal-orange"
    >
      <div className="flex items-start justify-between gap-16">
        <div className="rounded-md bg-cloud-mist p-8">
          <PixelSprite nome={nivel.icone} escala={4} />
        </div>
        {licoes.length === 0 ? (
          <Pilula tom="bloqueado">Em breve</Pilula>
        ) : feitas === licoes.length ? (
          <Pilula tom="sucesso">Concluído</Pilula>
        ) : (
          <Pilula>
            {feitas}/{licoes.length} lições
          </Pilula>
        )}
      </div>
      <div>
        <p className="text-caption font-semibold uppercase text-slate-pencil">Nível {indice + 1}</p>
        <h3 className="font-jersey-10 text-heading-sm font-normal text-graphite-ink">{nivel.titulo}</h3>
        <p className="mt-8 text-body-sm text-slate-pencil">{nivel.descricao}</p>
      </div>
      <span className="mt-auto text-body-sm font-medium text-graphite-ink underline-offset-4 decoration-signal-orange decoration-2 group-hover:underline">
        Ver trilha
      </span>
    </Link>
  )
}

export function Inicio() {
  const progresso = useProgresso((s) => s.dados)
  const curso = obterCurso(LINGUAGEM)

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
            <Botao variante="primario" tamanho="lg" para={`/${LINGUAGEM}/trilha`} icone="seta">
              {progresso.xp > 0 ? 'Continuar a trilha' : 'Começar a trilha'}
            </Botao>
          </div>
        </div>
        <div className="absolute bottom-16 left-32 hidden animate-flutua md:block">
          <PixelSprite nome="robo" escala={4} rotulo="Bit, o robô mascote" />
        </div>
      </section>

      <section aria-labelledby="titulo-niveis" className="mx-auto max-w-page px-16 pb-64 md:px-32">
        <Titulo id="titulo-niveis" tamanho="heading">
          Escolha seu nível
        </Titulo>
        <p className="mt-16 max-w-prose text-slate-pencil">
          Já sabe o básico? Pode começar mais adiante. Dentro de cada nível as lições abrem em sequência.
        </p>
        <ul className="mt-32 grid gap-16 md:grid-cols-2">
          {curso.niveis.map((nivel, i) => (
            <li key={nivel.id}>
              <CartaoNivel nivel={nivel} indice={i} progresso={progresso} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-page px-16 pb-64 md:px-32">
        <Cartao className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-body font-bold text-graphite-ink">Em breve, outras linguagens</p>
            <p className="text-body-sm text-slate-pencil">A plataforma já está pronta para receber novas linguagens.</p>
          </div>
          <ul className="flex flex-wrap gap-8 text-body-sm text-slate-pencil" aria-label="Linguagens planejadas">
            {LINGUAGENS_PLANEJADAS.map((nome) => (
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
