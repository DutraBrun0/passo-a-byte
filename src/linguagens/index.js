/*
 * Ponto único onde as linguagens entram no app. Para adicionar uma nova:
 * crie src/linguagens/<id>/ com um adaptador que cumpra nucleo/linguagens/contrato.js,
 * registre-o aqui e escreva o conteúdo em content/<id>/.
 *
 * Este módulo é carregado sob demanda pelas rotas (ver rotas.jsx).
 */
import { registrarLinguagem } from '../nucleo/linguagens/registro.js'
import { javascript } from './javascript/index.js'
import { python } from './python/index.js'

registrarLinguagem(python)
registrarLinguagem(javascript)
