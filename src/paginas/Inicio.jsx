import { useState } from 'react'
import { Link } from 'react-router'
import { Botao } from '../design-system/componentes/Botao.jsx'
import { Cartao } from '../design-system/componentes/Cartao.jsx'
import { Pilula } from '../design-system/componentes/Pilula.jsx'
import { Titulo } from '../design-system/componentes/Titulo.jsx'
import { Nuvens } from '../design-system/sprites/Nuvens.jsx'
import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'
import { LINGUAGEM_PADRAO as LINGUAGEM, LINGUAGENS, LINGUAGENS_PLANEJADAS } from '../linguagens/catalogo.js'
import { obterCurso } from '../nucleo/conteudo/cursos.js'
import { contarConcluidas } from '../nucleo/progresso/regras.js'
import { useProgresso } from '../nucleo/progresso/useProgresso.js'
import { BitInterativo } from './inicio/BitInterativo.jsx'
import { TerminalDigitando } from './inicio/TerminalDigitando.jsx'

// Quadradinhos que sobem devagar no fundo do topo, como faíscas de um jogo 8-bit: [left %, atraso s, tamanho px, cor]
const PARTICULAS = [
  [6, 0, 8, 'bg-signal-orange'], [14, 4.5, 4, 'bg-cloud-shade'], [23, 2, 6, 'bg-warm-cream'],
  [31, 6.5, 4, 'bg-signal-orange'], [42, 1, 4, 'bg-cloud-shade'], [57, 5, 6, 'bg-signal-orange'],
  [66, 3, 4, 'bg-warm-cream'], [74, 7.5, 8, 'bg-cloud-shade'], [83, 1.5, 4, 'bg-signal-orange'], [93, 4, 6, 'bg-warm-cream'],
]

const PASSOS = [
  { sprite: 'lampada', titulo: 'Leia', texto: 'Uma explicação curta, com exemplos que você entende de primeira.' },
  { sprite: 'raio', titulo: 'Escreva', texto: 'O editor fica ao lado. Ctrl + Enter roda o seu código na hora.' },
  { sprite: 'trofeu', titulo: 'Veja passar', texto: 'Cada teste mostra o esperado e o que seu código fez. Acertou? XP!' },
]

function CartaoNivel({ linguagem, nivel, indice, progresso }) {
  const licoes = nivel.modulos.flatMap((m) => m.licoes)
  const feitas = contarConcluidas(progresso, linguagem, licoes)
  return (
    <Link
      to={`/${linguagem}/trilha?nivel=${nivel.id}`}
      data-inclinar
      className="levita group flex h-full flex-col gap-16 rounded-cards border border-card-edge bg-paper-white p-16 shadow-md hover:border-signal-orange hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-16">
        <div className="balanca-no-hover rounded-md bg-cloud-mist p-8 transition-colors group-hover:bg-warm-cream">
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
      <div className="mt-auto flex items-center justify-between gap-16">
        <span className="link-suave-grupo text-body-sm font-medium text-graphite-ink">
          Ver trilha
        </span>
        {licoes.length > 0 && (
          <span className="h-4 w-96 overflow-hidden rounded-md bg-cloud-mist" aria-hidden="true">
            <span className="block h-full origin-left animate-enche bg-signal-orange" style={{ width: `${(feitas / licoes.length) * 100}%` }} />
          </span>
        )}
      </div>
    </Link>
  )
}

/** Faixa do robô: o Bit atravessa um corredor até a bandeira, sem parar. */
function CorredorDoBit() {
  const CASAS = 6
  const TAMANHO = 48 // 16 px do sprite × escala 3
  return (
    <div className="relative mx-auto w-max" aria-hidden="true">
      <div className="flex">
        {Array.from({ length: CASAS }, (_, i) => (
          <PixelSprite key={i} nome="chao" escala={3} />
        ))}
      </div>
      <div className="absolute right-0 top-0">
        <PixelSprite nome="bandeira" escala={3} />
      </div>
      <div className="absolute left-0 top-0 animate-anda" style={{ '--distancia': `${(CASAS - 1) * TAMANHO}px` }}>
        <PixelSprite nome="roboLabirinto" escala={3} />
      </div>
    </div>
  )
}

export function Inicio() {
  const progresso = useProgresso((s) => s.dados)
  const curso = obterCurso(LINGUAGEM)
  const [linguagemNiveis, setLinguagemNiveis] = useState(LINGUAGEM)
  const cursoNiveis = obterCurso(linguagemNiveis)

  return (
    <>
      <section className="relative isolate overflow-hidden px-16 pb-64 pt-64 md:pt-80">
        <Nuvens cantos={['topo-esquerda', 'topo-direita', 'base-esquerda']} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full" aria-hidden="true">
          {PARTICULAS.map(([esquerda, atraso, tamanho, cor], i) => (
            <span
              key={i}
              className={`absolute bottom-0 animate-particula opacity-0 ${cor}`}
              style={{ left: `${esquerda}%`, width: tamanho, height: tamanho, animationDelay: `${atraso}s` }}
            />
          ))}
        </div>

        <div className="mx-auto grid max-w-page items-center gap-48 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="inline-flex animate-entra items-center gap-8 rounded-md border border-card-edge bg-paper-white px-8 py-4 text-body-sm font-medium text-slate-pencil shadow-md">
              <span className="h-8 w-8 animate-pisca bg-signal-orange" aria-hidden="true" />
              Python e JavaScript de verdade, direto no navegador
            </p>
            <h1 className="mt-24 font-jersey-10 font-normal">
              <span className="block animate-entra text-heading-lg text-graphite-ink md:text-display" style={{ animationDelay: '80ms' }}>
                Aprenda Python
              </span>
              <span className="block animate-entra text-heading-lg text-signal-orange md:text-display" style={{ animationDelay: '200ms' }}>
                um passo por vez
              </span>
            </h1>
            <p className="mt-24 max-w-prose animate-entra text-body text-slate-pencil" style={{ animationDelay: '320ms' }}>
              Lições curtas de Python e JavaScript, exercícios corrigidos na hora e um robô que obedece cada linha do
              seu código. Tudo roda no navegador, sem instalar nada e sem criar conta.
            </p>
            <div className="mt-32 flex flex-wrap items-center justify-center gap-16 animate-entra lg:justify-start" style={{ animationDelay: '440ms' }}>
              <Botao variante="primario" tamanho="lg" para={`/${LINGUAGEM}/trilha`} icone="seta">
                {progresso.xp > 0 ? 'Continuar a trilha' : 'Começar a trilha'}
              </Botao>
              <Botao variante="fantasma" para={`/${LINGUAGEM}/robo`}>
                Ver os Desafios do Robô
              </Botao>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[30rem] animate-entra" style={{ animationDelay: '560ms' }}>
            <div className="absolute -top-64 right-16 z-10">
              <BitInterativo />
            </div>
            <TerminalDigitando />
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-como" className="mx-auto max-w-page px-16 pb-64 md:px-32">
        <Titulo id="titulo-como" tamanho="heading" data-revelar>
          Como funciona
        </Titulo>
        <ol className="mt-32 grid gap-16 md:grid-cols-3">
          {PASSOS.map((passo, i) => (
            <li key={passo.titulo}>
              <Cartao data-inclinar className="levita group flex h-full flex-col gap-16 hover:border-signal-orange hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="balanca-no-hover rounded-md bg-cloud-mist p-8">
                    <PixelSprite nome={passo.sprite} escala={3} />
                  </div>
                  <span className="font-jersey-10 text-heading text-cloud-shade transition-colors group-hover:text-signal-orange">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-subheading font-bold text-midnight-ink">{passo.titulo}</h3>
                  <p className="mt-4 text-body-sm text-slate-pencil">{passo.texto}</p>
                </div>
              </Cartao>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="titulo-niveis" className="mx-auto max-w-page px-16 pb-64 md:px-32">
        <Titulo id="titulo-niveis" tamanho="heading" data-revelar>
          Escolha seu nível
        </Titulo>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-16">
          <p className="max-w-prose text-slate-pencil">
            Já sabe o básico? Pode começar mais adiante. Dentro de cada nível as lições abrem em sequência.
          </p>
          <div role="tablist" aria-label="Linguagem" className="flex gap-4 rounded-md border border-card-edge bg-paper-white p-4 shadow-md">
            {LINGUAGENS.map(({ id, nome }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={id === linguagemNiveis}
                onClick={() => setLinguagemNiveis(id)}
                className={`rounded-md px-16 py-4 text-body-sm font-semibold transition-colors ${
                  id === linguagemNiveis ? 'bg-signal-orange text-pure-white' : 'text-slate-pencil hover:bg-cloud-mist hover:text-graphite-ink'
                }`}
              >
                {nome}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-32 grid gap-16 md:grid-cols-2">
          {cursoNiveis.niveis.map((nivel, i) => (
            <li key={`${linguagemNiveis}/${nivel.id}`}>
              <CartaoNivel linguagem={linguagemNiveis} nivel={nivel} indice={i} progresso={progresso} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-robo" className="mx-auto max-w-page px-16 pb-64 md:px-32">
        <Cartao grande data-revelar className="grid items-center gap-32 overflow-hidden p-32 md:grid-cols-2">
          <div>
            <p className="text-caption font-semibold uppercase text-signal-orange">{curso.fases.length} fases</p>
            <Titulo id="titulo-robo" tamanho="heading-sm" className="mt-8">
              Desafios do Robô
            </Titulo>
            <p className="mt-16 text-slate-pencil">
              Programe o Bit com <code className="rounded-md bg-cloud-mist px-4 font-code text-body-sm">andar()</code> e{' '}
              <code className="rounded-md bg-cloud-mist px-4 font-code text-body-sm">virar_esquerda()</code> para atravessar
              labirintos. Cada linha vira um movimento, e dá para assistir passo a passo.
            </p>
            <Botao variante="secundario" para={`/${LINGUAGEM}/robo`} icone="seta" className="mt-24">
              Ver as fases
            </Botao>
          </div>
          <div className="overflow-x-auto rounded-md bg-app-window px-16 py-32">
            <CorredorDoBit />
          </div>
        </Cartao>
      </section>

      <section className="mx-auto max-w-page px-16 pb-64 md:px-32">
        <Cartao data-revelar className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-body font-bold text-graphite-ink">Em breve, outras linguagens</p>
            <p className="text-body-sm text-slate-pencil">A plataforma já está pronta para receber novas linguagens.</p>
          </div>
          <ul className="flex flex-wrap gap-8 text-body-sm text-slate-pencil" aria-label="Linguagens planejadas">
            {LINGUAGENS_PLANEJADAS.map((nome) => (
              <li key={nome} className="rounded-md border border-cloud-mist px-8 py-4 transition-colors hover:border-signal-orange hover:text-ember-crust">
                {nome}
              </li>
            ))}
          </ul>
        </Cartao>
      </section>
    </>
  )
}
