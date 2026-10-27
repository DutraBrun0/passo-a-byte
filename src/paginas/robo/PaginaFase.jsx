import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ConquistasNovas } from '../../componentes/Conquista.jsx'
import { PainelCarregamento } from '../../componentes/PainelCarregamento.jsx'
import { Botao } from '../../design-system/componentes/Botao.jsx'
import { Cartao } from '../../design-system/componentes/Cartao.jsx'
import { Pilula } from '../../design-system/componentes/Pilula.jsx'
import { Titulo } from '../../design-system/componentes/Titulo.jsx'
import { EditorCodigo } from '../../editor/EditorCodigo.jsx'
import { Markdown } from '../../editor/Markdown.jsx'
import { obterCurso } from '../../nucleo/conteudo/cursos.js'
import { useEstadoCarga } from '../../nucleo/execucao/useEstadoCarga.js'
import { obterLinguagem } from '../../nucleo/linguagens/registro.js'
import { chave } from '../../nucleo/progresso/regras.js'
import { useProgresso } from '../../nucleo/progresso/useProgresso.js'
import { descreverEvento, quadro } from '../../nucleo/robo/reprodutor.js'
import { estadoInicialRobo, lerMapa } from '../../nucleo/robo/simulador.js'
import { useReprodutor } from '../../nucleo/robo/useReprodutor.js'
import { NaoEncontrada } from '../NaoEncontrada.jsx'
import { CartaoErro } from '../licao/PainelResultado.jsx'
import { Labirinto } from './Labirinto.jsx'

const VELOCIDADES = { 1: 'Lenta', 2: 'Normal', 3: 'Rápida', 4: 'Turbo' }

export function PaginaFase() {
  const { linguagem, faseId } = useParams()
  const adaptador = obterLinguagem(linguagem)
  const curso = obterCurso(linguagem)
  const fase = curso?.fases.find((f) => f.id === faseId)
  const bloqueada = useProgresso((s) => fase?.anterior && !s.dados.fases[chave(linguagem, fase.anterior)]?.concluidaEm)
  if (!adaptador?.robo || !fase) return <NaoEncontrada />
  if (bloqueada) {
    const anterior = curso.fases.find((f) => f.id === fase.anterior)
    return (
      <div className="mx-auto flex max-w-prose flex-col items-start gap-16 px-16 py-96">
        <Pilula tom="bloqueado">Fase bloqueada</Pilula>
        <Titulo nivel={1} tamanho="heading">
          {fase.titulo}
        </Titulo>
        <p className="text-slate-pencil">Conclua antes a fase "{anterior.titulo}".</p>
        <Botao variante="primario" para={`/${linguagem}/robo/${anterior.id}`} icone="seta">
          Ir para a fase anterior
        </Botao>
      </div>
    )
  }
  return <Fase key={fase.id} adaptador={adaptador} curso={curso} fase={fase} />
}

function Fase({ adaptador, curso, fase }) {
  const carga = useEstadoCarga(adaptador)
  const linguagem = adaptador.id
  const parser = useMemo(() => adaptador.editor.suporte().language.parser, [adaptador])
  const mapa = useMemo(() => lerMapa(fase.mapa), [fase.mapa])
  const inicial = useMemo(() => estadoInicialRobo(mapa, fase.direcao), [mapa, fase.direcao])
  const numero = curso.fases.indexOf(fase) + 1
  const idProgresso = chave(linguagem, fase.id)
  const concluida = useProgresso((s) => Boolean(s.dados.fases[idProgresso]?.concluidaEm))

  const [codigo, setCodigo] = useState(fase.codigo_inicial)
  const [resultado, setResultado] = useState(null)
  const [executando, setExecutando] = useState(false)
  const [velocidade, setVelocidade] = useState(2)
  const [aviso, setAviso] = useState(null)
  const [mostrarDica, setMostrarDica] = useState(false)
  const [conquistasNovas, setConquistasNovas] = useState([])
  const passoPendente = useRef(false)

  const reprodutor = useReprodutor(resultado?.trace ?? null, velocidade)
  const atual = quadro(resultado?.trace ?? [], reprodutor.indice, inicial)
  const linhas = adaptador.robo.contarLinhas(codigo)
  const passouDoLimite = fase.max_linhas && linhas > fase.max_linhas
  const venceu = resultado?.sucesso && reprodutor.terminou

  // Ao terminar a animação de uma solução certa, registra a fase.
  useEffect(() => {
    if (!venceu) return
    const novas = useProgresso.getState().concluirFase(idProgresso, { xp: fase.xp, linhas })
    setConquistasNovas(novas)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- registra uma vez por vitória
  }, [venceu])

  // "Passo a passo" antes de executar: roda o código e avança o primeiro passo quando o trace chega.
  useEffect(() => {
    if (resultado && passoPendente.current) {
      passoPendente.current = false
      reprodutor.passo()
    }
  }, [resultado, reprodutor])

  const rodar = async () => {
    if (passouDoLimite) {
      setAviso(`Este desafio aceita no máximo ${fase.max_linhas} linhas (comentários e linhas vazias não contam).`)
      return null
    }
    setAviso(null)
    setExecutando(true)
    try {
      const novo = await adaptador.robo.executar(codigo, fase)
      reprodutor.reiniciar()
      setResultado(novo)
      return novo
    } finally {
      setExecutando(false)
    }
  }

  const executar = async () => {
    if (await rodar()) reprodutor.tocar()
  }

  const passo = async () => {
    if (resultado) return reprodutor.passo()
    passoPendente.current = true
    if (!(await rodar())) passoPendente.current = false
  }

  const aoMudarCodigo = (novo) => {
    setCodigo(novo)
    if (resultado) {
      reprodutor.reiniciar()
      setResultado(null)
    }
  }

  const terminouComErro = reprodutor.terminou && resultado?.erro
  const linhaDestacada = reprodutor.indice >= 0 ? atual.linha : null

  return (
    <div className="mx-auto grid max-w-page gap-32 px-16 py-32 md:px-32 lg:grid-cols-2">
      <article className="flex min-w-0 flex-col gap-24">
        <nav aria-label="Você está em" className="text-body-sm text-slate-pencil">
          <Link
            to={`/${linguagem}/robo`}
            className="rounded-links font-medium text-graphite-ink underline-offset-4 hover:underline"
          >
            Desafios do Robô
          </Link>
          <span aria-hidden="true"> › </span>
          Fase {numero} de {curso.fases.length}
        </nav>
        <div className="flex flex-wrap items-center gap-8">
          <Titulo nivel={1} tamanho="heading">
            {fase.titulo}
          </Titulo>
          {concluida && <Pilula tom="sucesso">Concluída</Pilula>}
        </div>
        <Markdown texto={fase.corpo} parser={parser} linguagem={linguagem} />

        <Cartao className="flex flex-col gap-16">
          <Labirinto mapa={mapa} estado={atual.estado} descricao={`Labirinto da fase ${fase.titulo}`} />
          <div className="flex flex-wrap items-center justify-between gap-8 text-body-sm">
            <p aria-live="polite" className="text-graphite-ink">
              {descreverEvento(atual.evento)}
            </p>
            <p className="text-slate-pencil">
              Chaves: {atual.estado.coletadas} de {mapa.chaves.length}
            </p>
          </div>
        </Cartao>

        <Cartao className="flex flex-col gap-8">
          <h2 className="text-body font-bold text-midnight-ink">Comandos do Bit</h2>
          <ul className="grid gap-4 text-body-sm">
            {adaptador.robo.funcoes.map((funcao) => (
              <li key={funcao.assinatura}>
                <code className="rounded-md bg-cloud-mist px-4 font-code text-midnight-ink">{funcao.assinatura}</code>{' '}
                <span className="text-slate-pencil">{funcao.descricao}</span>
              </li>
            ))}
          </ul>
        </Cartao>
      </article>

      <div className="flex min-w-0 flex-col gap-16 self-start lg:sticky lg:top-16">
        <Cartao semPreenchimento className="overflow-hidden focus-within:shadow-subtle">
          <div className="flex items-center justify-between border-b border-cloud-mist bg-app-window px-16 py-8">
            <span className="font-code text-caption text-slate-pencil">
              {fase.id}
              {adaptador.extensao}
            </span>
            {fase.max_linhas ? (
              <span className={`text-caption font-semibold ${passouDoLimite ? 'text-ember-crust' : 'text-slate-pencil'}`}>
                Linhas: {linhas} de {fase.max_linhas}
              </span>
            ) : (
              <span className="text-caption text-slate-pencil">Esc, Tab sai do editor</span>
            )}
          </div>
          <EditorCodigo
            valor={codigo}
            aoMudar={aoMudarCodigo}
            aoExecutar={executar}
            suporte={adaptador.editor.suporte}
            indentacao={adaptador.editor.indentacao}
            linhaAtual={terminouComErro ? null : linhaDestacada}
            linhaErro={terminouComErro ? resultado.erro.linha : null}
            rotulo={`Código do robô em ${adaptador.nome}`}
            className="min-h-192 [&_.cm-editor]:min-h-192"
          />
          <div className="flex flex-col gap-16 border-t border-cloud-mist px-16 py-16">
            <div className="flex flex-wrap items-center gap-8">
              <Botao
                variante={venceu ? 'secundario' : 'primario'}
                onClick={executar}
                disabled={executando}
                icone={venceu ? undefined : 'seta'}
                aria-keyshortcuts="Control+Enter"
              >
                {executando ? 'Executando...' : 'Executar'}
              </Botao>
              {reprodutor.tocando ? (
                <Botao variante="secundario" onClick={reprodutor.pausar}>
                  Pausar
                </Botao>
              ) : (
                <Botao
                  variante="secundario"
                  onClick={reprodutor.tocar}
                  disabled={!resultado || reprodutor.terminou}
                >
                  Continuar
                </Botao>
              )}
              <Botao variante="secundario" onClick={passo} disabled={executando || reprodutor.terminou}>
                Passo a passo
              </Botao>
              <Botao variante="fantasma" onClick={reprodutor.reiniciar} disabled={!resultado}>
                Reiniciar
              </Botao>
            </div>
            <label className="flex items-center gap-16 text-body-sm text-graphite-ink">
              Velocidade
              <input
                type="range"
                min={1}
                max={4}
                step={1}
                value={velocidade}
                onChange={(evento) => setVelocidade(Number(evento.target.value))}
                aria-valuetext={VELOCIDADES[velocidade]}
                className="w-128 accent-signal-orange"
              />
              <span className="text-slate-pencil">{VELOCIDADES[velocidade]}</span>
            </label>
          </div>
        </Cartao>

        {venceu && (
          <Cartao className="flex flex-col gap-16 sm:flex-row sm:items-center sm:justify-between" role="status">
            <div>
              <p className="text-body font-bold text-midnight-ink">O Bit chegou à saída!</p>
              <p className="text-body-sm text-slate-pencil">
                Fase concluída com {linhas} {linhas === 1 ? 'linha' : 'linhas'}. +{fase.xp} XP na primeira vitória.
              </p>
              <ConquistasNovas conquistas={conquistasNovas} />
            </div>
            <Botao
              variante="primario"
              para={fase.proxima ? `/${linguagem}/robo/${fase.proxima}` : `/${linguagem}/robo`}
              icone="seta"
            >
              {fase.proxima ? 'Próxima fase' : 'Ver todas as fases'}
            </Botao>
          </Cartao>
        )}

        <Cartao aria-live="polite" className="flex flex-col gap-16">
          {carga.fase !== 'pronto' && !resultado ? (
            <PainelCarregamento estado={carga} nomeLinguagem={adaptador.nome} />
          ) : (
            <>
              {aviso && <p className="text-body-sm font-semibold text-ember-crust">{aviso}</p>}
              <section aria-label="Saída do programa">
                <h3 className="text-caption font-semibold uppercase text-slate-pencil">Saída</h3>
                <pre className="mt-8 max-h-128 overflow-auto rounded-md bg-app-window px-16 py-8 font-code text-body-sm text-graphite-ink">
                  {atual.console || <span className="text-slate-pencil">(nada por enquanto)</span>}
                </pre>
              </section>
              {terminouComErro && <CartaoErro erro={resultado.erro} />}
              {reprodutor.terminou && !resultado.erro && !resultado.sucesso && (
                <div className="rounded-cards border border-blush-shadow p-16">
                  <p className="text-body font-bold text-midnight-ink">Ainda não foi desta vez</p>
                  <p className="mt-8 text-body-sm text-graphite-ink">
                    {resultado.motivo.charAt(0).toUpperCase() + resultado.motivo.slice(1)}.
                  </p>
                </div>
              )}
            </>
          )}
        </Cartao>

        <Cartao className="flex flex-col gap-8">
          <h2 className="text-body font-bold text-midnight-ink">Dica</h2>
          {mostrarDica ? (
            <Markdown texto={fase.dica} parser={parser} linguagem={linguagem} className="text-body-sm" />
          ) : (
            <div>
              <Botao variante="secundario" tamanho="sm" onClick={() => setMostrarDica(true)}>
                Mostrar a dica
              </Botao>
            </div>
          )}
        </Cartao>
      </div>
    </div>
  )
}
