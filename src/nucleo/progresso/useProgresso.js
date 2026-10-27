import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { cursos } from '../conteudo/cursos.js'
import { chave } from './regras.js'
import { avaliarConquistas } from './conquistas.js'
import { deArquivo } from './arquivo.js'
import * as regras from './regras.js'

/** O que as regras de conquista precisam saber do conteúdo (todas as linguagens). */
function contextoConquistas() {
  const todos = [...cursos.values()]
  return {
    niveis: todos.flatMap((curso) =>
      curso.niveis.map((nivel) => ({
        licoes: nivel.modulos.flatMap((m) => m.licoes.map((licao) => chave(curso.linguagem, licao.id))),
      })),
    ),
    fases: todos.flatMap((curso) => (curso.fases ?? []).map((fase) => chave(curso.linguagem, fase.id))),
  }
}

/**
 * Store do progresso, salva no localStorage. As ações delegam às funções puras
 * de regras.js e devolvem as conquistas recém-desbloqueadas, para a UI comemorar.
 */
export const useProgresso = create(
  persist(
    (set, get) => {
      const aplicar = (transformar) => {
        const agora = new Date()
        const { estado, novas } = avaliarConquistas(transformar(get().dados, agora), contextoConquistas(), agora)
        set({ dados: estado })
        return novas
      }
      return {
        dados: regras.estadoInicial(),
        salvarRascunho: (id, codigo) => set({ dados: regras.salvarRascunho(get().dados, id, codigo) }),
        revelarDica: (id, total) => set({ dados: regras.revelarDica(get().dados, id, total) }),
        marcarSolucaoVista: (id) => set({ dados: regras.marcarSolucaoVista(get().dados, id) }),
        registrarTentativa: (id, dados) => aplicar((estado, agora) => regras.registrarTentativa(estado, id, dados, agora)),
        concluirFase: (id, dados) => aplicar((estado, agora) => regras.concluirFase(estado, id, dados, agora)),
        importar: (conteudo) => set({ dados: deArquivo(conteudo) }),
        resetar: () => set({ dados: regras.estadoInicial() }),
      }
    },
    {
      name: 'passo-a-byte:progresso',
      version: regras.VERSAO_PROGRESSO,
      storage: createJSONStorage(() => localStorage),
      partialize: (estado) => ({ dados: estado.dados }),
    },
  ),
)
