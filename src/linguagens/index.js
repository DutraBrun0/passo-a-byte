/*
 * Ponto único onde as linguagens entram no app. Para adicionar uma nova:
 * crie src/linguagens/<id>/ com um adaptador que cumpra nucleo/linguagens/contrato.js,
 * registre-o aqui e escreva o conteúdo em content/<id>/.
 */
import { registrarLinguagem } from '../nucleo/linguagens/registro.js'
import { python } from './python/index.js'

registrarLinguagem(python)

/** Linguagens planejadas, exibidas só como "Em breve" (sem funcionalidade). */
export const LINGUAGENS_PLANEJADAS = ['JavaScript', 'SQL', 'C', 'Java']
