import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import '@fontsource/jersey-10'
import '@fontsource-variable/manrope'
import './index.css'
import { rotas } from './rotas.jsx'

const router = createBrowserRouter(rotas)

// Em produção, o service worker guarda o Pyodide para as próximas visitas.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
