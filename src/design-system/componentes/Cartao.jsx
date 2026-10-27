/*
 * Card do sistema: superfície branca, borda Cloud Mist, raio 12px (16px no grande)
 * e exatamente uma sombra (md no padrão, xl no elevado). Nunca empilhar sombras.
 */
const ELEVACAO = {
  padrao: 'shadow-md',
  elevado: 'shadow-xl',
}

export function Cartao({
  como = 'div',
  elevacao = 'padrao',
  grande = false,
  semPreenchimento = false,
  className = '',
  children,
  ...resto
}) {
  const Tag = como
  const raio = grande ? 'rounded-cardslarge' : 'rounded-cards'
  const preenchimento = semPreenchimento ? '' : 'p-16'
  return (
    <Tag
      className={`border border-cloud-mist bg-paper-white ${preenchimento} ${raio} ${ELEVACAO[elevacao]} ${className}`}
      {...resto}
    >
      {children}
    </Tag>
  )
}
