import { Botao } from '../design-system/componentes/Botao.jsx'
import { Titulo } from '../design-system/componentes/Titulo.jsx'
import { Nuvens } from '../design-system/sprites/Nuvens.jsx'
import { PixelSprite } from '../design-system/sprites/PixelSprite.jsx'

export function NaoEncontrada() {
  return (
    <section className="relative isolate overflow-hidden px-16 py-96">
      <Nuvens />
      <div className="mx-auto flex max-w-prose flex-col items-center gap-24 text-center">
        <PixelSprite nome="robo" escala={4} rotulo="Bit, confuso" />
        <Titulo nivel={1} tamanho="heading-lg">Página não encontrada</Titulo>
        <p className="text-slate-pencil">O Bit procurou em todos os cantos do labirinto e não achou este endereço.</p>
        <Botao variante="primario" para="/" icone="seta">
          Voltar ao início
        </Botao>
      </div>
    </section>
  )
}
