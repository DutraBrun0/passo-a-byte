---
titulo: Acumulando valores
xp: 20
exercicio:
  enunciado: |
    Leia um número `n` e mostre a soma de todos os inteiros de 1 até `n`. Para a entrada `5`:

    ```text
    A soma de 1 a 5 é 15
    ```

    Faça a soma com um `for` e uma variável acumuladora.
  codigo_inicial: |
    const n = Number(prompt("Até quanto? "))
    let soma = 0
    // some os números de 1 até n aqui

    console.log(`A soma de 1 a ${n} é ${soma}`)
  entrada: ["5"]
  testes:
    - tipo: saida
      nome: Entrada 5
      entrada: ["5"]
      esperado: A soma de 1 a 5 é 15
    - tipo: saida
      nome: Entrada 100
      entrada: ["100"]
      esperado: A soma de 1 a 100 é 5050
    - tipo: saida
      nome: Entrada 1
      entrada: ["1"]
      esperado: A soma de 1 a 1 é 1
    - tipo: estrutura
      nome: Usa um for
      usa: [ForStatement]
      mensagem: O objetivo é praticar o acumulador. Some dentro de um for com soma += i.
  dicas:
    - "Para incluir o próprio `n`, a condição é `i <= n`."
    - "Dentro do laço, faça `soma += i` para ir acumulando."
  solucao: |
    const n = Number(prompt("Até quanto? "))
    let soma = 0
    for (let i = 1; i <= n; i++) {
      soma += i
    }

    console.log(`A soma de 1 a ${n} é ${soma}`)
  explicacao_solucao: |
    A variável `soma` começa em 0 e, a cada volta, recebe mais um número. Para `n = 5`:

    | Volta | i | soma |
    |:-----:|:-:|:----:|
    | 1 | 1 | 1 |
    | 2 | 2 | 3 |
    | 3 | 3 | 6 |
    | 4 | 4 | 10 |
    | 5 | 5 | 15 |

    Esse padrão (começar com um valor neutro e ir somando) se chama **acumulador** e aparece o tempo todo.
---
Um uso muito comum de laços é **acumular**: ir juntando um resultado a cada volta.

```javascript
let total = 0
for (let preco = 10; preco <= 30; preco += 10) {
  total += preco
  console.log(`Somei ${preco} e o total ficou ${total}`)
}
```

```text
Somei 10 e o total ficou 10
Somei 20 e o total ficou 30
Somei 30 e o total ficou 60
```

O segredo é criar a variável **antes** do laço, e com `let`, porque ela vai mudar. Se fosse criada dentro
do laço, voltaria a zero a cada volta.

> Para contar quantas vezes algo acontece, o padrão é o mesmo: `let contador = 0` e `contador++`.
