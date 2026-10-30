---
titulo: Números, textos e booleanos
xp: 15
exercicio:
  enunciado: |
    Crie três constantes com o tipo certo:

    - `produto`: o texto `Caderno`;
    - `preco`: o número `19.9`;
    - `emEstoque`: o booleano `true`.

    Depois mostre o tipo de cada uma, nessa ordem, com `typeof`:

    ```text
    string number boolean
    ```
  codigo_inicial: |
    const produto = "Caderno"
    const preco = "19.9"
    const emEstoque = "true"

    console.log(typeof produto, typeof preco, typeof emEstoque)
  testes:
    - tipo: variavel
      nome: produto é um texto
      variavel: produto
      tipo_esperado: string
    - tipo: variavel
      nome: preco é um número
      variavel: preco
      tipo_esperado: number
    - tipo: variavel
      nome: emEstoque é um booleano
      variavel: emEstoque
      tipo_esperado: boolean
    - tipo: saida
      nome: Mostra os três tipos
      esperado: string number boolean
  dicas:
    - "Com aspas, qualquer coisa vira texto: `\"19.9\"` é uma string, não um número."
    - "Números e booleanos (`true` e `false`) são escritos **sem** aspas."
  solucao: |
    const produto = "Caderno"
    const preco = 19.9
    const emEstoque = true

    console.log(typeof produto, typeof preco, typeof emEstoque)
  explicacao_solucao: |
    As aspas são o que decide: `"19.9"` e `"true"` são textos que **parecem** número e booleano. Sem as
    aspas, viram o número 19.9 e o booleano `true` de verdade.

    Isso importa porque cada tipo se comporta de um jeito: dá para fazer conta com `19.9`, mas não com
    `"19.9"`.
---
Todo valor em JavaScript tem um **tipo**. Os três mais usados no começo:

| Tipo | Exemplos | Para quê |
|------|----------|----------|
| `number` | `42`, `3.14`, `-7` | contas |
| `string` | `"Ana"`, `'oi'` | textos |
| `boolean` | `true`, `false` | sim ou não |

Diferente de outras linguagens, JavaScript tem um tipo só para números: inteiros e decimais são todos
`number`. E o separador decimal é o **ponto**: `3.14`, nunca `3,14`.

O operador `typeof` diz o tipo de um valor:

```javascript
console.log(typeof 42)
console.log(typeof "42")
console.log(typeof false)
```

```text
number
string
boolean
```

Dois valores especiais aparecem bastante: `undefined` (algo que ainda não recebeu valor) e `null`
(vazio de propósito).
