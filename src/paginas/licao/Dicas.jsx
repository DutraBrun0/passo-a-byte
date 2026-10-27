import { Botao } from '../../design-system/componentes/Botao.jsx'
import { Markdown } from '../../editor/Markdown.jsx'

/** Dicas reveladas uma de cada vez, da mais vaga para a mais direta. */
export function Dicas({ dicas, vistas, aoRevelar, parser, linguagem }) {
  const reveladas = dicas.slice(0, vistas)
  return (
    <section aria-labelledby="titulo-dicas" className="flex flex-col gap-8">
      <h2 id="titulo-dicas" className="text-body font-bold text-midnight-ink">
        Dicas
      </h2>
      {reveladas.length > 0 && (
        <ol className="flex flex-col gap-8" aria-live="polite">
          {reveladas.map((dica, i) => (
            <li key={i} className="rounded-md bg-cloud-mist px-16 py-8">
              <span className="text-caption font-semibold text-slate-pencil">Dica {i + 1}</span>
              <Markdown texto={dica} parser={parser} linguagem={linguagem} className="text-body-sm" />
            </li>
          ))}
        </ol>
      )}
      {vistas < dicas.length ? (
        <div>
          <Botao variante="secundario" tamanho="sm" onClick={aoRevelar}>
            {vistas === 0 ? 'Mostrar uma dica' : 'Mostrar outra dica'} ({vistas + 1} de {dicas.length})
          </Botao>
        </div>
      ) : (
        <p className="text-body-sm text-slate-pencil">Essas são todas as dicas.</p>
      )}
    </section>
  )
}
