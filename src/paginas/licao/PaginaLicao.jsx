import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ConquistasNovas } from '../../componentes/Conquista.jsx'
import { PainelCarregamento } from '../../componentes/PainelCarregamento.jsx'
import { Botao } from '../../design-system/componentes/Botao.jsx'
import { Cartao } from '../../design-system/componentes/Cartao.jsx'
import { Pilula } from '../../design-system/componentes/Pilula.jsx'
import { Titulo } from '../../design-system/componentes/Titulo.jsx'
import { soltarConfeteDe } from '../../design-system/efeitos/confete.js'
import { EditorCodigo } from '../../editor/EditorCodigo.jsx'
import { Markdown } from '../../editor/Markdown.jsx'
import { obterCurso } from '../../nucleo/conteudo/cursos.js'
import { useEstadoCarga } from '../../nucleo/execucao/useEstadoCarga.js'
import { obterLinguagem } from '../../nucleo/linguagens/registro.js'
import { chave, statusLicao } from '../../nucleo/progresso/regras.js'
import { useProgresso } from '../../nucleo/progresso/useProgresso.js'
import { NaoEncontrada } from '../NaoEncontrada.jsx'
import { Dicas } from './Dicas.jsx'
import { PainelResultado } from './PainelResultado.jsx'
import { Solucao, TENTATIVAS_PARA_SOLUCAO } from './Solucao.jsx'

export function PaginaLicao() {
  const { linguagem, licaoId } = useParams()
  const adaptador = obterLinguagem(linguagem)
  const curso = obterCurso(linguagem)
  const licao = curso?.licoes.get(licaoId)
  const bloqueada = useProgresso((s) => licao && statusLicao(s.dados, linguagem, licao) === 'bloqueada')
  if (!adaptador || !licao) return <NaoEncontrada />
  if (bloqueada) return <LicaoBloqueada linguagem={linguagem} licao={licao} curso={curso} />
  // A key recria o estado ao trocar de lição.
  return <Licao key={licao.id} adaptador={adaptador} curso={curso} licao={licao} />
}

function LicaoBloqueada({ linguagem, licao, curso }) {
  const anterior = curso.licoes.get(licao.anterior)
  return (
    <div className="mx-auto flex max-w-prose flex-col items-start gap-16 px-16 py-96">
      <Pilula tom="bloqueado">Lição bloqueada</Pilula>
      <Titulo nivel={1} tamanho="heading">
        {licao.titulo}
      </Titulo>
      <p className="text-slate-pencil">
        Esta lição abre quando você concluir a anterior, <strong className="text-graphite-ink">{anterior.titulo}</strong>.
      </p>
      <Botao variante="primario" para={`/${linguagem}/licao/${anterior.id}`} icone="seta">
        Ir para a lição anterior
      </Botao>
    </div>
  )
}

/** Liga a lição ao progresso salvo: rascunho, tentativas, dicas e conclusão. */
function useProgressoLicao(id) {
  const registro = useProgresso((s) => s.dados.licoes[id])
  const acoes = useProgresso.getState()
  return {
    rascunho: registro?.rascunho ?? null,
    tentativas: registro?.tentativas ?? 0,
    dicasVistas: registro?.dicasVistas ?? 0,
    concluida: Boolean(registro?.concluidaEm),
    xpGanho: registro?.xpGanho,
    salvarRascunho: (codigo) => acoes.salvarRascunho(id, codigo),
    revelarDica: (total) => acoes.revelarDica(id, total),
    marcarSolucaoVista: () => acoes.marcarSolucaoVista(id),
    registrarTentativa: (dados) => acoes.registrarTentativa(id, dados),
  }
}

function Licao({ adaptador, curso, licao }) {
  const { exercicio } = licao
  const carga = useEstadoCarga(adaptador)
  const linguagem = adaptador.id
  const parser = useMemo(() => adaptador.editor.suporte().language.parser, [adaptador])
  const nivel = curso.niveis.find((n) => n.id === licao.nivelId)
  const modulo = nivel.modulos.find((m) => m.id === licao.moduloId)

  const progresso = useProgressoLicao(chave(linguagem, licao.id))
  const { tentativas, dicasVistas, concluida } = progresso

  const [codigo, setCodigo] = useState(progresso.rascunho ?? exercicio.codigo_inicial)
  const [resultado, setResultado] = useState(null)
  const [executando, setExecutando] = useState(false)
  const [conquistasNovas, setConquistasNovas] = useState([])
  const [tremendo, setTremendo] = useState(false)
  const botaoExecutar = useRef(null)

  // Salva o rascunho pouco depois de o aluno parar de digitar.
  const { salvarRascunho } = progresso
  useEffect(() => {
    const temporizador = setTimeout(() => salvarRascunho(codigo), 400)
    return () => clearTimeout(temporizador)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- salvarRascunho muda a cada render, o código não
  }, [codigo])

  const executar = async () => {
    if (executando) return
    setExecutando(true)
    try {
      const novo = await adaptador.executar(codigo, { entrada: exercicio.entrada ?? [], testes: exercicio.testes })
      setResultado(novo)
      setConquistasNovas(progresso.registrarTentativa({ passou: novo.passou, xp: licao.xp }))
      // Comemoração ao passar; o editor balança "não" ao falhar.
      if (novo.passou) soltarConfeteDe(botaoExecutar.current, { quantidade: concluida ? 40 : 90 })
      else setTremendo(true)
    } finally {
      setExecutando(false)
    }
  }

  const pronto = carga.fase === 'pronto'
  const caminhoTrilha = `/${adaptador.id}/trilha`

  return (
    <div className="mx-auto grid max-w-page gap-32 px-16 py-32 md:px-32 lg:grid-cols-2">
      <article className="flex min-w-0 flex-col gap-24">
        <nav aria-label="Você está em" className="text-body-sm text-slate-pencil">
          <Link to={caminhoTrilha} className="rounded-links font-medium text-graphite-ink underline-offset-4 hover:underline">
            {nivel.titulo}
          </Link>
          <span aria-hidden="true"> › </span>
          {modulo.titulo}
        </nav>
        <Titulo nivel={1} tamanho="heading">
          {licao.titulo}
        </Titulo>
        <Markdown texto={licao.corpo} parser={parser} linguagem={linguagem} />

        <Cartao className="flex flex-col gap-24">
          <section aria-labelledby="titulo-exercicio">
            <div className="flex items-center justify-between gap-8">
              <h2 id="titulo-exercicio" className="text-subheading font-bold text-midnight-ink">
                Exercício
              </h2>
              <Pilula>+{licao.xp} XP</Pilula>
            </div>
            <Markdown texto={exercicio.enunciado} parser={parser} linguagem={linguagem} className="mt-8" />
          </section>
          <Dicas
            dicas={exercicio.dicas}
            vistas={dicasVistas}
            aoRevelar={() => progresso.revelarDica(exercicio.dicas.length)}
            parser={parser}
            linguagem={linguagem}
          />
          <Solucao
            exercicio={exercicio}
            liberada={concluida || tentativas >= TENTATIVAS_PARA_SOLUCAO}
            concluida={concluida}
            tentativas={tentativas}
            aoVer={progresso.marcarSolucaoVista}
            parser={parser}
            linguagem={linguagem}
          />
        </Cartao>
      </article>

      <div className="flex min-w-0 flex-col gap-16 self-start lg:sticky lg:top-96">
        <Cartao
          semPreenchimento
          className={`overflow-hidden focus-within:shadow-subtle ${tremendo ? 'animate-treme' : ''}`}
          onAnimationEnd={(evento) => evento.target === evento.currentTarget && setTremendo(false)}
        >
          <div className="flex items-center justify-between border-b border-cloud-mist bg-app-window px-16 py-8">
            <span className="font-code text-caption text-slate-pencil">
              {licao.id}
              {adaptador.extensao}
            </span>
            <span className="text-caption text-slate-pencil">Esc, Tab sai do editor</span>
          </div>
          <EditorCodigo
            valor={codigo}
            aoMudar={setCodigo}
            aoExecutar={executar}
            suporte={adaptador.editor.suporte}
            indentacao={adaptador.editor.indentacao}
            linhaErro={resultado?.erro?.linha}
            rotulo={`Código do exercício em ${adaptador.nome}`}
            className="min-h-192 [&_.cm-editor]:min-h-192"
          />
          <div className="flex flex-wrap items-center gap-8 border-t border-cloud-mist px-16 py-16">
            <Botao
              ref={botaoExecutar}
              variante={concluida ? 'secundario' : 'primario'}
              onClick={executar}
              disabled={executando}
              aria-keyshortcuts="Control+Enter"
              icone={concluida ? undefined : 'seta'}
            >
              {executando ? 'Executando...' : 'Executar'}
            </Botao>
            <Botao variante="fantasma" onClick={() => setCodigo(exercicio.codigo_inicial)}>
              Restaurar código inicial
            </Botao>
          </div>
        </Cartao>

        {concluida && (
          <Cartao
            className="relative flex animate-estoura flex-col gap-16 sm:flex-row sm:items-center sm:justify-between"
            role="status"
          >
            {resultado?.passou && (
              <span
                key={progresso.tentativas}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 animate-sobe-some font-jersey-10 text-heading-sm text-signal-orange"
              >
                +{progresso.xpGanho ?? licao.xp} XP
              </span>
            )}
            <div>
              <p className="text-body font-bold text-midnight-ink">Exercício concluído!</p>
              <p className="text-body-sm text-slate-pencil">Você ganhou {progresso.xpGanho ?? licao.xp} XP.</p>
              <ConquistasNovas conquistas={conquistasNovas} />
            </div>
            <Botao
              variante="primario"
              para={licao.proxima ? `/${adaptador.id}/licao/${licao.proxima}` : caminhoTrilha}
              icone="seta"
            >
              {licao.proxima ? 'Próxima lição' : 'Voltar à trilha'}
            </Botao>
          </Cartao>
        )}

        <Cartao aria-live="polite">
          {pronto || resultado ? (
            <PainelResultado resultado={resultado} executando={executando} />
          ) : (
            <PainelCarregamento estado={carga} nomeLinguagem={adaptador.nome} />
          )}
        </Cartao>
      </div>
    </div>
  )
}
