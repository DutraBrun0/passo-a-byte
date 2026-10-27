/*
 * Monta a árvore do curso a partir dos arquivos de content/, sem saber nada da
 * linguagem. A estrutura de pastas é o próprio índice:
 *
 *   content/<linguagem>/<NN-nivel>/nivel.json
 *   content/<linguagem>/<NN-nivel>/<NN-modulo>/modulo.json
 *   content/<linguagem>/<NN-nivel>/<NN-modulo>/<NN-licao>.md
 *
 * O prefixo numérico define a ordem; o resto do nome vira o id (slug).
 */

const PREFIXO = /^(\d+)-(.+?)(\.\w+)?$/

function segmento(nome) {
  const partes = nome.match(PREFIXO)
  if (!partes) throw new Error(`Nome sem prefixo numérico em content/: "${nome}" (use, por exemplo, 01-${nome})`)
  return { ordem: Number(partes[1]), id: partes[2] }
}

function partesDoCaminho(caminho) {
  return caminho.replace(/^.*?\/content\//, '').split('/')
}

const porOrdem = (a, b) => a.ordem - b.ordem

function cursoVazio(linguagem) {
  return { linguagem, niveis: [], licoes: new Map(), sequencia: [] }
}

/**
 * @param {{niveis: Record<string, object>, modulos: Record<string, object>, licoes: Record<string, {meta: object, corpo: string}>}} arquivos
 *        mapas caminho → conteúdo, no formato do import.meta.glob
 * @returns {Map<string, object>} um curso por linguagem
 */
export function montarCursos({ niveis = {}, modulos = {}, licoes = {} }) {
  const cursos = new Map()
  const curso = (linguagem) => {
    if (!cursos.has(linguagem)) cursos.set(linguagem, cursoVazio(linguagem))
    return cursos.get(linguagem)
  }
  const niveisPorChave = new Map()
  const modulosPorChave = new Map()

  for (const [caminho, dados] of Object.entries(niveis)) {
    const [linguagem, pastaNivel] = partesDoCaminho(caminho)
    const { ordem, id } = segmento(pastaNivel)
    const nivel = { ...dados, id, ordem, linguagem, modulos: [] }
    curso(linguagem).niveis.push(nivel)
    niveisPorChave.set(`${linguagem}/${pastaNivel}`, nivel)
  }

  for (const [caminho, dados] of Object.entries(modulos)) {
    const [linguagem, pastaNivel, pastaModulo] = partesDoCaminho(caminho)
    const nivel = niveisPorChave.get(`${linguagem}/${pastaNivel}`)
    if (!nivel) throw new Error(`${caminho}: a pasta do nível não tem nivel.json`)
    const { ordem, id } = segmento(pastaModulo)
    const modulo = { ...dados, id: `${nivel.id}/${id}`, ordem, nivelId: nivel.id, licoes: [] }
    nivel.modulos.push(modulo)
    modulosPorChave.set(`${linguagem}/${pastaNivel}/${pastaModulo}`, modulo)
  }

  for (const [caminho, { meta, corpo }] of Object.entries(licoes)) {
    const [linguagem, pastaNivel, pastaModulo, arquivo] = partesDoCaminho(caminho)
    const modulo = modulosPorChave.get(`${linguagem}/${pastaNivel}/${pastaModulo}`)
    if (!modulo) throw new Error(`${caminho}: a pasta do módulo não tem modulo.json`)
    const { ordem, id } = segmento(arquivo)
    if (curso(linguagem).licoes.has(id)) throw new Error(`${caminho}: já existe uma lição com o id "${id}"`)
    const licao = { ...meta, id, ordem, corpo, caminho, nivelId: modulo.nivelId, moduloId: modulo.id }
    modulo.licoes.push(licao)
    curso(linguagem).licoes.set(id, licao)
  }

  for (const atual of cursos.values()) {
    atual.niveis.sort(porOrdem)
    for (const nivel of atual.niveis) {
      nivel.modulos.sort(porOrdem)
      for (const modulo of nivel.modulos) modulo.licoes.sort(porOrdem)
      // Dentro de um nível, as lições formam uma trilha linear.
      const trilha = nivel.modulos.flatMap((modulo) => modulo.licoes)
      trilha.forEach((licao, i) => {
        licao.anterior = trilha[i - 1]?.id ?? null
        licao.proxima = trilha[i + 1]?.id ?? null
      })
      nivel.totalLicoes = trilha.length
      atual.sequencia.push(...trilha)
    }
  }
  return cursos
}

/** Lista problemas de conteúdo (usado nos testes e útil para quem escreve lições). */
export function validarCurso(curso, tiposDeTeste) {
  const problemas = []
  for (const licao of curso.licoes.values()) {
    const onde = licao.caminho
    if (!licao.titulo) problemas.push(`${onde}: falta "titulo"`)
    if (!licao.corpo) problemas.push(`${onde}: falta o texto da lição depois dos metadados`)
    if (!Number.isInteger(licao.xp) || licao.xp <= 0) problemas.push(`${onde}: "xp" deve ser um inteiro positivo`)
    const exercicio = licao.exercicio
    if (!exercicio) {
      problemas.push(`${onde}: falta "exercicio"`)
      continue
    }
    for (const campo of ['enunciado', 'solucao', 'explicacao_solucao']) {
      if (!exercicio[campo]) problemas.push(`${onde}: falta "exercicio.${campo}"`)
    }
    if (typeof exercicio.codigo_inicial !== 'string') problemas.push(`${onde}: falta "exercicio.codigo_inicial"`)
    if (!exercicio.dicas?.length) problemas.push(`${onde}: o exercício precisa de pelo menos uma dica`)
    if (!exercicio.testes?.length) problemas.push(`${onde}: o exercício precisa de pelo menos um teste`)
    for (const teste of exercicio.testes ?? []) {
      if (!tiposDeTeste.includes(teste.tipo)) problemas.push(`${onde}: tipo de teste desconhecido "${teste.tipo}"`)
      if (!teste.nome) problemas.push(`${onde}: todo teste precisa de "nome" (aparece para o aluno)`)
    }
  }
  return problemas
}
