import { useEffect, useState } from 'react'

/*
 * Janela de código que "digita" pequenos programas e mostra a saída, em
 * loop. É só uma demonstração: nada roda de verdade aqui, para a página
 * inicial abrir sem baixar o interpretador nem o editor.
 */
const PROGRAMAS = [
  { arquivo: 'ola.py', codigo: 'print("Olá, mundo!")', saida: 'Olá, mundo!' },
  {
    arquivo: 'passos.py',
    codigo: 'for passo in range(1, 4):\n    print("Passo", passo)',
    saida: 'Passo 1\nPasso 2\nPasso 3',
  },
  {
    arquivo: 'bit.py',
    codigo: 'nome = "Bit"\nenergia = 3 * 33\nprint(f"{nome} com {energia}% de bateria!")',
    saida: 'Bit com 99% de bateria!',
  },
  {
    arquivo: 'notas.py',
    codigo: 'notas = [7, 9, 10]\nmedia = sum(notas) / len(notas)\nprint("Média:", round(media, 1))',
    saida: 'Média: 8.7',
  },
]

const MS_POR_CARACTERE = 42
const PAUSA_ANTES_DA_SAIDA = 450
const TEMPO_COM_SAIDA = 2600

// Destaque mínimo, sem parser: textos, números e palavras-chave com as classes .tok-* do site.
const TOKENS = /("[^"\n]*"?|\b\d+\b|\b(?:for|in|if|else|def|return|print|range|sum|len|round)\b)/g
const PALAVRAS = new Set(['for', 'in', 'if', 'else', 'def', 'return'])

function classeDoToken(token) {
  if (token.startsWith('"')) return 'tok-string'
  if (/^\d/.test(token)) return 'tok-number'
  return PALAVRAS.has(token) ? 'tok-keyword' : 'tok-variableName2 font-semibold'
}

function Destaque({ codigo }) {
  return codigo.split(TOKENS).map((parte, i) =>
    i % 2 === 1 ? (
      <span key={i} className={classeDoToken(parte)}>
        {parte}
      </span>
    ) : (
      parte
    ),
  )
}

const semAnimacao = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function TerminalDigitando() {
  const [indice, setIndice] = useState(0)
  const [digitados, setDigitados] = useState(() => (semAnimacao() ? PROGRAMAS[0].codigo.length : 0))
  const [mostrarSaida, setMostrarSaida] = useState(semAnimacao)
  const programa = PROGRAMAS[indice]

  useEffect(() => {
    if (semAnimacao()) return
    let temporizador
    if (digitados < programa.codigo.length) {
      temporizador = setTimeout(() => setDigitados((n) => n + 1), MS_POR_CARACTERE)
    } else if (!mostrarSaida) {
      temporizador = setTimeout(() => setMostrarSaida(true), PAUSA_ANTES_DA_SAIDA)
    } else {
      temporizador = setTimeout(() => {
        setIndice((i) => (i + 1) % PROGRAMAS.length)
        setDigitados(0)
        setMostrarSaida(false)
      }, TEMPO_COM_SAIDA)
    }
    return () => clearTimeout(temporizador)
  }, [digitados, mostrarSaida, programa])

  return (
    <div
      className="overflow-hidden rounded-cardslarge border border-card-edge bg-paper-white text-left shadow-xl"
      aria-hidden="true"
    >
      <div className="flex items-center gap-8 border-b border-cloud-mist bg-app-window px-16 py-8">
        <span className="h-8 w-8 bg-signal-orange" />
        <span className="h-8 w-8 bg-warm-cream" />
        <span className="h-8 w-8 bg-cloud-shade" />
        <span className="ml-8 font-code text-caption text-slate-pencil">{programa.arquivo}</span>
      </div>
      <pre className="min-h-[7.5rem] px-16 py-16 font-code text-body-sm leading-subheading text-graphite-ink">
        <Destaque codigo={programa.codigo.slice(0, digitados)} />
        <span className="ml-[1px] inline-block h-[1.1em] w-8 translate-y-[3px] animate-cursor bg-signal-orange" />
      </pre>
      <div className="border-t border-cloud-mist bg-app-window px-16 py-8">
        <p className="text-caption font-semibold uppercase text-slate-pencil">Saída</p>
        <pre className="min-h-[3.75rem] font-code text-body-sm text-graphite-ink">
          {mostrarSaida && (
            <span key={indice} className="block animate-surge">
              {programa.saida}
            </span>
          )}
        </pre>
      </div>
    </div>
  )
}
