import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlocoCodigo } from './BlocoCodigo.jsx'

/**
 * Markdown das lições. Blocos marcados com a linguagem do curso (```python)
 * usam o parser vindo do adaptador; os demais (```text, saídas) ficam sem cor.
 * Assim o núcleo não conhece nenhuma linguagem.
 */
export function Markdown({ texto, parser, linguagem, className = '' }) {
  const componentes = {
    pre: ({ children }) => {
      const codigo = String(children?.props?.children ?? '').replace(/\n$/, '')
      const destacar = linguagem && children?.props?.className === `language-${linguagem}`
      return <BlocoCodigo codigo={codigo} parser={destacar ? parser : null} />
    },
    a: ({ children, href }) => (
      <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {children}
      </a>
    ),
  }
  return (
    <div className={`prosa ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={componentes}>
        {texto}
      </ReactMarkdown>
    </div>
  )
}
