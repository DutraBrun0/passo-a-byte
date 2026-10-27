import { useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { BarraNav } from './BarraNav.jsx'
import { BarraRolagem } from './BarraRolagem.jsx'
import { Rodape } from './Rodape.jsx'
import { useRevelarAoRolar } from './useRevelarAoRolar.js'

export function Layout() {
  const { pathname } = useLocation()
  const conteudo = useRef(null)
  useRevelarAoRolar(conteudo)

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only rounded-buttons bg-paper-white px-16 py-8 font-medium focus:not-sr-only focus:absolute focus:left-16 focus:top-16 focus:z-50"
      >
        Pular para o conteúdo
      </a>
      <BarraRolagem />
      <BarraNav />
      <main id="conteudo" ref={conteudo} tabIndex={-1} className="relative isolate flex-1">
        {/* A chave reinicia a animação de entrada a cada troca de página */}
        <div key={pathname} className="animate-entra">
          <Outlet />
        </div>
      </main>
      <Rodape />
    </div>
  )
}
