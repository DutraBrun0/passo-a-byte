/*
 * Executor de JavaScript do Passo a Byte, a contraparte do executor.py.
 *
 * Roda no Web Worker do navegador e direto no Node durante os testes. Recebe o
 * código do aluno, executa com limites de passos, tempo e saída, roda os testes
 * do exercício e devolve um resultado no mesmo formato do executor de Python.
 *
 * O código vira o corpo de uma função em modo estrito, com console, prompt e
 * assert próprios. No fim do corpo vai um `eval` direto, que deixa os testes
 * lerem as variáveis do aluno (inclusive let e const) depois da execução.
 * As barreiras de segurança reais são o Web Worker e o bloqueio de rede; aqui
 * são guarda-corpos pedagógicos.
 */
import { parse } from 'acorn'
import { instrumentar } from './instrumentar.js'
import { formatarLog, inspecionar, normalizarTexto, tipoDe, valoresIguais } from './valores.js'

const MARCADOR = '__passoAByte'
const PARAMETROS = ['console', 'prompt', 'assert', MARCADOR]
const ACESSO = '\n;return (__codigoDoTeste) => eval(__codigoDoTeste)'

class LimiteExcedido extends Error {
  constructor(tipo, mensagem) {
    super(mensagem)
    this.tipo = tipo
  }
}

class AssertionError extends Error {
  constructor(mensagem = 'a verificação falhou') {
    super(mensagem)
    this.name = 'AssertionError'
  }
}

/** `assert(condição, mensagem)`, usado nos testes do tipo "js". */
function assert(condicao, mensagem) {
  if (!condicao) throw new AssertionError(mensagem)
}

/**
 * Uma execução isolada: fila de entrada, saída e contadores. `console` guarda
 * tudo o que apareceria num terminal (inclusive o que foi "digitado" no
 * prompt); `saida` guarda só o que o programa mostrou, que é o que os testes comparam.
 */
function criarSessao(limites, entrada = []) {
  const sessao = {
    console: [],
    saida: [],
    tamanho: 0,
    passos: 0,
    linha: null,
    estouro: null,
    inicio: performance.now(),
    entrada: entrada.map(String),
  }

  const escrever = (texto, paraSaida = true) => {
    sessao.tamanho += texto.length
    if (sessao.tamanho > limites.saida) {
      throw (sessao.estouro = new LimiteExcedido('LimiteDeSaida', 'o programa mostrou texto demais'))
    }
    sessao.console.push(texto)
    if (paraSaida) sessao.saida.push(texto)
  }

  // Chamado antes de cada instrução (ver instrumentar.js). Depois de estourar um
  // limite continua lançando, para um try/catch do aluno não conseguir segurar o erro.
  sessao.passo = (linha) => {
    if (sessao.estouro) throw sessao.estouro
    sessao.passos += 1
    sessao.linha = linha
    if (sessao.passos > limites.passos) {
      throw (sessao.estouro = new LimiteExcedido('LimiteDePassos', 'o programa executou instruções demais'))
    }
    if (sessao.passos % 256 === 0 && performance.now() - sessao.inicio > limites.segundos * 1000) {
      throw (sessao.estouro = new LimiteExcedido('LimiteDeTempo', 'o programa demorou demais'))
    }
  }

  const mostrar = (...valores) => escrever(formatarLog(valores) + '\n')
  const avisar = (...valores) => escrever(formatarLog(valores) + '\n', false)
  sessao.consoleDoAluno = { log: mostrar, info: mostrar, debug: mostrar, warn: avisar, error: avisar }

  sessao.prompt = (mensagem = '') => {
    escrever(String(mensagem), false)
    if (!sessao.entrada.length) {
      const erro = new Error('o programa chamou prompt(), mas não há mais dados de entrada')
      erro.name = 'EntradaVazia'
      throw erro
    }
    const valor = sessao.entrada.shift()
    escrever(`${valor}\n`, false)
    return valor
  }

  /** Executa `funcao` e devolve { valor, erro }; erro é null quando tudo correu bem. */
  sessao.chamar = (funcao) => {
    try {
      return { valor: funcao(), erro: null }
    } catch (erro) {
      return { valor: null, erro: descreverErro(sessao.estouro ?? erro, sessao.linha) }
    }
  }

  sessao.textoConsole = () => sessao.console.join('')
  sessao.textoSaida = () => sessao.saida.join('')
  return sessao
}

function descreverErro(erro, linha) {
  if (erro instanceof LimiteExcedido) return { tipo: erro.tipo, mensagem: erro.message, linha }
  if (erro instanceof Error) {
    const tipo = erro.name && erro.name !== 'Error' ? erro.name : erro.constructor?.name || 'Error'
    return { tipo, mensagem: erro.message, linha }
  }
  // `throw "texto"` também é permitido em JavaScript.
  return { tipo: 'Error', mensagem: inspecionar(erro, false), linha }
}

/** Devolve { funcao, ast } ou { erro } se o código nem chega a ser válido. */
export function compilar(codigo) {
  let ast
  try {
    ast = parse(codigo, { ecmaVersion: 'latest', sourceType: 'script', locations: true })
  } catch (erro) {
    return {
      erro: {
        tipo: 'SyntaxError',
        mensagem: erro.message.replace(/ \(\d+:\d+\)$/, ''),
        linha: erro.loc?.line ?? null,
        coluna: erro.loc ? erro.loc.column + 1 : null,
      },
    }
  }
  try {
    const corpo = `'use strict';\n${instrumentar(codigo, ast, MARCADOR)}${ACESSO}`
    return { funcao: new Function(...PARAMETROS, corpo), ast }
  } catch (erro) {
    // Algo que o acorn aceita fora do modo estrito, como `with` ou números octais.
    return { erro: { tipo: 'SyntaxError', mensagem: erro.message, linha: null } }
  }
}

/** Roda o programa compilado numa sessão. `acessar(texto)` avalia texto no escopo do aluno. */
function rodarPrograma(funcao, sessao) {
  const { valor, erro } = sessao.chamar(() => funcao(sessao.consoleDoAluno, sessao.prompt, assert, sessao.passo))
  return { erro, acessar: valor }
}

// --- Testes ----------------------------------------------------------------

/** Lê um nome do escopo do aluno; `existe` é false se ele nunca foi declarado. */
function lerNome(acessar, nome) {
  try {
    return { existe: true, valor: acessar(nome) }
  } catch {
    return { existe: false, valor: undefined }
  }
}

function testeSaida(teste, sessao) {
  const obtido = normalizarTexto(sessao.textoSaida())
  const esperado = normalizarTexto(String(teste.esperado))
  return { passou: obtido === esperado, esperado, obtido }
}

function testeFuncao(teste, sessao, acessar) {
  const { existe, valor: funcao } = lerNome(acessar, teste.funcao)
  if (!existe || typeof funcao !== 'function') {
    return { passou: false, esperado: `uma função chamada ${teste.funcao}`, obtido: 'a função não foi encontrada' }
  }
  const { valor, erro } = sessao.chamar(() => funcao(...(teste.args ?? [])))
  const esperado = inspecionar(teste.esperado)
  if (erro) return { passou: false, esperado, obtido: null, erro }
  return { passou: valoresIguais(valor, teste.esperado), esperado, obtido: inspecionar(valor) }
}

function testeVariavel(teste, acessar) {
  const { existe, valor } = lerNome(acessar, teste.variavel)
  if (!existe) return { passou: false, esperado: `uma variável chamada ${teste.variavel}`, obtido: 'a variável não foi criada' }
  if (teste.tipo_esperado) {
    const tipo = tipoDe(valor)
    return { passou: tipo === teste.tipo_esperado, esperado: teste.tipo_esperado, obtido: tipo }
  }
  return { passou: valoresIguais(valor, teste.esperado), esperado: inspecionar(teste.esperado), obtido: inspecionar(valor) }
}

function testeJs(teste, sessao, acessar) {
  const { erro } = sessao.chamar(() => acessar(teste.codigo))
  if (erro?.tipo === 'AssertionError') return { passou: false }
  return { passou: !erro, erro }
}

/** Nomes de cada chamada: `prompt` conta como "prompt"; `console.log`, como "console.log" e ".log". */
function nomesDaChamada(chamada) {
  const alvo = chamada.callee
  if (alvo.type === 'Identifier') return [alvo.name]
  if (alvo.type === 'MemberExpression' && !alvo.computed && alvo.property.type === 'Identifier') {
    const metodo = `.${alvo.property.name}`
    return alvo.object.type === 'Identifier' ? [`${alvo.object.name}${metodo}`, metodo] : [metodo]
  }
  return []
}

/** Olha o código sem executar: tipos de nó exigidos/proibidos e quantas vezes cada função é chamada. */
function testeEstrutura(teste, ast) {
  const presentes = new Set()
  const chamadas = {}
  const visitar = (no) => {
    presentes.add(no.type)
    if (no.type === 'VariableDeclaration') presentes.add(`VariableDeclaration:${no.kind}`)
    if (no.type === 'CallExpression') for (const nome of nomesDaChamada(no)) chamadas[nome] = (chamadas[nome] ?? 0) + 1
    for (const [chave, valor] of Object.entries(no)) {
      if (chave === 'loc') continue
      if (Array.isArray(valor)) valor.forEach((filho) => filho?.type && visitar(filho))
      else if (valor?.type) visitar(valor)
    }
  }
  visitar(ast)
  if ((teste.usa ?? []).some((tipo) => !presentes.has(tipo))) return false
  if ((teste.nao_usa ?? []).some((tipo) => presentes.has(tipo))) return false
  if (Object.entries(teste.max_chamadas ?? {}).some(([nome, limite]) => (chamadas[nome] ?? 0) > limite)) return false
  return Object.entries(teste.min_chamadas ?? {}).every(([nome, minimo]) => (chamadas[nome] ?? 0) >= minimo)
}

function rodarTeste(teste, funcao, ast, limites) {
  const resultado = {
    nome: teste.nome ?? '',
    mensagem: teste.mensagem ?? '',
    passou: false,
    esperado: null,
    obtido: null,
    erro: null,
  }
  if (teste.tipo === 'estrutura') return { ...resultado, passou: testeEstrutura(teste, ast) }

  // Cada teste roda o programa do zero, com a própria entrada.
  const sessao = criarSessao(limites, teste.entrada ?? [])
  const { erro, acessar } = rodarPrograma(funcao, sessao)
  if (erro) return { ...resultado, erro, obtido: teste.tipo === 'saida' ? sessao.textoSaida() : null }

  const avaliadores = {
    saida: () => testeSaida(teste, sessao),
    funcao: () => testeFuncao(teste, sessao, acessar),
    variavel: () => testeVariavel(teste, acessar),
    js: () => testeJs(teste, sessao, acessar),
  }
  const avaliar = avaliadores[teste.tipo]
  if (!avaliar) throw new Error(`tipo de teste desconhecido: ${teste.tipo}`)
  return { ...resultado, ...avaliar() }
}

// --- Ponto de entrada ------------------------------------------------------

/**
 * @param {string} codigo
 * @param {{entrada?: string[], testes?: object[], limites: {passos: number, segundos: number, saida: number}}} opcoes
 */
export function executar(codigo, { entrada = [], testes = [], limites }) {
  const inicio = performance.now()
  const { funcao, ast, erro } = compilar(codigo)
  const resposta = { console: '', erro: erro ?? null, testes: [], passos: 0 }

  if (funcao) {
    const sessao = criarSessao(limites, entrada)
    resposta.erro = rodarPrograma(funcao, sessao).erro
    resposta.console = sessao.textoConsole()
    resposta.passos = sessao.passos
    resposta.testes = testes.map((teste) => rodarTeste(teste, funcao, ast, limites))
  }

  resposta.ms = Math.round(performance.now() - inicio)
  return resposta
}
