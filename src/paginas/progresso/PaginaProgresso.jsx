import { useRef, useState } from 'react'
import { Conquista } from '../../componentes/Conquista.jsx'
import { BarraPixel } from '../../design-system/componentes/BarraPixel.jsx'
import { Botao } from '../../design-system/componentes/Botao.jsx'
import { Cartao } from '../../design-system/componentes/Cartao.jsx'
import { ContadorAnimado } from '../../design-system/componentes/ContadorAnimado.jsx'
import { Titulo } from '../../design-system/componentes/Titulo.jsx'
import { Nuvens } from '../../design-system/sprites/Nuvens.jsx'
import { cursos } from '../../nucleo/conteudo/cursos.js'
import { obterLinguagem } from '../../nucleo/linguagens/registro.js'
import { paraArquivo } from '../../nucleo/progresso/arquivo.js'
import { CONQUISTAS } from '../../nucleo/progresso/conquistas.js'
import { contarConcluidas, diaLocal, sequenciaVigente } from '../../nucleo/progresso/regras.js'
import { useProgresso } from '../../nucleo/progresso/useProgresso.js'

function Numero({ rotulo, valor, sufixo = '', detalhe }) {
  return (
    <Cartao data-inclinar className="levita hover:border-signal-orange hover:shadow-xl">
      <p className="text-caption font-semibold uppercase text-slate-pencil">{rotulo}</p>
      <p className="font-jersey-10 text-heading text-graphite-ink">
        <ContadorAnimado valor={valor} />
        {sufixo}
      </p>
      {detalhe && <p className="text-caption text-slate-pencil">{detalhe}</p>}
    </Cartao>
  )
}

function baixarJson(nomeArquivo, dados) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' }))
  const link = Object.assign(document.createElement('a'), { href: url, download: nomeArquivo })
  link.click()
  URL.revokeObjectURL(url)
}

function Backup() {
  const { dados, importar, resetar } = useProgresso()
  const entrada = useRef(null)
  const [aviso, setAviso] = useState(null)
  const [confirmando, setConfirmando] = useState(false)

  const exportar = () => {
    baixarJson(`passo-a-byte-progresso-${diaLocal(new Date())}.json`, paraArquivo(dados))
    setAviso({ ok: true, texto: 'Arquivo de progresso baixado.' })
  }

  const aoEscolherArquivo = async (evento) => {
    const arquivo = evento.target.files?.[0]
    evento.target.value = ''
    if (!arquivo) return
    try {
      importar(await arquivo.text())
      setAviso({ ok: true, texto: 'Progresso importado com sucesso.' })
    } catch (erro) {
      setAviso({ ok: false, texto: erro.message })
    }
  }

  return (
    <Cartao className="flex flex-col gap-16">
      <div>
        <h2 className="text-subheading font-bold text-midnight-ink">Backup do progresso</h2>
        <p className="text-body-sm text-slate-pencil">
          Seu progresso fica só neste navegador. Exporte um arquivo para guardar ou continuar em outro computador.
        </p>
      </div>
      <div className="flex flex-wrap gap-8">
        <Botao variante="secundario" onClick={exportar}>
          Exportar arquivo
        </Botao>
        <Botao variante="secundario" onClick={() => entrada.current.click()}>
          Importar arquivo
        </Botao>
        <input ref={entrada} type="file" accept="application/json,.json" className="sr-only" tabIndex={-1} onChange={aoEscolherArquivo} />
        {confirmando ? (
          <span className="flex flex-wrap items-center gap-8">
            <span className="text-body-sm text-graphite-ink">Apagar tudo mesmo?</span>
            <Botao
              variante="secundario"
              onClick={() => {
                resetar()
                setConfirmando(false)
                setAviso({ ok: true, texto: 'Progresso apagado.' })
              }}
            >
              Sim, apagar
            </Botao>
            <Botao variante="fantasma" onClick={() => setConfirmando(false)}>
              Cancelar
            </Botao>
          </span>
        ) : (
          <Botao variante="fantasma" onClick={() => setConfirmando(true)}>
            Apagar progresso
          </Botao>
        )}
      </div>
      {aviso && (
        <p role="status" className={`text-body-sm ${aviso.ok ? 'text-graphite-ink' : 'font-semibold text-ember-crust'}`}>
          {aviso.texto}
        </p>
      )}
    </Cartao>
  )
}

export function PaginaProgresso() {
  const dados = useProgresso((s) => s.dados)
  const hoje = diaLocal(new Date())
  const totalConcluidas = Object.values(dados.licoes).filter((l) => l.concluidaEm).length
  const desbloqueadas = Object.keys(dados.conquistas).length

  return (
    <div className="relative isolate overflow-hidden">
      <Nuvens cantos={['topo-direita', 'base-esquerda']} />
      <div className="mx-auto flex max-w-page flex-col gap-48 px-16 py-48 md:px-32">
        <header>
          <Titulo nivel={1} tamanho="heading-lg">
            Seu progresso
          </Titulo>
        </header>

        <section aria-label="Resumo" className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
          <Numero rotulo="XP" valor={dados.xp} />
          <Numero
            rotulo="Sequência"
            valor={sequenciaVigente(dados.sequencia, hoje)}
            sufixo=" dias"
            detalhe={`Recorde: ${dados.sequencia.melhor} dias`}
          />
          <Numero rotulo="Lições" valor={totalConcluidas} detalhe="concluídas" />
          <Numero rotulo="Conquistas" valor={desbloqueadas} sufixo={`/${CONQUISTAS.length}`} />
        </section>

        {[...cursos.values()].map((curso) => (
          <section key={curso.linguagem} aria-labelledby={`progresso-${curso.linguagem}`} className="flex flex-col gap-16">
            <h2 id={`progresso-${curso.linguagem}`} className="text-subheading font-bold text-midnight-ink">
              Níveis de {obterLinguagem(curso.linguagem)?.nome ?? curso.linguagem}
            </h2>
            <div className="grid gap-16 md:grid-cols-2">
              {curso.niveis.map((nivel) => {
                const licoes = nivel.modulos.flatMap((m) => m.licoes)
                const feitas = contarConcluidas(dados, curso.linguagem, licoes)
                return (
                  <Cartao key={nivel.id} className="flex flex-col gap-8">
                    <p className="text-body font-bold text-graphite-ink">{nivel.titulo}</p>
                    <BarraPixel valor={licoes.length ? feitas / licoes.length : 0} blocos={12} rotulo={`Progresso em ${nivel.titulo}`} />
                    <p className="text-caption text-slate-pencil">
                      {licoes.length ? `${feitas} de ${licoes.length} lições` : 'Em construção'}
                    </p>
                  </Cartao>
                )
              })}
            </div>
          </section>
        ))}

        <section aria-labelledby="titulo-conquistas" className="flex flex-col gap-16">
          <h2 id="titulo-conquistas" className="text-subheading font-bold text-midnight-ink">
            Conquistas
          </h2>
          <ul className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {CONQUISTAS.map((conquista) => (
              <li key={conquista.id}>
                <Conquista conquista={conquista} desbloqueadaEm={dados.conquistas[conquista.id]} />
              </li>
            ))}
          </ul>
        </section>

        <Backup />
      </div>
    </div>
  )
}
