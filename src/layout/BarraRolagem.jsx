import { useEffect, useRef } from 'react'
import { useNavigation } from 'react-router'

/*
 * Faixa laranja no topo da tela: enche conforme a página rola e, enquanto uma
 * rota sob demanda carrega depois de um clique, pisca de ponta a ponta.
 */
export function BarraRolagem() {
  const barra = useRef(null)
  const carregando = useNavigation().state === 'loading'

  useEffect(() => {
    let quadro = 0
    const atualizar = () => {
      quadro = 0
      const total = document.documentElement.scrollHeight - window.innerHeight
      const fracao = total > 0 ? Math.min(window.scrollY / total, 1) : 0
      barra.current?.style.setProperty('--fracao', String(fracao))
    }
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar)
    }
    atualizar()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-4" aria-hidden="true">
      <div
        ref={barra}
        className={`h-full origin-left bg-signal-orange transition-transform duration-150 ease-out ${
          carregando ? 'animate-pisca' : ''
        }`}
        style={{ transform: carregando ? 'scaleX(1)' : 'scaleX(var(--fracao, 0))' }}
      />
    </div>
  )
}
