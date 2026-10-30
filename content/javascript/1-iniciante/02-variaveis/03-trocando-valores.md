---
titulo: Trocando valores
xp: 15
exercicio:
  enunciado: |
    As cores do time estão invertidas. Troque os valores de `principal` e `detalhe`, de modo que
    `principal` fique com `"laranja"` e `detalhe` com `"azul"`.

    Não escreva os textos `"laranja"` e `"azul"` de novo: troque usando as próprias variáveis.
  codigo_inicial: |
    let principal = "azul"
    let detalhe = "laranja"
    // troque os valores aqui

    console.log(principal, detalhe)
  testes:
    - tipo: variavel
      nome: principal fica "laranja"
      variavel: principal
      esperado: laranja
    - tipo: variavel
      nome: detalhe fica "azul"
      variavel: detalhe
      esperado: azul
    - tipo: saida
      nome: Mostra "laranja azul"
      esperado: laranja azul
  dicas:
    - "Se você fizer `principal = detalhe` primeiro, o valor antigo de `principal` se perde. Guarde-o antes em uma terceira variável."
    - "O JavaScript tem um atalho: `[a, b] = [b, a]` troca os dois de uma vez."
  solucao: |
    let principal = "azul"
    let detalhe = "laranja"
    ;[principal, detalhe] = [detalhe, principal]

    console.log(principal, detalhe)
  explicacao_solucao: |
    Em `[principal, detalhe] = [detalhe, principal]`, o JavaScript primeiro monta a lista da direita
    (`["laranja", "azul"]`) e só depois distribui os valores para os nomes da esquerda. Por isso nenhum
    se perde.

    O `;` no começo da linha não é enfeite: sem ele, o JavaScript poderia grudar o `[` na linha de
    cima. O jeito clássico, com variável auxiliar, não tem essa pegadinha:

    ```javascript
    const auxiliar = principal
    principal = detalhe
    detalhe = auxiliar
    ```
---
Trocar o valor de duas variáveis parece fácil, mas tem uma pegadinha:

```javascript
let a = 1
let b = 2
a = b   // agora a vale 2... e o 1 sumiu!
b = a   // b continua 2
```

Ao fazer `a = b`, o valor antigo de `a` é apagado. Existem duas saídas:

1. Guardar o valor numa **variável auxiliar** antes de sobrescrever.
2. Usar a **atribuição por desestruturação**, que monta os valores antes de guardar:

```javascript
let x = 10
let y = 20
;[x, y] = [y, x]
console.log(x, y)
```

```text
20 10
```
