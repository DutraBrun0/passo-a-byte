import { parse } from 'yaml'

/*
 * Transforma os arquivos .md de content/ em módulos JS no build:
 *   ---
 *   titulo: ...        ← metadados em YAML (frontmatter)
 *   ---
 *   # Markdown         ← corpo da lição
 * vira `export default { meta, corpo }`. O YAML é lido aqui, em Node, então
 * o parser não vai para o bundle do navegador.
 */
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

export function lerArquivoConteudo(texto, arquivo = '') {
  const partes = texto.match(FRONTMATTER)
  if (!partes) throw new Error(`${arquivo}: falta o bloco de metadados entre --- no início do arquivo`)
  return { meta: parse(partes[1]) ?? {}, corpo: partes[2].trim() }
}

export function conteudoPlugin() {
  return {
    name: 'passo-a-byte:conteudo',
    transform(texto, id) {
      const caminho = id.split('?')[0].replaceAll('\\', '/')
      if (!caminho.includes('/content/') || !caminho.endsWith('.md')) return null
      const dados = lerArquivoConteudo(texto, caminho)
      return { code: `export default ${JSON.stringify(dados)}`, map: null }
    },
  }
}
