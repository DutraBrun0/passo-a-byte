/*
 * Tradução dos erros do Python para português amigável.
 * Cada regra olha o tipo do erro e, quando precisa, a mensagem original do
 * CPython (que é estável entre versões). O texto original sempre acompanha a
 * explicação, porque aprender a ler a mensagem real também faz parte.
 */

const nomeEntreAspas = (mensagem) => mensagem.match(/'([^']+)'/)?.[1]

const REGRAS = [
  // --- Limites do executor ---
  {
    tipo: 'LimiteDePassos',
    titulo: 'Seu programa não terminou',
    explicacao: () =>
      'O código executou linhas demais e foi interrompido. Provavelmente há um laço que nunca para: confira se a condição do while muda em algum momento.',
  },
  {
    tipo: 'LimiteDeTempo',
    titulo: 'Seu programa demorou demais',
    explicacao: () =>
      'A execução passou do tempo limite. Procure um laço que nunca termina ou um cálculo grande demais.',
  },
  {
    tipo: 'LimiteDeSaida',
    titulo: 'Texto demais na saída',
    explicacao: () => 'O programa imprimiu muita coisa e foi interrompido. Talvez um print esteja dentro de um laço infinito.',
  },
  {
    tipo: 'TempoEsgotado',
    titulo: 'O Python travou e foi reiniciado',
    explicacao: () =>
      'A execução não respondeu a tempo e o interpretador foi reiniciado. Isso acontece com cálculos gigantes numa única linha, como sum(range(10**12)).',
  },

  // --- Sintaxe ---
  {
    tipo: 'IndentationError',
    titulo: 'Problema de indentação',
    explicacao: (m) =>
      /expected an indented block/.test(m)
        ? 'Depois de uma linha que termina com dois-pontos (if, for, def...), a próxima linha precisa estar recuada com 4 espaços.'
        : /unexpected indent/.test(m)
          ? 'Esta linha está recuada sem motivo. Só recue depois de uma linha que termina com dois-pontos.'
          : 'Os espaços no começo das linhas não batem. Use sempre 4 espaços por nível de recuo.',
  },
  {
    tipo: 'TabError',
    titulo: 'Tabs e espaços misturados',
    explicacao: () => 'Use só espaços para recuar o código (4 por nível), sem misturar com a tecla Tab.',
  },
  {
    tipo: 'SyntaxError',
    titulo: 'O Python não entendeu esta linha',
    explicacao: (m) => {
      if (/expected ':'/.test(m)) return 'Faltou o dois-pontos (:) no fim da linha. Linhas com if, else, for, while e def terminam com ":".'
      if (/was never closed/.test(m)) return 'Um parêntese, colchete ou chave foi aberto e não foi fechado.'
      if (/unmatched/.test(m)) return 'Há um parêntese, colchete ou chave fechando sem ter sido aberto.'
      if (/unterminated string|unterminated triple-quoted/.test(m)) return 'Um texto começou com aspas e não terminou. Confira se as aspas de abertura e de fechamento são iguais.'
      if (/Missing parentheses in call to 'print'/.test(m)) return 'No Python 3, print é uma função: escreva print("texto"), com parênteses.'
      if (/forgot a comma/.test(m)) return 'Parece que faltou uma vírgula entre dois valores.'
      if (/cannot assign to|cannot be assigned/.test(m)) return 'O lado esquerdo do = precisa ser um nome de variável. Para comparar, use ==.'
      if (/invalid decimal literal/.test(m)) return 'Nomes de variáveis não podem começar com número, e números não podem ter letras grudadas.'
      if (/'(?:else|elif)' must|invalid syntax/.test(m) && /else|elif/.test(m)) return 'Este else/elif precisa vir logo depois de um bloco if, com o mesmo recuo.'
      return 'A sintaxe desta linha não segue as regras do Python. Confira parênteses, aspas, dois-pontos e vírgulas.'
    },
  },

  // --- Execução ---
  {
    tipo: 'NameError',
    titulo: 'Nome não encontrado',
    explicacao: (m) => {
      const nome = nomeEntreAspas(m)
      if (['open', 'eval', 'exec', 'compile'].includes(nome)) return `A função ${nome}() está desativada aqui por segurança.`
      const sugestao = m.match(/Did you mean: '([^']+)'/)?.[1]
      return (
        `Você usou "${nome}", mas o Python não conhece esse nome. Confira se escreveu certo e se a variável foi criada antes desta linha.` +
        (sugestao ? ` Você quis dizer "${sugestao}"?` : '') +
        (nome && /^[a-zà-ú]+$/i.test(nome) && !sugestao ? ' Se era um texto, coloque entre aspas.' : '')
      )
    },
  },
  {
    tipo: 'UnboundLocalError',
    titulo: 'Variável usada antes de receber valor',
    explicacao: (m) =>
      `A variável "${nomeEntreAspas(m)}" foi usada dentro da função antes de receber um valor ali dentro.`,
  },
  {
    tipo: 'TypeError',
    titulo: 'Tipos que não combinam',
    explicacao: (m) => {
      if (/can only concatenate str/.test(m) || /unsupported operand type\(s\) for \+: '(int|float)' and 'str'/.test(m))
        return 'Você tentou juntar texto com número usando +. Converta o número com str(numero) ou use uma f-string: f"Idade: {idade}".'
      if (/unsupported operand type/.test(m)) return 'Esta operação não funciona com esses tipos de valor. Confira se algum deles é texto (str) quando deveria ser número; use int() ou float() para converter.'
      if (/'(\w+)' object is not callable/.test(m)) return `Você usou parênteses depois de algo que não é uma função (${nomeEntreAspas(m)}). Talvez uma variável tenha o mesmo nome de uma função.`
      if (/missing \d+ required positional argument/.test(m)) return 'A função foi chamada com menos valores do que precisa. Confira quantos parâmetros ela tem.'
      if (/takes \d+ positional arguments? but \d+ (were|was) given/.test(m)) return 'A função foi chamada com mais valores do que aceita. Confira quantos parâmetros ela tem.'
      if (/'NoneType' object/.test(m)) return 'Um valor está None (vazio). Muitas vezes é uma função que esqueceu o return.'
      if (/object is not subscriptable/.test(m)) return 'Você usou colchetes [ ] em um valor que não é lista, texto nem dicionário.'
      if (/object is not iterable/.test(m)) return 'O for precisa de algo que possa ser percorrido, como uma lista, um texto ou range(n).'
      if (/does not support item assignment/.test(m)) return 'Esse valor não pode ser alterado por posição. Textos e tuplas são imutáveis: crie um novo valor em vez de modificar.'
      if (/has no len\(\)/.test(m)) return 'len() só funciona com coleções e textos, não com números.'
      if (/'<|>' not supported/.test(m)) return 'Não dá para comparar esses tipos com < ou >. Talvez um dos valores seja texto: converta com int() ou float().'
      return 'Uma operação recebeu um valor de tipo inesperado.'
    },
  },
  {
    tipo: 'ValueError',
    titulo: 'Valor inválido',
    explicacao: (m) => {
      if (/invalid literal for int\(\)/.test(m)) return `int() só converte textos que são números inteiros, e recebeu ${m.split(': ').pop()}. Para números com vírgula, use float().`
      if (/could not convert string to float/.test(m)) return 'float() não conseguiu converter este texto em número. Use ponto como separador decimal: 3.5, e não 3,5.'
      if (/too many values to unpack|not enough values to unpack/.test(m)) return 'A quantidade de variáveis à esquerda do = não bate com a quantidade de valores à direita.'
      return 'A função recebeu um valor do tipo certo, mas com conteúdo inválido.'
    },
  },
  {
    tipo: 'ZeroDivisionError',
    titulo: 'Divisão por zero',
    explicacao: () => 'Nenhum número pode ser dividido por zero. Confira o divisor antes de dividir, por exemplo com um if.',
  },
  {
    tipo: 'IndexError',
    titulo: 'Posição fora da lista',
    explicacao: () =>
      'Você pediu uma posição que não existe. Lembre que a contagem começa em 0: numa lista com 3 itens, as posições são 0, 1 e 2.',
  },
  {
    tipo: 'KeyError',
    titulo: 'Chave não encontrada',
    explicacao: (m) => `O dicionário não tem a chave ${m}. Use "chave in dicionario" para testar ou dicionario.get(chave).`,
  },
  {
    tipo: 'AttributeError',
    titulo: 'Atributo ou método inexistente',
    explicacao: (m) => {
      const [, tipo, atributo] = m.match(/'(\w+)' object has no attribute '(\w+)'/) ?? []
      return tipo
        ? `Valores do tipo ${tipo} não têm "${atributo}". Confira a grafia ou se o valor é do tipo que você imagina.`
        : 'Esse valor não tem o atributo ou método que você tentou usar.'
    },
  },
  {
    tipo: 'RecursionError',
    titulo: 'Recursão sem fim',
    explicacao: () => 'A função chamou a si mesma vezes demais. Confira se existe um caso base que encerra a recursão.',
  },
  {
    tipo: 'EOFError',
    titulo: 'Faltou entrada',
    explicacao: () => 'O programa chamou input() mais vezes do que há dados de entrada neste exercício.',
  },
  {
    tipo: 'ImportError',
    titulo: 'Módulo indisponível',
    explicacao: (m) =>
      `O módulo ${nomeEntreAspas(m) ?? ''} não está liberado aqui. Por segurança, só módulos da biblioteca padrão usados nas lições (math, random, datetime, collections...) podem ser importados.`,
  },
  {
    tipo: 'AssertionError',
    titulo: 'Um assert falhou',
    explicacao: (m) => (m ? `A condição testada era falsa: ${m}` : 'A condição de um assert era falsa.'),
  },
]

REGRAS.push({ ...REGRAS.find((r) => r.tipo === 'ImportError'), tipo: 'ModuleNotFoundError' })

const POR_TIPO = new Map(REGRAS.map((regra) => [regra.tipo, regra]))

/**
 * @param {{tipo: string, mensagem: string, linha?: number, coluna?: number}} erro bruto do executor
 * @returns {{tipo, titulo, explicacao, original, linha, coluna}}
 */
export function traduzirErroPython(erro) {
  if (!erro) return null
  const mensagem = erro.mensagem ?? ''
  const regra = POR_TIPO.get(erro.tipo)
  const original = mensagem ? `${erro.tipo}: ${mensagem}` : erro.tipo
  return {
    tipo: erro.tipo,
    titulo: regra?.titulo ?? `Erro: ${erro.tipo}`,
    explicacao: regra ? regra.explicacao(mensagem) : 'O Python encontrou um erro ao executar o código. Leia a mensagem original abaixo.',
    original,
    linha: erro.linha ?? null,
    coluna: erro.coluna ?? null,
  }
}
