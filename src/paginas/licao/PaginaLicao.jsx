import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
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
import { NaoEncontrada } from '../NaoEncontrada.jsx'
import { Dicas } from './Dicas.jsx'
import { PainelResultado } from './PainelResultado.jsx'
import { Solucao, TENTATIVAS_PARA_SOLUCAO } from './Solucao.jsx'

export function PaginaLicao() {
  const { linguagem, licaoId } = useParams()
  const adaptador = obterLinguagem(linguagem)
  const curso = obterCurso(linguagem)
  const licao = curso?.licoes.get(licaoId)
  if (!adaptador || !licao) return <NaoEncontrada />
  // A key recria o estado ao trocar de lição.
  return <Licao key={licao.id} adaptador={adaptador} curso={curso} licao={licao} />
}

function Licao({ adaptador, curso, licao }) {
  const { exercicio } = licao
  const carga = useEstadoCarga(adaptador)
  const linguagem = adaptador.id
  const parser = useMemo(() => adaptador.editor.suporte().language.parser, [adaptador])
  const nivel = curso.niveis.find((n) => n.id === licao.nivelId)
  const modulo = nivel.modulos.find((m) => m.id === licao.moduloId)

  const [codigo, setCodigo] = useState(exercicio.codigo_inicial)
  const [resultado, setResultado] = useState(null)
  const [executando, setExecutando] = useState(false)
  const [tentativas, setTentativas] = useState(0)
  const [dicasVistas, setDicasVistas] = useState(0)
  const [concluida, setConcluida] = useState(false)

  const executar = async () => {
    if (executando) return
    setExecutando(true)
    try {
      const novo = await adaptador.executar(codigo, { entrada: exercicio.entrada ?? [], testes: exercicio.testes })
      setResultado(novo)
      setTentativas((n) => n + 1)
      if (novo.passou) setConcluida(true)
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
            aoRevelar={() => setDicasVistas((n) => n + 1)}
            parser={parser}
            linguagem={linguagem}
          />
          <Solucao
            exercicio={exercicio}
            liberada={concluida || tentativas >= TENTATIVAS_PARA_SOLUCAO}
            tentativas={tentativas}
            parser={parser}
            linguagem={linguagem}
          />
        </Cartao>
      </article>

      <div className="flex min-w-0 flex-col gap-16 self-start lg:sticky lg:top-16">
        <Cartao semPreenchimento className="overflow-hidden focus-within:shadow-subtle">
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
          <Cartao className="flex flex-col gap-16 sm:flex-row sm:items-center sm:justify-between" role="status">
            <div>
              <p className="text-body font-bold text-midnight-ink">Exercício concluído!</p>
              <p className="text-body-sm text-slate-pencil">Você ganhou {licao.xp} XP.</p>
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
