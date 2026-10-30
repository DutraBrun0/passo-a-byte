---
titulo: Uma calculadora
xp: 20
exercicio:
  enunciado: |
    Leia **dois números**, um em cada `prompt`, e mostre a soma, a diferença (primeiro menos segundo) e
    o produto. Para as entradas `5` e `2.5`:

    ```text
    Soma: 7.5
    Diferença: 2.5
    Produto: 12.5
    ```
  codigo_inicial: |
    const a = prompt()
    const b = prompt()
    console.log("Soma:", a + b)
  entrada: ["5", "2.5"]
  testes:
    - tipo: saida
      nome: Entradas 5 e 2.5
      entrada: ["5", "2.5"]
      esperado: |
        Soma: 7.5
        Diferença: 2.5
        Produto: 12.5
    - tipo: saida
      nome: Entradas 3 e 4
      entrada: ["3", "4"]
      esperado: |
        Soma: 7
        Diferença: -1
        Produto: 12
    - tipo: saida
      nome: Entradas 0.5 e 0.25
      entrada: ["0.5", "0.25"]
      esperado: |
        Soma: 0.75
        Diferença: 0.25
        Produto: 0.125
  dicas:
    - "Converta os dois valores com `Number()` logo ao ler."
    - "Faça três `console.log`, um para cada conta: `console.log(\"Soma:\", a + b)`."
  solucao: |
    const a = Number(prompt("Primeiro número: "))
    const b = Number(prompt("Segundo número: "))
    console.log("Soma:", a + b)
    console.log("Diferença:", a - b)
    console.log("Produto:", a * b)
  explicacao_solucao: |
    Sem a conversão, `a + b` juntaria os textos (`"52.5"`). Repare também que JavaScript mostra `7`, e não
    `7.0`: inteiros e decimais são o mesmo tipo, e números inteiros aparecem sem casas decimais.
---
Cada `prompt` lê **uma** resposta. Para ler vários valores, use vários `prompt`, na ordem em que serão
digitados:

```javascript
const largura = Number(prompt("Largura: "))
const altura = Number(prompt("Altura: "))
console.log("Área:", largura * altura)
```

Se a pessoa digitar `2` e depois `1.5`:

```text
Largura: 2
Altura: 1.5
Área: 3
```

> Contas com decimais às vezes têm "sujeirinhas": `0.1 + 0.2` dá `0.30000000000000004`. Isso acontece em
> quase toda linguagem, por causa de como o computador guarda decimais. Para mostrar bonito, use
> `numero.toFixed(2)`, que devolve um texto com 2 casas.
