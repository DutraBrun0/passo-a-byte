/*
 * Títulos em Jersey 10. A fonte pixel só existe a partir de 36px (DESIGN.md › Don'ts),
 * então o componente aceita apenas os tamanhos da escala de display.
 * Para títulos menores, use Manrope em negrito direto no elemento.
 */
const TAMANHOS = {
  'heading-sm': 'text-heading-sm',
  heading: 'text-heading',
  'heading-lg': 'text-heading-lg',
  display: 'text-display',
}

export function Titulo({ nivel = 2, tamanho = 'heading', className = '', children, ...resto }) {
  const Tag = `h${nivel}`
  if (!TAMANHOS[tamanho]) throw new Error(`Tamanho de título fora da escala: ${tamanho}`)
  return (
    <Tag className={`font-jersey-10 font-normal text-graphite-ink ${TAMANHOS[tamanho]} ${className}`} {...resto}>
      {children}
    </Tag>
  )
}
