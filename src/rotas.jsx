import { Layout } from './layout/Layout.jsx'
import { Inicio } from './paginas/Inicio.jsx'
import { NaoEncontrada } from './paginas/NaoEncontrada.jsx'

/*
 * Páginas com editor e interpretador são carregadas sob demanda, junto com o
 * registro das linguagens (que traz os adaptadores e o CodeMirror). Assim a
 * página inicial abre sem baixar nada disso.
 */
const sobDemanda = (carregar, nome) => async () => {
  const [modulo] = await Promise.all([carregar(), import('./linguagens/index.js')])
  return { Component: modulo[nome] }
}

export const rotas = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Inicio /> },
      { path: ':linguagem/trilha', lazy: sobDemanda(() => import('./paginas/trilha/PaginaTrilha.jsx'), 'PaginaTrilha') },
      {
        path: ':linguagem/licao/:licaoId',
        lazy: sobDemanda(() => import('./paginas/licao/PaginaLicao.jsx'), 'PaginaLicao'),
      },
      { path: ':linguagem/robo', lazy: sobDemanda(() => import('./paginas/robo/PaginaFases.jsx'), 'PaginaFases') },
      {
        path: ':linguagem/robo/:faseId',
        lazy: sobDemanda(() => import('./paginas/robo/PaginaFase.jsx'), 'PaginaFase'),
      },
      { path: 'progresso', lazy: sobDemanda(() => import('./paginas/progresso/PaginaProgresso.jsx'), 'PaginaProgresso') },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
]
