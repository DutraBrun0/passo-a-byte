import { Outlet } from 'react-router'
import { BarraNav } from './BarraNav.jsx'
import { Rodape } from './Rodape.jsx'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only rounded-buttons bg-paper-white px-16 py-8 font-medium focus:not-sr-only focus:absolute focus:left-16 focus:top-16 focus:z-50"
      >
        Pular para o conteúdo
      </a>
      <BarraNav />
      <main id="conteudo" tabIndex={-1} className="relative isolate flex-1">
        <Outlet />
      </main>
      <Rodape />
    </div>
  )
}
