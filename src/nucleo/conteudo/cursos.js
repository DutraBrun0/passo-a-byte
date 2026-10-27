import { montarCursos } from './montarCurso.js'

// Todo o conteúdo de todas as linguagens. Uma pasta nova em content/ aparece aqui sozinha.
export const cursos = montarCursos({
  niveis: import.meta.glob('/content/*/*/nivel.json', { eager: true, import: 'default' }),
  modulos: import.meta.glob('/content/*/*/*/modulo.json', { eager: true, import: 'default' }),
  licoes: import.meta.glob('/content/*/*/*/*.md', { eager: true, import: 'default' }),
  fases: import.meta.glob('/content/*/robo/*.md', { eager: true, import: 'default' }),
})

export function obterCurso(linguagem) {
  return cursos.get(linguagem) ?? null
}
