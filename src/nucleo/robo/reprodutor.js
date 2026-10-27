/*
 * Reprodução do trace na thread principal. O Worker já executou tudo; aqui
 * só se escolhe qual quadro mostrar. Por isso pausar, avançar um passo e
 * reiniciar são triviais: é mudar um índice.
 */

/** Intervalo entre quadros por velocidade (1 = lenta ... 4 = turbo), em ms. */
export const INTERVALOS = { 1: 700, 2: 380, 3: 160, 4: 50 }

/** Sensores e prints passam mais rápido que movimentos. */
export function duracaoDoQuadro(evento, velocidade) {
  const base = INTERVALOS[velocidade] ?? INTERVALOS[2]
  return evento?.tipo === 'acao' ? base : Math.round(base / 2)
}

/**
 * Estado visível no índice `indice` (-1 = antes de começar).
 * @returns {{estado: object, linha: number|null, evento: object|null, console: string}}
 */
export function quadro(trace, indice, estadoInicial) {
  if (indice < 0 || !trace.length) return { estado: estadoInicial, linha: null, evento: null, console: '' }
  const evento = trace[Math.min(indice, trace.length - 1)]
  let console = ''
  for (let i = 0; i <= indice && i < trace.length; i++) {
    if (trace[i].tipo === 'saida') console += trace[i].texto
  }
  return { estado: evento.estado, linha: evento.linha ?? null, evento, console }
}

/** Texto curto do que o Bit acabou de fazer, para leitores de tela e para a legenda. */
export function descreverEvento(evento) {
  if (!evento) return 'Pronto para começar.'
  const sim = (valor) => (valor ? 'sim' : 'não')
  switch (evento.acao) {
    case 'andar':
      return 'O Bit andou uma casa.'
    case 'virar_esquerda':
      return 'O Bit virou para a esquerda.'
    case 'virar_direita':
      return 'O Bit virou para a direita.'
    case 'pegar_chave':
      return 'O Bit pegou uma chave.'
    case 'tem_parede':
      return `Tem parede ${evento.lado === 'frente' ? 'à frente' : `à ${evento.lado}`}? ${sim(evento.resultado)}.`
    case 'na_saida':
      return `Está na saída? ${sim(evento.resultado)}.`
    case 'tem_chave':
      return `Tem chave aqui? ${sim(evento.resultado)}.`
    default:
      return evento.tipo === 'saida' ? `O programa mostrou: ${evento.texto.trim()}` : (evento.mensagem ?? '')
  }
}
