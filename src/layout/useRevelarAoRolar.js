import { useEffect } from 'react'

// O que entra animado: cada item de lista e o que pedir com data-revelar. Texto de lição e editor ficam parados.
const SELETOR = 'li, [data-revelar]'
const IGNORAR = '.prosa, .cm-editor, nav, [data-sem-revelar]'
const ATRASO_POR_IRMAO = 60
const ATRASO_MAXIMO = 360

/**
 * Faz o conteúdo de `raiz` surgir conforme entra na tela. Um MutationObserver
 * pega o que aparece depois (rotas sob demanda, listas que carregam).
 */
export function useRevelarAoRolar(raiz) {
  useEffect(() => {
    const elemento = raiz.current
    if (!elemento || !('IntersectionObserver' in window)) return

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue
          entrada.target.setAttribute('data-revelado', '')
          observador.unobserve(entrada.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    const preparar = (alvo) => {
      if ('revelarPronto' in alvo.dataset || alvo.closest(IGNORAR)) return
      alvo.dataset.revelarPronto = ''
      alvo.setAttribute('data-revelar', '')
      const indice = alvo.parentElement ? [...alvo.parentElement.children].indexOf(alvo) : 0
      alvo.style.setProperty('--atraso', `${Math.min(indice * ATRASO_POR_IRMAO, ATRASO_MAXIMO)}ms`)
      observador.observe(alvo)
    }

    const varrer = (no) => {
      if (no.nodeType !== Node.ELEMENT_NODE) return
      if (no.matches(SELETOR)) preparar(no)
      no.querySelectorAll(SELETOR).forEach(preparar)
    }

    varrer(elemento)
    const mutacoes = new MutationObserver((lista) => {
      for (const mutacao of lista) mutacao.addedNodes.forEach(varrer)
    })
    mutacoes.observe(elemento, { childList: true, subtree: true })

    return () => {
      mutacoes.disconnect()
      observador.disconnect()
    }
  }, [raiz])
}
