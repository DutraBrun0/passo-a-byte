import { BarraPixel } from '../design-system/componentes/BarraPixel.jsx'
import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'

const mb = (bytes) => (bytes / 1e6).toFixed(1).replace('.', ',')

function descrever(estado, nomeLinguagem) {
  switch (estado.fase) {
    case 'baixando':
      return estado.total
        ? `Baixando o ${nomeLinguagem}: ${mb(estado.carregado ?? 0)} de ${mb(estado.total)} MB`
        : `Baixando o ${nomeLinguagem}...`
    case 'iniciando':
      return `Ligando o interpretador ${nomeLinguagem}...`
    case 'erro':
      return `Não foi possível carregar o ${nomeLinguagem}. Verifique a conexão e recarregue a página.`
    default:
      return 'Preparando...'
  }
}

/**
 * Tela de carga do interpretador em pixel art. Na primeira visita o download
 * leva alguns segundos; depois ele vem do cache do navegador.
 */
export function PainelCarregamento({ estado, nomeLinguagem }) {
  const valor =
    estado.fase === 'iniciando' ? 1 : estado.fase === 'baixando' && estado.total ? estado.carregado / estado.total : null
  return (
    <div className="flex flex-col items-center gap-16 px-16 py-32 text-center" role="status" aria-live="polite">
      <div className={estado.fase === 'erro' ? '' : 'animate-flutua'}>
        <PixelSprite nome="robo" escala={4} />
      </div>
      <p className="text-body font-medium text-graphite-ink">{descrever(estado, nomeLinguagem)}</p>
      {estado.fase !== 'erro' && (
        <BarraPixel valor={valor} blocos={16} rotulo={`Carregando ${nomeLinguagem}`} className="w-full max-w-prose" />
      )}
      <p className="text-caption text-slate-pencil">
        O interpretador roda inteiro no seu navegador. Na próxima visita ele abre direto do cache.
      </p>
    </div>
  )
}
