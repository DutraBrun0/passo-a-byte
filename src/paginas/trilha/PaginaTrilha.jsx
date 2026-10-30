import { Link, useParams, useSearchParams } from 'react-router'
import { BarraPixel } from '../../design-system/componentes/BarraPixel.jsx'
import { Botao } from '../../design-system/componentes/Botao.jsx'
import { Cartao } from '../../design-system/componentes/Cartao.jsx'
import { Pilula } from '../../design-system/componentes/Pilula.jsx'
import { Titulo } from '../../design-system/componentes/Titulo.jsx'
import { Nuvens } from '../../design-system/sprites/Nuvens.jsx'
import { PixelSprite } from '../../design-system/sprites/PixelSprite.jsx'
import { obterCurso } from '../../nucleo/conteudo/cursos.js'
import { contarConcluidas, proximaLicao, statusLicao } from '../../nucleo/progresso/regras.js'
import { useProgresso } from '../../nucleo/progresso/useProgresso.js'
import { NaoEncontrada } from '../NaoEncontrada.jsx'

const STATUS = {
  concluida: { tom: 'sucesso', texto: 'Concluída', marcador: 'check' },
  andamento: { tom: 'neutro', texto: 'Em andamento', marcador: 'seta' },
  disponivel: { tom: 'neutro', texto: 'Disponível', marcador: 'seta' },
  bloqueada: { tom: 'bloqueado', texto: 'Bloqueada', marcador: 'cadeado' },
}

function ItemLicao({ linguagem, licao, status, ultima }) {
  const { tom, texto, marcador } = STATUS[status]
  const bloqueada = status === 'bloqueada'
  const conteudo = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block text-body font-semibold text-graphite-ink transition-transform duration-200 group-hover:translate-x-4">
          {licao.titulo}
        </span>
        <span className="text-caption text-slate-pencil">+{licao.xp} XP</span>
      </span>
      <Pilula tom={tom} icone={null}>
        {texto}
      </Pilula>
    </>
  )
  const classes = 'flex items-center gap-16 rounded-cards border bg-paper-white px-16 py-8'
  return (
    <li className="relative flex gap-16">
      {/* Trilha: marcador quadrado de pixel e a linha até a próxima lição */}
      {/* A próxima lição pulsa; a linha fica laranja entre as lições já concluídas. */}
      <div className="flex w-32 shrink-0 flex-col items-center" aria-hidden="true">
        <span
          className={`mt-16 flex h-32 w-32 items-center justify-center rounded-md border-2 ${
            status === 'concluida'
              ? 'border-ember-crust bg-signal-orange text-pure-white'
              : bloqueada
                ? 'border-ash-mist bg-cloud-mist text-slate-pencil'
                : 'animate-pulso border-signal-orange bg-paper-white text-signal-orange'
          }`}
        >
          <PixelSprite nome={marcador} escala={2} />
        </span>
        {!ultima && <span className={`w-4 flex-1 ${status === 'concluida' ? 'bg-signal-orange' : 'bg-cloud-shade'}`} />}
      </div>
      <div className="min-w-0 flex-1 pb-16">
        {bloqueada ? (
          <div className={`${classes} border-card-edge [&>*]:opacity-70`} aria-disabled="true">
            {conteudo}
          </div>
        ) : (
          <Link
            to={`/${linguagem}/licao/${licao.id}`}
            className={`levita group ${classes} border-card-edge hover:border-signal-orange hover:shadow-xl`}
          >
            {conteudo}
          </Link>
        )}
      </div>
    </li>
  )
}

export function PaginaTrilha() {
  const { linguagem } = useParams()
  const [parametros] = useSearchParams()
  const progresso = useProgresso((s) => s.dados)
  const curso = obterCurso(linguagem)
  if (!curso) return <NaoEncontrada />

  const nivel = curso.niveis.find((n) => n.id === parametros.get('nivel')) ?? curso.niveis[0]
  const licoes = nivel.modulos.flatMap((m) => m.licoes)
  const concluidas = contarConcluidas(progresso, linguagem, licoes)
  const proxima = proximaLicao(progresso, linguagem, nivel)

  return (
    <div className="relative isolate overflow-hidden">
      <Nuvens cantos={['topo-direita', 'base-esquerda']} />
      <div className="mx-auto max-w-page px-16 py-32 md:px-32">
        <nav aria-label="Níveis">
          <ul className="flex flex-wrap gap-8">
            {curso.niveis.map((n) => (
              <li key={n.id}>
                <Link
                  to={{ search: `?nivel=${n.id}` }}
                  aria-current={n.id === nivel.id ? 'page' : undefined}
                  className={`flex items-center gap-8 rounded-nav px-16 py-8 text-body-sm font-medium ${
                    n.id === nivel.id ? 'bg-paper-white text-ember-crust shadow-subtle' : 'text-graphite-ink hover:bg-paper-white'
                  }`}
                >
                  <PixelSprite nome={n.icone} escala={2} />
                  {n.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <header className="mt-32 grid gap-24 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Titulo nivel={1} tamanho="heading-lg">
              {nivel.titulo}
            </Titulo>
            <p className="mt-16 max-w-prose text-slate-pencil">{nivel.descricao}</p>
          </div>
          {licoes.length > 0 && (
            <div className="flex flex-col gap-8 md:w-painel">
              <p className="text-body-sm font-medium text-graphite-ink">
                {concluidas} de {licoes.length} lições concluídas
              </p>
              <BarraPixel valor={concluidas / licoes.length} blocos={12} rotulo={`Progresso no nível ${nivel.titulo}`} />
              {proxima ? (
                <Botao variante="primario" para={`/${linguagem}/licao/${proxima.id}`} icone="seta" className="mt-8">
                  {concluidas === 0 ? 'Começar o nível' : 'Continuar de onde parei'}
                </Botao>
              ) : (
                <Pilula tom="sucesso">Nível concluído</Pilula>
              )}
            </div>
          )}
        </header>

        <div className="mt-48 grid gap-32">
          {nivel.modulos.map((modulo, indice) => (
            <section key={modulo.id} aria-labelledby={`modulo-${indice}`}>
              <p className="text-caption font-semibold uppercase text-slate-pencil">Módulo {indice + 1}</p>
              <h2 id={`modulo-${indice}`} className="text-subheading font-bold text-midnight-ink">
                {modulo.titulo}
              </h2>
              <p className="text-body-sm text-slate-pencil">{modulo.descricao}</p>
              {modulo.licoes.length > 0 ? (
                <ol className="mt-16 max-w-prose">
                  {modulo.licoes.map((licao, i) => (
                    <ItemLicao
                      key={licao.id}
                      linguagem={linguagem}
                      licao={licao}
                      status={statusLicao(progresso, linguagem, licao)}
                      ultima={i === modulo.licoes.length - 1}
                    />
                  ))}
                </ol>
              ) : (
                <Cartao className="mt-16 max-w-prose">
                  <Pilula tom="bloqueado">Em construção</Pilula>
                  <p className="mt-8 text-body-sm text-slate-pencil">As lições deste módulo estão sendo escritas.</p>
                </Cartao>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
