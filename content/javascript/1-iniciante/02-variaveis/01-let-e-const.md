---
titulo: let e const
xp: 15
exercicio:
  enunciado: |
    Crie uma **constante** `nome` com o texto `"Bit"` e uma **variável** `idade` (com `let`) com o
    número `3`. Depois mostre, usando as duas:

    ```text
    Bit tem 3 anos
    ```
  codigo_inicial: |
    // crie nome (const) e idade (let) aqui

    console.log("Bit tem 3 anos")
  testes:
    - tipo: variavel
      nome: nome vale "Bit"
      variavel: nome
      esperado: Bit
    - tipo: variavel
      nome: idade vale 3
      variavel: idade
      esperado: 3
    - tipo: saida
      nome: Mostra "Bit tem 3 anos"
      esperado: Bit tem 3 anos
    - tipo: estrutura
      nome: Usa const para nome e let para idade, sem var
      usa: ["VariableDeclaration:const", "VariableDeclaration:let"]
      nao_usa: ["VariableDeclaration:var"]
      max_chamadas: { console.log: 1 }
      mensagem: Crie as variáveis com const e let e use os nomes delas dentro do console.log.
  dicas:
    - "Uma constante é criada com `const nome = valor`."
    - "Uma variável que pode mudar é criada com `let idade = 3`."
    - "No `console.log`, use os nomes sem aspas: `console.log(nome, \"tem\", idade, \"anos\")`."
  solucao: |
    const nome = "Bit"
    let idade = 3

    console.log(nome, "tem", idade, "anos")
  explicacao_solucao: |
    Sem aspas, `nome` e `idade` são **nomes de variáveis**: o `console.log` mostra o valor guardado em
    cada uma. Com aspas, `"nome"` seria só o texto "nome".

    O nome de uma pessoa não muda durante o programa, então `const` combina com ele. A idade pode mudar
    (aniversário!), então `let`.
---
Uma **variável** é um nome que guarda um valor. Em JavaScript, você cria variáveis de dois jeitos:

```javascript
const pi = 3.14       // const: o valor nunca muda
let pontos = 0        // let: o valor pode mudar depois
pontos = 10           // ok
console.log(pi, pontos)
```

```text
3.14 10
```

Tentar mudar uma `const` dá erro:

```javascript
const pi = 3.14
pi = 3   // TypeError: Assignment to constant variable.
```

A regra prática: **use `const` sempre que puder** e `let` só quando o valor precisar mudar.

> Em códigos antigos você vai ver `var`. Ele funciona, mas tem regras confusas. Prefira `let` e `const`.

Nomes de variáveis não podem ter espaços nem começar com número. Em JavaScript, nomes compostos
costumam juntar as palavras com maiúsculas: `idadeDoAluno`, `precoTotal` (o famoso *camelCase*).
