import { useEffect, useRef } from 'react'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { bracketMatching, indentOnInput, indentUnit, syntaxHighlighting } from '@codemirror/language'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers } from '@codemirror/view'
import { classHighlighter } from '@lezer/highlight'
import { campoDestaques, definirDestaques, rolarParaLinha } from './destaqueLinha.js'
import { temaEditor } from './tema.js'

/**
 * Editor de código (CodeMirror 6). Não sabe qual é a linguagem: recebe do
 * adaptador o `suporte` (LanguageSupport) e a unidade de indentação.
 *
 * Acessibilidade: Tab indenta; para sair do editor pelo teclado, Esc e depois Tab.
 * Ctrl/Cmd+Enter chama `aoExecutar`.
 */
export function EditorCodigo({
  valor,
  aoMudar,
  aoExecutar,
  suporte,
  indentacao = '    ',
  linhaAtual = null,
  linhaErro = null,
  somenteLeitura = false,
  rotulo = 'Editor de código',
  className = '',
}) {
  const hospedeiro = useRef(null)
  const view = useRef(null)
  const callbacks = useRef({ aoMudar, aoExecutar })
  const leitura = useRef(new Compartment())

  useEffect(() => {
    callbacks.current = { aoMudar, aoExecutar }
  })

  // Cria o editor uma vez; as props seguintes são aplicadas pelos efeitos abaixo.
  useEffect(() => {
    const executarAtalho = () => {
      callbacks.current.aoExecutar?.()
      return true
    }
    const estado = EditorState.create({
      doc: valor,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        history(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        indentUnit.of(indentacao),
        EditorState.tabSize.of(indentacao.length),
        suporte(),
        syntaxHighlighting(classHighlighter),
        campoDestaques,
        temaEditor,
        leitura.current.of(EditorState.readOnly.of(somenteLeitura)),
        keymap.of([
          { key: 'Mod-Enter', run: executarAtalho },
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...historyKeymap,
          indentWithTab,
        ]),
        EditorView.contentAttributes.of({ 'aria-label': rotulo }),
        EditorView.updateListener.of((atualizacao) => {
          if (atualizacao.docChanged) callbacks.current.aoMudar?.(atualizacao.state.doc.toString())
        }),
      ],
    })
    view.current = new EditorView({ state: estado, parent: hospedeiro.current })
    return () => view.current.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- o editor é criado uma vez por linguagem
  }, [suporte, indentacao, rotulo])

  // Valor trocado de fora (restaurar código, trocar de lição).
  useEffect(() => {
    const atual = view.current.state.doc.toString()
    if (valor !== atual) {
      view.current.dispatch({ changes: { from: 0, to: atual.length, insert: valor } })
    }
  }, [valor])

  useEffect(() => {
    view.current.dispatch({ effects: leitura.current.reconfigure(EditorState.readOnly.of(somenteLeitura)) })
  }, [somenteLeitura])

  useEffect(() => {
    view.current.dispatch({ effects: definirDestaques.of({ atual: linhaAtual, erro: linhaErro }) })
    rolarParaLinha(view.current, linhaAtual ?? linhaErro)
  }, [linhaAtual, linhaErro])

  return <div ref={hospedeiro} className={`overflow-hidden ${className}`} />
}
