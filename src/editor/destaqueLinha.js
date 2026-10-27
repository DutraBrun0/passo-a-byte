import { StateEffect, StateField } from '@codemirror/state'
import { Decoration, EditorView } from '@codemirror/view'

/*
 * Destaque de linhas inteiras controlado de fora do editor:
 * "atual" (linha que o robô está executando) e "erro" (linha do último erro).
 */
export const definirDestaques = StateEffect.define()

const DECORACOES = {
  atual: Decoration.line({ class: 'cm-linha-atual' }),
  erro: Decoration.line({ class: 'cm-linha-erro' }),
}

function construir(doc, destaques) {
  const intervalos = []
  for (const [tipo, numero] of Object.entries(destaques)) {
    if (numero && numero >= 1 && numero <= doc.lines) {
      intervalos.push(DECORACOES[tipo].range(doc.line(numero).from))
    }
  }
  intervalos.sort((a, b) => a.from - b.from)
  return Decoration.set(intervalos)
}

export const campoDestaques = StateField.define({
  create: () => ({ destaques: {}, decoracoes: Decoration.none }),
  update(valor, transacao) {
    let { destaques } = valor
    for (const efeito of transacao.effects) {
      if (efeito.is(definirDestaques)) destaques = efeito.value
    }
    // Editar o código apaga o destaque de erro: ele se referia ao código antigo.
    if (transacao.docChanged && destaques.erro) destaques = { ...destaques, erro: null }
    if (destaques === valor.destaques && !transacao.docChanged) return valor
    return { destaques, decoracoes: construir(transacao.state.doc, destaques) }
  },
  provide: (campo) => EditorView.decorations.from(campo, (valor) => valor.decoracoes),
})

/** Rola até a linha destacada se ela estiver fora da área visível. */
export function rolarParaLinha(view, numero) {
  if (!numero || numero > view.state.doc.lines) return
  const { from } = view.state.doc.line(numero)
  view.dispatch({ effects: EditorView.scrollIntoView(from, { y: 'nearest' }) })
}
