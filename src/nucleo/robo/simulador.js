/*
 * Simulador do labirinto dos Desafios do Robô. JavaScript puro, sem DOM e sem
 * saber qual linguagem o comanda: roda dentro do Worker, chamado pelas funções
 * do aluno, e grava um trace que a thread principal só reproduz.
 *
 * Mapa (texto, uma linha por fileira):
 *   #  parede      .  chão      R  posição inicial do robô
 *   S  saída       C  chave (é preciso pegar todas antes de sair)
 */

export const DIRECOES = ['norte', 'leste', 'sul', 'oeste']
const DELTA = { norte: [0, -1], leste: [1, 0], sul: [0, 1], oeste: [-1, 0] }
export const MAX_ACOES = 1000

export class ErroDoRobo extends Error {
  name = 'ErroDoRobo'
}

/** Lê o mapa de texto. Lança erro descritivo se a fase estiver malformada. */
export function lerMapa(texto) {
  const linhas = texto.replace(/\r/g, '').split('\n').filter((linha) => linha.trim() !== '')
  const largura = Math.max(...linhas.map((linha) => linha.length))
  let inicio = null
  let saida = null
  const chaves = []
  const paredes = linhas.map((linha, y) =>
    [...linha.padEnd(largura, '#')].map((celula, x) => {
      if (!'#.RSC'.includes(celula)) throw new Error(`Caractere desconhecido no mapa: "${celula}"`)
      if (celula === 'R') inicio = { x, y }
      if (celula === 'S') saida = { x, y }
      if (celula === 'C') chaves.push({ x, y })
      return celula === '#'
    }),
  )
  if (!inicio) throw new Error('O mapa precisa de um R (posição inicial do robô)')
  if (!saida) throw new Error('O mapa precisa de um S (saída)')
  return { largura, altura: linhas.length, paredes, inicio, saida, chaves }
}

const mesmaCasa = (a, b) => a.x === b.x && a.y === b.y

export function estadoInicialRobo(mapa, direcao = 'leste') {
  if (!DIRECOES.includes(direcao)) throw new Error(`Direção inválida: ${direcao}`)
  return { x: mapa.inicio.x, y: mapa.inicio.y, direcao, chaves: mapa.chaves.map((c) => ({ ...c })), coletadas: 0 }
}

function ehParede(mapa, x, y) {
  return y < 0 || y >= mapa.altura || x < 0 || x >= mapa.largura || mapa.paredes[y][x]
}

function girar(direcao, passos) {
  return DIRECOES[(DIRECOES.indexOf(direcao) + passos + 4) % 4]
}

/**
 * Cria uma simulação para uma fase. As ações recebem a linha do código que as
 * chamou, para o trace saber o que destacar no editor.
 */
export function criarSimulador({ mapa: texto, direcao }) {
  const mapa = lerMapa(texto)
  let estado = estadoInicialRobo(mapa, direcao)
  const trace = []
  let acoes = 0

  const registrar = (evento) => {
    trace.push({ ...evento, estado: { ...estado, chaves: estado.chaves.map((c) => ({ ...c })) } })
  }

  const contar = () => {
    acoes += 1
    if (acoes > MAX_ACOES) throw new ErroDoRobo(`o Bit já fez ${MAX_ACOES} ações e parou para descansar`)
  }

  const falhar = (linha, acao, mensagem) => {
    registrar({ tipo: 'erro', acao, linha, mensagem })
    throw new ErroDoRobo(mensagem)
  }

  const casaDoLado = (lado) => {
    const giro = { frente: 0, direita: 1, esquerda: -1 }[lado]
    if (giro === undefined) throw new ErroDoRobo(`lado inválido "${lado}": use "frente", "esquerda" ou "direita"`)
    const [dx, dy] = DELTA[girar(estado.direcao, giro)]
    return { x: estado.x + dx, y: estado.y + dy }
  }

  const chaveAqui = () => estado.chaves.findIndex((chave) => mesmaCasa(chave, estado))

  const api = {
    andar(linha) {
      contar()
      const destino = casaDoLado('frente')
      if (ehParede(mapa, destino.x, destino.y)) falhar(linha, 'andar', 'o Bit bateu na parede')
      estado = { ...estado, ...destino }
      registrar({ tipo: 'acao', acao: 'andar', linha })
    },
    virarEsquerda(linha) {
      contar()
      estado = { ...estado, direcao: girar(estado.direcao, -1) }
      registrar({ tipo: 'acao', acao: 'virar_esquerda', linha })
    },
    virarDireita(linha) {
      contar()
      estado = { ...estado, direcao: girar(estado.direcao, 1) }
      registrar({ tipo: 'acao', acao: 'virar_direita', linha })
    },
    pegarChave(linha) {
      contar()
      const indice = chaveAqui()
      if (indice < 0) falhar(linha, 'pegar_chave', 'não há chave na casa onde o Bit está')
      estado = { ...estado, chaves: estado.chaves.filter((_, i) => i !== indice), coletadas: estado.coletadas + 1 }
      registrar({ tipo: 'acao', acao: 'pegar_chave', linha })
    },
    temParede(linha, lado = 'frente') {
      contar()
      const casa = casaDoLado(lado)
      const resultado = ehParede(mapa, casa.x, casa.y)
      registrar({ tipo: 'sensor', acao: 'tem_parede', linha, resultado, lado })
      return resultado
    },
    naSaida(linha) {
      contar()
      const resultado = mesmaCasa(estado, mapa.saida)
      registrar({ tipo: 'sensor', acao: 'na_saida', linha, resultado })
      return resultado
    },
    temChave(linha) {
      contar()
      const resultado = chaveAqui() >= 0
      registrar({ tipo: 'sensor', acao: 'tem_chave', linha, resultado })
      return resultado
    },
    saida(texto, linha) {
      // print escreve o texto e o "\n" em chamadas separadas: junta numa só.
      const ultimo = trace.at(-1)
      if (ultimo?.tipo === 'saida' && ultimo.linha === linha) ultimo.texto += texto
      else registrar({ tipo: 'saida', texto, linha })
    },
  }

  return {
    api,
    mapa,
    trace,
    /** Fecha o trace com o veredito: chegou à saída com todas as chaves? */
    concluir() {
      const naSaida = mesmaCasa(estado, mapa.saida)
      const sucesso = naSaida && estado.chaves.length === 0
      const motivo = sucesso
        ? null
        : naSaida
          ? `faltou pegar ${estado.chaves.length === 1 ? '1 chave' : `${estado.chaves.length} chaves`} antes de sair`
          : 'o programa terminou, mas o Bit não chegou à saída'
      return { sucesso, motivo }
    },
  }
}
