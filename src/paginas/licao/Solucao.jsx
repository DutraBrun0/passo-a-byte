import { useState } from 'react'
import { Botao } from '../../design-system/componentes/Botao.jsx'
import { Pilula } from '../../design-system/componentes/Pilula.jsx'
import { BlocoCodigo } from '../../editor/BlocoCodigo.jsx'
import { Markdown } from '../../editor/Markdown.jsx'

export const TENTATIVAS_PARA_SOLUCAO = 3

/**
 * Solução comentada. Fica trancada até o aluno tentar algumas vezes ou acertar,
 * para que a primeira reação a um erro seja ler o feedback, não a resposta.
 */
export function Solucao({ exercicio, liberada, tentativas, aoVer, parser, linguagem }) {
  const [aberta, setAberta] = useState(false)

  const abrir = () => {
    setAberta(true)
    aoVer?.()
  }

  return (
    <section aria-labelledby="titulo-solucao" className="flex flex-col gap-8">
      <h2 id="titulo-solucao" className="text-body font-bold text-midnight-ink">
        Solução comentada
      </h2>
      {!liberada ? (
        <div>
          <Pilula tom="bloqueado">
            Libera depois de {TENTATIVAS_PARA_SOLUCAO} tentativas ({Math.min(tentativas, TENTATIVAS_PARA_SOLUCAO)} de{' '}
            {TENTATIVAS_PARA_SOLUCAO})
          </Pilula>
        </div>
      ) : aberta ? (
        <div className="flex flex-col gap-16">
          <BlocoCodigo codigo={exercicio.solucao.trimEnd()} parser={parser} />
          <Markdown texto={exercicio.explicacao_solucao} parser={parser} linguagem={linguagem} className="text-body-sm" />
        </div>
      ) : (
        <div>
          <Botao variante="secundario" tamanho="sm" onClick={abrir}>
            Ver a solução
          </Botao>
        </div>
      )}
    </section>
  )
}
