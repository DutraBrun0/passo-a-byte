// Constantes sobre as linguagens que a interface usa sem precisar carregar nenhum adaptador.

/** Linguagem aberta pela página inicial e pela navegação. */
export const LINGUAGEM_PADRAO = 'python'

/** Linguagens com trilha, na ordem em que aparecem nos seletores. */
export const LINGUAGENS = [
  { id: 'python', nome: 'Python' },
  { id: 'javascript', nome: 'JavaScript' },
]

/** Linguagens planejadas, exibidas só como "Em breve" (sem funcionalidade). */
export const LINGUAGENS_PLANEJADAS = ['SQL', 'C', 'Java']

/** Linguagem da página atual, pelo começo do caminho (/javascript/trilha → 'javascript'). */
export function linguagemDoCaminho(caminho) {
  const id = caminho.split('/')[1]
  return LINGUAGENS.some((linguagem) => linguagem.id === id) ? id : LINGUAGEM_PADRAO
}
