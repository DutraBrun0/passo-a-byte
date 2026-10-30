/*
 * Tradução dos erros de JavaScript para português amigável.
 * As mensagens de sintaxe vêm do acorn (o parser usado para instrumentar o
 * código) e as de execução vêm do V8, o motor do Chrome e do Node. Outros
 * navegadores escrevem algumas mensagens de outro jeito: nesses casos a regra
 * cai na explicação geral do tipo, e a mensagem original continua visível.
 */

const nomeEntreAspas = (mensagem) => mensagem.match(/'([^']+)'/)?.[1]

const REGRAS = [
  // --- Limites do executor ---
  {
    tipo: 'LimiteDePassos',
    titulo: 'Seu programa não terminou',
    explicacao: () =>
      'O código executou instruções demais e foi interrompido. Provavelmente há um laço que nunca para: confira se a condição do while (ou do for) muda em algum momento.',
  },
  {
    tipo: 'LimiteDeTempo',
    titulo: 'Seu programa demorou demais',
    explicacao: () => 'A execução passou do tempo limite. Procure um laço que nunca termina ou um cálculo grande demais.',
  },
  {
    tipo: 'LimiteDeSaida',
    titulo: 'Texto demais na saída',
    explicacao: () =>
      'O programa mostrou muita coisa e foi interrompido. Talvez um console.log esteja dentro de um laço infinito.',
  },
  {
    tipo: 'TempoEsgotado',
    titulo: 'O JavaScript travou e foi reiniciado',
    explicacao: () =>
      'A execução não respondeu a tempo e o ambiente foi reiniciado. Isso acontece com uma única operação gigante, como criar um array com bilhões de itens.',
  },

  // --- Sintaxe (mensagens do acorn) ---
  {
    tipo: 'SyntaxError',
    titulo: 'O JavaScript não entendeu esta linha',
    explicacao: (m) => {
      if (/Unterminated string constant/.test(m)) return 'Um texto começou com aspas e não terminou na mesma linha. Confira se as aspas de abertura e de fechamento são iguais.'
      if (/Unterminated template/.test(m)) return 'Uma template string começou com crase (`) e não foi fechada.'
      if (/Identifier '([^']+)' has already been declared/.test(m)) return `A variável "${nomeEntreAspas(m)}" foi declarada duas vezes. Use let ou const só na primeira vez; depois, só o nome: ${nomeEntreAspas(m)} = novoValor.`
      if (/Assigning to rvalue/.test(m)) return 'O lado esquerdo do = precisa ser um nome de variável. Para comparar, use ===.'
      if (/Unexpected keyword 'const'|Unexpected keyword 'let'/.test(m)) return 'let e const criam variáveis; elas não podem aparecer no meio de uma expressão.'
      if (/Unexpected token/.test(m)) return 'Algo está fora do lugar nesta linha. Confira parênteses, chaves, aspas e vírgulas: tudo o que abre precisa fechar.'
      if (/Unexpected character/.test(m)) return 'Há um caractere que o JavaScript não reconhece. Talvez aspas “curvas” copiadas de outro lugar: use " ou \'.'
      if (/Invalid number|Identifier directly after number/.test(m)) return 'Nomes de variáveis não podem começar com número, e números não podem ter letras grudadas.'
      if (/'return' outside of function/.test(m)) return 'return só pode ser usado dentro de uma função.'
      return 'A sintaxe desta linha não segue as regras do JavaScript. Confira parênteses, chaves, aspas e vírgulas.'
    },
  },

  // --- Execução (mensagens do V8) ---
  {
    tipo: 'ReferenceError',
    titulo: 'Nome não encontrado',
    explicacao: (m) => {
      const nome = m.match(/^(\S+) is not defined/)?.[1]
      if (/before initialization/.test(m)) return `A variável "${nomeEntreAspas(m)}" foi usada antes da linha onde é criada com let ou const. Mova a declaração para cima.`
      if (nome === 'alert') return 'alert() mostra uma janela no navegador, que não existe aqui. Use console.log() para mostrar mensagens.'
      if (nome === 'print') return 'print é do Python. Em JavaScript, mostre mensagens com console.log().'
      if (nome === 'input') return 'input() é do Python. Em JavaScript, peça dados com prompt().'
      if (nome)
        return (
          `Você usou "${nome}", mas o JavaScript não conhece esse nome. Confira se escreveu certo (maiúsculas contam!) e se a variável foi criada com let ou const antes desta linha.` +
          (/^[a-zà-ú]+$/i.test(nome) ? ' Se era um texto, coloque entre aspas.' : '')
        )
      return 'Um nome usado no código não existe neste ponto do programa.'
    },
  },
  {
    tipo: 'TypeError',
    titulo: 'Operação com o tipo errado',
    explicacao: (m) => {
      if (/Assignment to constant variable/.test(m)) return 'Esta variável foi criada com const e não pode receber outro valor. Se ela precisa mudar, crie-a com let.'
      if (/is not a function/.test(m)) return `Você usou parênteses depois de algo que não é uma função (${m.split(' is not')[0]}). Confira a grafia: em JavaScript, maiúsculas e minúsculas fazem diferença.`
      if (/Cannot read properties of (undefined|null)/.test(m)) return `Você tentou ler "${nomeEntreAspas(m)}" de um valor ${/null/.test(m) ? 'null' : 'undefined'} (vazio). Talvez uma função tenha esquecido o return ou uma posição do array não exista.`
      if (/Cannot set properties of (undefined|null)/.test(m)) return 'Você tentou guardar algo dentro de um valor vazio (undefined ou null).'
      if (/is not iterable/.test(m)) return 'O for...of precisa de algo que possa ser percorrido, como um array ou um texto.'
      if (/is not a constructor/.test(m)) return 'new só funciona com classes e funções construtoras.'
      return 'Uma operação recebeu um valor de tipo inesperado.'
    },
  },
  {
    tipo: 'RangeError',
    titulo: 'Valor fora do permitido',
    explicacao: (m) => {
      if (/Maximum call stack size exceeded/.test(m)) return 'Uma função chamou a si mesma vezes demais. Confira se existe um caso que encerra a recursão.'
      if (/Invalid array length/.test(m)) return 'O tamanho do array precisa ser um número inteiro e positivo.'
      if (/toFixed\(\) digits/.test(m)) return 'toFixed() aceita de 0 a 100 casas decimais.'
      return 'Um número passou do limite que a operação aceita.'
    },
  },
  {
    tipo: 'EntradaVazia',
    titulo: 'Faltou entrada',
    explicacao: () => 'O programa chamou prompt() mais vezes do que há dados de entrada neste exercício.',
  },
  {
    tipo: 'AssertionError',
    titulo: 'Uma verificação falhou',
    explicacao: (m) => (m ? `A condição testada era falsa: ${m}` : 'A condição de um assert era falsa.'),
  },
  {
    tipo: 'Error',
    titulo: 'O programa lançou um erro',
    explicacao: (m) => `O próprio código usou throw para avisar de um problema${m ? `: "${m}"` : ''}.`,
  },
]

const POR_TIPO = new Map(REGRAS.map((regra) => [regra.tipo, regra]))

/**
 * @param {{tipo: string, mensagem: string, linha?: number, coluna?: number}} erro bruto do executor
 * @returns {{tipo, titulo, explicacao, original, linha, coluna}}
 */
export function traduzirErroJavaScript(erro) {
  if (!erro) return null
  const mensagem = erro.mensagem ?? ''
  const regra = POR_TIPO.get(erro.tipo)
  return {
    tipo: erro.tipo,
    titulo: regra?.titulo ?? `Erro: ${erro.tipo}`,
    explicacao: regra
      ? regra.explicacao(mensagem)
      : 'O JavaScript encontrou um erro ao executar o código. Leia a mensagem original abaixo.',
    original: mensagem ? `${erro.tipo}: ${mensagem}` : erro.tipo,
    linha: erro.linha ?? null,
    coluna: erro.coluna ?? null,
  }
}
