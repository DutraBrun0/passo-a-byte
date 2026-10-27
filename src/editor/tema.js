import { EditorView } from '@codemirror/view'

/*
 * Tema do CodeMirror feito só com os tokens do DESIGN.md (var(--color-*)).
 * As cores de sintaxe ficam em index.css (classes .tok-*), compartilhadas com
 * os blocos de código estáticos das lições.
 */
export const temaEditor = EditorView.theme({
  '&': {
    backgroundColor: 'var(--color-paper-white)',
    color: 'var(--color-graphite-ink)',
    fontSize: 'var(--text-body-sm)',
    height: '100%',
  },
  '.cm-scroller': {
    fontFamily: 'var(--font-code)',
    lineHeight: 'var(--leading-subheading)',
  },
  '.cm-content': {
    padding: 'var(--spacing-8) 0',
    caretColor: 'var(--color-signal-orange)',
  },
  '&.cm-focused': { outline: 'none' },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: 'var(--color-signal-orange)',
    borderLeftWidth: '2px',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--color-app-window)',
    color: 'var(--color-slate-pencil)',
    border: 'none',
    borderRight: '1px solid var(--color-cloud-mist)',
  },
  '.cm-lineNumbers .cm-gutterElement': { padding: '0 var(--spacing-8) 0 var(--spacing-16)' },
  '.cm-activeLine': { backgroundColor: 'transparent' },
  '&.cm-focused .cm-activeLine': { backgroundColor: 'var(--color-app-window)' },
  '.cm-activeLineGutter': { backgroundColor: 'var(--color-cloud-mist)', color: 'var(--color-graphite-ink)' },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, ::selection': {
    backgroundColor: 'var(--color-cloud-shade)',
  },
  '.cm-matchingBracket': {
    backgroundColor: 'var(--color-cloud-mist)',
    outline: '1px solid var(--color-signal-orange)',
  },
  // Linha em execução (robô) e linha do erro.
  '.cm-linha-atual': {
    backgroundColor: 'var(--color-cloud-mist)',
    boxShadow: 'inset 3px 0 0 var(--color-signal-orange)',
  },
  '.cm-linha-erro': {
    backgroundColor: 'var(--color-blush-shadow)',
    boxShadow: 'inset 3px 0 0 var(--color-ember-crust)',
  },
  '.cm-placeholder': { color: 'var(--color-ash-mist)' },
})
