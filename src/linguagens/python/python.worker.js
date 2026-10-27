/*
 * Web Worker do Python. Carrega o Pyodide servido pelo próprio site
 * (public/pyodide/<versão>/), instala o executor e atende pedidos do
 * SupervisorWorker. Nada aqui toca no DOM, e a rede é bloqueada depois da carga.
 */
import { instalarRuntime } from './runtime/runtime.js'

const PASTA = new URL(`${import.meta.env.BASE_URL}pyodide/${__PYODIDE_VERSAO__}/`, self.location.origin).href

let carregando = null
let runtime = null

const progresso = (dados) => self.postMessage({ tipo: 'progresso', ...dados })

/**
 * Envolve o fetch durante a carga para medir os bytes baixados. O total vem do
 * manifesto gerado pelo scripts/copiar-pyodide.js; sem ele, a barra fica indeterminada.
 */
function medirDownloads(total) {
  const fetchOriginal = self.fetch.bind(self)
  let carregado = 0
  self.fetch = async (...args) => {
    const resposta = await fetchOriginal(...args)
    if (!resposta.ok || !resposta.body) return resposta
    const leitor = resposta.body.getReader()
    const corpo = new ReadableStream({
      async pull(controle) {
        const { done, value } = await leitor.read()
        if (done) return controle.close()
        carregado += value.byteLength
        progresso({ fase: 'baixando', carregado, total })
        controle.enqueue(value)
      },
      cancel: (motivo) => leitor.cancel(motivo),
    })
    return new Response(corpo, { status: resposta.status, statusText: resposta.statusText, headers: resposta.headers })
  }
  return () => {
    self.fetch = fetchOriginal
  }
}

/** Depois da carga, o código do aluno não tem como acessar a rede (nem via `js` no Python). */
function bloquearRede() {
  const negado = () => {
    throw new Error('Acesso à rede desativado no ambiente de execução')
  }
  for (const nome of ['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'WebTransport', 'importScripts']) {
    if (nome in self) Object.defineProperty(self, nome, { value: negado, writable: false, configurable: false })
  }
}

async function carregar() {
  const inicio = performance.now()
  const manifesto = await fetch(`${PASTA}manifesto.json`)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
  progresso({ fase: 'baixando', carregado: 0, total: manifesto?.total ?? null })

  const restaurarFetch = medirDownloads(manifesto?.total ?? null)
  try {
    const { loadPyodide } = await import(/* @vite-ignore */ `${PASTA}pyodide.mjs`)
    const pyodide = await loadPyodide({ indexURL: PASTA })
    progresso({ fase: 'iniciando' })
    runtime = instalarRuntime(pyodide)
  } finally {
    restaurarFetch()
  }
  bloquearRede()
  return { versao: runtime.versaoPython, ms: Math.round(performance.now() - inicio) }
}

const TRATADORES = {
  iniciar: () => (carregando ??= carregar()),
  executar: ({ codigo, opcoes }) => runtime.executar(codigo, opcoes),
}

self.onmessage = async ({ data: { id, tipo, dados } }) => {
  try {
    const tratador = TRATADORES[tipo]
    if (!tratador) throw new Error(`Pedido desconhecido: ${tipo}`)
    self.postMessage({ id, ok: true, resultado: await tratador(dados) })
  } catch (erro) {
    self.postMessage({ id, ok: false, erro: String(erro?.message ?? erro) })
  }
}
