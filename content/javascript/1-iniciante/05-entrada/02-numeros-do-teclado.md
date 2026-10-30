---
titulo: Números vindos do teclado
xp: 20
exercicio:
  enunciado: |
    Leia o ano de nascimento da pessoa e mostre quantos anos ela terá em 2030. Para a entrada `2010`:

    ```text
    Em 2030 você terá 20 anos.
    ```
  codigo_inicial: |
    const ano = prompt("Ano de nascimento: ")
    console.log(`Em 2030 você terá ${2030 + ano} anos.`)
  entrada: ["2010"]
  testes:
    - tipo: saida
      nome: Nascido em 2010
      entrada: ["2010"]
      esperado: Em 2030 você terá 20 anos.
    - tipo: saida
      nome: Nascido em 1995
      entrada: ["1995"]
      esperado: Em 2030 você terá 35 anos.
    - tipo: saida
      nome: Nascido em 2030
      entrada: ["2030"]
      esperado: Em 2030 você terá 0 anos.
  dicas:
    - "Rode o código inicial: `2030 + \"2010\"` junta os textos e dá `20302010`."
    - "Converta a resposta logo ao ler: `Number(prompt(\"...\"))`."
    - "A idade é `2030 - ano`, e não `2030 + ano`."
  solucao: |
    const ano = Number(prompt("Ano de nascimento: "))
    console.log(`Em 2030 você terá ${2030 - ano} anos.`)
  explicacao_solucao: |
    O `prompt` devolve o texto `"2010"`. Com `Number()` em volta, ele vira o número `2010` e a conta
    funciona. Converter logo na leitura é um bom hábito: daí para a frente a variável já tem o tipo certo.
---
O `prompt` sempre devolve **texto**. Se você fizer conta direto com ele, o JavaScript pode juntar em vez
de somar:

```javascript
const quantidade = prompt("Quantos? ")   // digitou 3
console.log(quantidade + 1)               // "31"
```

A solução é converter com `Number()` na hora de ler:

```javascript
const quantidade = Number(prompt("Quantos? "))   // digitou 3
console.log(quantidade + 1)
```

```text
Quantos? 3
4
```

`Number` funciona com inteiros e decimais (`"2.5"` vira `2.5`). Se a pessoa digitar algo que não é
número, o resultado é `NaN`, e toda conta com `NaN` também dá `NaN`.
