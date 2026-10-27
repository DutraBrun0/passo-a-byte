import { Layout } from './layout/Layout.jsx'
import { Inicio } from './paginas/Inicio.jsx'
import { NaoEncontrada } from './paginas/NaoEncontrada.jsx'

export const rotas = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Inicio /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
]
