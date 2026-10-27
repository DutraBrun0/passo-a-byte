import { Layout } from './layout/Layout.jsx'
import { Inicio } from './paginas/Inicio.jsx'
import { NaoEncontrada } from './paginas/NaoEncontrada.jsx'
import { PaginaLicao } from './paginas/licao/PaginaLicao.jsx'

export const rotas = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Inicio /> },
      { path: ':linguagem/licao/:licaoId', element: <PaginaLicao /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
]
