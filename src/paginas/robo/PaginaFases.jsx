import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { Botao } from '../../design-system/componentes/Botao.jsx'
import { Pilula } from '../../design-system/componentes/Pilula.jsx'
import { Titulo } from '../../design-system/componentes/Titulo.jsx'
import { Nuvens } from '../../design-system/sprites/Nuvens.jsx'
import { PixelSprite } from '../../design-system/sprites/PixelSprite.jsx'
import { obterCurso } from '../../nucleo/conteudo/cursos.js'
import { obterLinguagem } from '../../nucleo/linguagens/registro.js'
import { chave } from '../../nucleo/progresso/regras.js'
import { useProgresso } from '../../nucleo/progresso/useProgresso.js'
import { estadoInicialRobo, lerMapa } from '../../nucleo/robo/simulador.js'
import { NaoEncontrada } from '../NaoEncontrada.jsx'
import { Labirinto } from './Labirinto.jsx'

function CartaoFase({ linguagem, fase, numero, status }) {
  const mapa = useMemo(() => lerMapa(fase.mapa), [fase.mapa])
  const estado = useMemo(() => estadoInicialRobo(mapa, fase.direcao), [mapa, fase.direcao])
  const bloqueada = status === 'bloqueada'
  const conteudo = (
    <>
      <div className="flex min-h-128 items-center justify-center rounded-md bg-app-window p-8">
        <Labirinto mapa={mapa} estado={estado} escalaMaxima={2} descricao={`Prévia do labirinto: ${fase.titulo}`} />
      </div>
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="text-caption font-semibold uppercase text-slate-pencil">Fase {numero}</p>
          <p className="text-body font-bold text-graphite-ink">{fase.titulo}</p>
        </div>
        {status === 'concluida' && <Pilula tom="sucesso">Concluída</Pilula>}
        {bloqueada && <Pilula tom="bloqueado">Bloqueada</Pilula>}
      </div>
      <div className="flex flex-wrap gap-8">
        <Pilula icone={null}>+{fase.xp} XP</Pilula>
        {fase.max_linhas && <Pilula icone={null}>Até {fase.max_linhas} linhas</Pilula>}
      </div>
    </>
  )
  const classes = 'flex h-full flex-col gap-16 rounded-cards border border-cloud-mist bg-paper-white p-16 shadow-md'
  return bloqueada ? (
    <div className={`${classes} [&>*]:opacity-60`} aria-disabled="true">
      {conteudo}
    </div>
  ) : (
    <Link to={`/${linguagem}/robo/${fase.id}`} data-inclinar className={`levita ${classes} hover:border-signal-orange hover:shadow-xl`}>
      {conteudo}
    </Link>
  )
}

export function PaginaFases() {
  const { linguagem } = useParams()
  const curso = obterCurso(linguagem)
  const fasesFeitas = useProgresso((s) => s.dados.fases)
  if (!obterLinguagem(linguagem)?.robo || !curso?.fases.length) return <NaoEncontrada />

  const concluida = (fase) => Boolean(fasesFeitas[chave(linguagem, fase.id)]?.concluidaEm)
  const status = (fase) =>
    concluida(fase)
      ? 'concluida'
      : fase.anterior && !concluida(curso.fases.find((f) => f.id === fase.anterior))
        ? 'bloqueada'
        : 'disponivel'
  const proxima = curso.fases.find((fase) => !concluida(fase))
  const feitas = curso.fases.filter(concluida).length

  return (
    <div className="relative isolate overflow-hidden">
      <Nuvens cantos={['topo-esquerda', 'base-direita']} />
      <div className="mx-auto max-w-page px-16 py-48 md:px-32">
        <header className="grid gap-24 md:grid-cols-[1fr_auto] md:items-end">
          <div className="flex items-end gap-24">
            <div className="hidden animate-flutua sm:block">
              <PixelSprite nome="robo" escala={4} rotulo="Bit" />
            </div>
            <div>
              <Titulo nivel={1} tamanho="heading-lg">
                Desafios do Robô
              </Titulo>
              <p className="mt-16 max-w-prose text-slate-pencil">
                Programe o Bit para atravessar labirintos. Cada linha do seu código vira um movimento, e você pode
                acompanhar tudo passo a passo.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-body-sm font-medium text-graphite-ink">
              {feitas} de {curso.fases.length} fases concluídas
            </p>
            {proxima && (
              <Botao variante="primario" para={`/${linguagem}/robo/${proxima.id}`} icone="seta">
                {feitas === 0 ? 'Começar' : 'Continuar'}
              </Botao>
            )}
          </div>
        </header>

        <ul className="mt-48 grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {curso.fases.map((fase, i) => (
            <li key={fase.id}>
              <CartaoFase linguagem={linguagem} fase={fase} numero={i + 1} status={status(fase)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
