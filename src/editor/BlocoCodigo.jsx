import { useMemo } from 'react'
import { classHighlighter, highlightCode } from '@lezer/highlight'

/**
 * Bloco de código estático com o mesmo destaque do editor: usa o parser Lezer
 * que vem no LanguageSupport do adaptador e as mesmas classes .tok-*.
 */
export function BlocoCodigo({ codigo, parser }) {
  const partes = useMemo(() => {
    if (!parser) return [[codigo, '']]
    const resultado = []
    highlightCode(
      codigo,
      parser.parse(codigo),
      classHighlighter,
      (texto, classes) => resultado.push([texto, classes]),
      () => resultado.push(['\n', '']),
    )
    return resultado
  }, [codigo, parser])

  return (
    <pre className="overflow-x-auto rounded-cards border border-card-edge bg-app-window px-16 py-16 font-code text-body-sm leading-subheading text-graphite-ink">
      <code>
        {partes.map(([texto, classes], i) =>
          classes ? (
            <span key={i} className={classes}>
              {texto}
            </span>
          ) : (
            texto
          ),
        )}
      </code>
    </pre>
  )
}
