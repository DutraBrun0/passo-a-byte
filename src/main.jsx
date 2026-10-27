import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import '@fontsource/jersey-10'
import '@fontsource-variable/manrope'
import './index.css'
import './linguagens/index.js'
import { rotas } from './rotas.jsx'

const router = createBrowserRouter(rotas)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
