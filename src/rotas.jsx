import { Layout } from './layout/Layout.jsx'
import { Inicio } from './paginas/Inicio.jsx'
import { NaoEncontrada } from './paginas/NaoEncontrada.jsx'
import { PaginaLicao } from './paginas/licao/PaginaLicao.jsx'
import { PaginaProgresso } from './paginas/progresso/PaginaProgresso.jsx'
import { PaginaTrilha } from './paginas/trilha/PaginaTrilha.jsx'

export const rotas = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Inicio /> },
      { path: ':linguagem/trilha', element: <PaginaTrilha /> },
      { path: ':linguagem/licao/:licaoId', element: <PaginaLicao /> },
      { path: 'progresso', element: <PaginaProgresso /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
]
