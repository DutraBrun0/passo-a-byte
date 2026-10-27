/*
 * Service worker mínimo: guarda o Pyodide (~12 MB) no Cache Storage na
 * primeira visita e serve dele nas próximas (cache-first). É seguro porque
 * o caminho tem a versão (/pyodide/<versão>/...): uma atualização muda a URL.
 * O resto do site segue o cache HTTP normal.
 */
const CACHE = 'passo-a-byte-pyodide'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (evento) => evento.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (evento) => {
  const url = new URL(evento.request.url)
  if (evento.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.includes('/pyodide/')) {
    return
  }
  evento.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const salvo = await cache.match(evento.request)
      if (salvo) return salvo
      const resposta = await fetch(evento.request)
      if (resposta.ok) cache.put(evento.request, resposta.clone())
      return resposta
    }),
  )
})
