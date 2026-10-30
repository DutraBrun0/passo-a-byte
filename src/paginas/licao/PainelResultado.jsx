import { Pilula } from '../../design-system/componentes/Pilula.jsx'

export function CartaoErro({ erro }) {
  return (
    <div className="rounded-cards border border-blush-shadow bg-paper-white p-16">
      <p className="text-body font-bold text-midnight-ink">
        {erro.titulo}
        {erro.linha && <span className="font-medium text-slate-pencil"> · linha {erro.linha}</span>}
      </p>
      <p className="mt-8 text-body-sm text-graphite-ink">{erro.explicacao}</p>
      <p className="mt-8 font-code text-caption text-slate-pencil">{erro.original}</p>
    </div>
  )
}

function ValorTeste({ rotulo, valor }) {
  if (valor == null) return null
  return (
    <div className="min-w-0">
      <dt className="text-caption font-semibold text-slate-pencil">{rotulo}</dt>
      <dd className="mt-4 whitespace-pre-wrap break-words rounded-md bg-app-window px-8 py-4 font-code text-caption text-graphite-ink">
        {valor === '' ? '(nada)' : valor}
      </dd>
    </div>
  )
}

// Os testes entram um depois do outro, e a pílula de cada um "estoura" logo em seguida.
const ATRASO_POR_TESTE_MS = 90

function ItemTeste({ teste, indice }) {
  const atraso = indice * ATRASO_POR_TESTE_MS
  return (
    <li className="animate-surge border-t border-cloud-mist py-8 first:border-t-0" style={{ animationDelay: `${atraso}ms` }}>
      <div className="flex items-start justify-between gap-8">
        <span className="text-body-sm text-graphite-ink">{teste.nome}</span>
        <span className="animate-estoura" style={{ animationDelay: `${atraso + 160}ms` }}>
          <Pilula tom={teste.passou ? 'sucesso' : 'falha'}>{teste.passou ? 'Passou' : 'Falhou'}</Pilula>
        </span>
      </div>
      {!teste.passou && (
        <div className="mt-8 flex flex-col gap-8">
          {teste.mensagem && <p className="text-body-sm text-slate-pencil">{teste.mensagem}</p>}
          {teste.erro && <CartaoErro erro={teste.erro} />}
          {(teste.esperado != null || teste.obtido != null) && (
            <dl className="grid gap-8 sm:grid-cols-2">
              <ValorTeste rotulo="Esperado" valor={teste.esperado} />
              <ValorTeste rotulo="Seu código produziu" valor={teste.obtido} />
            </dl>
          )}
        </div>
      )}
    </li>
  )
}

/** Saída do programa, erro amigável e resultado de cada teste. */
export function PainelResultado({ resultado, executando }) {
  if (executando) {
    return <p className="text-body-sm text-slate-pencil">Executando...</p>
  }
  if (!resultado) {
    return (
      <p className="text-body-sm text-slate-pencil">
        Escreva seu código e clique em <strong className="text-graphite-ink">Executar</strong> (ou Ctrl+Enter).
      </p>
    )
  }
  const aprovados = resultado.testes.filter((t) => t.passou).length
  return (
    <div className="flex flex-col gap-16">
      <section aria-label="Saída do programa">
        <h3 className="text-caption font-semibold uppercase text-slate-pencil">Saída</h3>
        <pre className="mt-8 max-h-192 overflow-auto rounded-md bg-app-window px-16 py-8 font-code text-body-sm text-graphite-ink">
          {resultado.console || <span className="text-slate-pencil">(o programa não mostrou nada)</span>}
        </pre>
      </section>

      {resultado.erro && <CartaoErro erro={resultado.erro} />}

      {resultado.testes.length > 0 && (
        <section aria-label="Testes">
          <div className="flex items-center gap-16">
            <h3 className="shrink-0 text-caption font-semibold uppercase text-slate-pencil">
              Testes: {aprovados} de {resultado.testes.length}
            </h3>
            <span className="h-8 flex-1 overflow-hidden rounded-md bg-cloud-mist" aria-hidden="true">
              <span
                className="block h-full origin-left animate-enche bg-signal-orange"
                style={{ width: `${(aprovados / resultado.testes.length) * 100}%` }}
              />
            </span>
          </div>
          {/* data-sem-revelar: estes itens têm a própria animação de entrada */}
          <ul className="mt-8" data-sem-revelar>
            {resultado.testes.map((teste, i) => (
              <ItemTeste key={i} teste={teste} indice={i} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
