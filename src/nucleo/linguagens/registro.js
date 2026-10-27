import { validarAdaptador } from './contrato.js'

const adaptadores = new Map()

export function registrarLinguagem(adaptador) {
  validarAdaptador(adaptador)
  if (adaptadores.has(adaptador.id)) throw new Error(`Linguagem já registrada: ${adaptador.id}`)
  adaptadores.set(adaptador.id, adaptador)
}

export function obterLinguagem(id) {
  return adaptadores.get(id) ?? null
}

export function listarLinguagens() {
  return [...adaptadores.values()]
}
