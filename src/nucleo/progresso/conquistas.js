/*
 * Conquistas (badges em pixel art). Cada uma tem uma regra pura sobre o estado
 * do progresso e o contexto do conteúdo (para saber, por exemplo, quantas
 * lições existem em um nível).
 */

const licoesConcluidas = (estado) => Object.values(estado.licoes).filter((l) => l.concluidaEm)

export const CONQUISTAS = [
  {
    id: 'primeiro-passo',
    titulo: 'Primeiro passo',
    descricao: 'Concluir a primeira lição.',
    sprite: 'medalha',
    verificar: (estado) => licoesConcluidas(estado).length >= 1,
  },
  {
    id: 'de-primeira',
    titulo: 'De primeira',
    descricao: 'Passar em um exercício na primeira tentativa.',
    sprite: 'raio',
    verificar: (estado) => licoesConcluidas(estado).some((l) => l.dePrimeira),
  },
  {
    id: 'sem-dicas',
    titulo: 'Por conta própria',
    descricao: 'Concluir 5 exercícios sem abrir dicas nem a solução.',
    sprite: 'lampada',
    verificar: (estado) => licoesConcluidas(estado).filter((l) => l.semDicas).length >= 5,
  },
  {
    id: 'dez-licoes',
    titulo: 'Dez de dez',
    descricao: 'Concluir 10 lições.',
    sprite: 'pilha',
    verificar: (estado) => licoesConcluidas(estado).length >= 10,
  },
  {
    id: 'sequencia-3',
    titulo: 'Esquentando',
    descricao: 'Estudar 3 dias seguidos.',
    sprite: 'chama',
    verificar: (estado) => estado.sequencia.melhor >= 3,
  },
  {
    id: 'sequencia-7',
    titulo: 'Semana em chamas',
    descricao: 'Estudar 7 dias seguidos.',
    sprite: 'chama',
    verificar: (estado) => estado.sequencia.melhor >= 7,
  },
  {
    id: 'nivel-completo',
    titulo: 'Nível zerado',
    descricao: 'Concluir todas as lições de um nível.',
    sprite: 'trofeu',
    verificar: (estado, contexto) =>
      contexto.niveis.some(
        (nivel) => nivel.licoes.length > 0 && nivel.licoes.every((id) => estado.licoes[id]?.concluidaEm),
      ),
  },
  {
    id: 'robo-primeira',
    titulo: 'Bit em movimento',
    descricao: 'Concluir a primeira fase dos Desafios do Robô.',
    sprite: 'chave',
    verificar: (estado) => Object.values(estado.fases).some((f) => f.concluidaEm),
  },
  {
    id: 'robo-todas',
    titulo: 'Mestre dos labirintos',
    descricao: 'Concluir todas as fases dos Desafios do Robô.',
    sprite: 'nivelEngrenagem',
    verificar: (estado, contexto) =>
      contexto.fases.length > 0 && contexto.fases.every((id) => estado.fases[id]?.concluidaEm),
  },
  {
    id: 'xp-500',
    titulo: 'Quinhentos',
    descricao: 'Juntar 500 XP.',
    sprite: 'nivelEstrela',
    verificar: (estado) => estado.xp >= 500,
  },
]

/**
 * Concede as conquistas cuja regra passou a valer.
 * @returns {{estado: object, novas: object[]}}
 */
export function avaliarConquistas(estado, contexto, agora) {
  const novas = CONQUISTAS.filter((c) => !estado.conquistas[c.id] && c.verificar(estado, contexto))
  if (!novas.length) return { estado, novas }
  const conquistas = { ...estado.conquistas }
  for (const conquista of novas) conquistas[conquista.id] = agora.toISOString()
  return { estado: { ...estado, conquistas }, novas }
}
