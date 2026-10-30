---
titulo: "Desafio: a tabuada"
xp: 20
exercicio:
  enunciado: |
    Leia um número e mostre a tabuada dele, de 1 a 10. Para a entrada `7`:

    ```text
    7 x 1 = 7
    7 x 2 = 14
    ...
    7 x 10 = 70
    ```
  codigo_inicial: |
    const n = Number(prompt("Tabuada do: "))
    console.log(`${n} x 1 = ${n * 1}`)
  entrada: ["7"]
  testes:
    - tipo: saida
      nome: Tabuada do 7
      entrada: ["7"]
      esperado: |
        7 x 1 = 7
        7 x 2 = 14
        7 x 3 = 21
        7 x 4 = 28
        7 x 5 = 35
        7 x 6 = 42
        7 x 7 = 49
        7 x 8 = 56
        7 x 9 = 63
        7 x 10 = 70
    - tipo: saida
      nome: Tabuada do 3
      entrada: ["3"]
      esperado: |
        3 x 1 = 3
        3 x 2 = 6
        3 x 3 = 9
        3 x 4 = 12
        3 x 5 = 15
        3 x 6 = 18
        3 x 7 = 21
        3 x 8 = 24
        3 x 9 = 27
        3 x 10 = 30
    - tipo: estrutura
      nome: Um console.log dentro de um for
      usa: [ForStatement]
      max_chamadas: { console.log: 1 }
      mensagem: Coloque um único console.log dentro de um for que vai de 1 a 10.
  dicas:
    - "O laço: `for (let i = 1; i <= 10; i++)`."
    - "Dentro da template string, troque o `1` fixo por `${i}`."
  solucao: |
    const n = Number(prompt("Tabuada do: "))
    for (let i = 1; i <= 10; i++) {
      console.log(`${n} x ${i} = ${n * i}`)
    }
  explicacao_solucao: |
    O laço troca só o que muda de uma linha para outra (o multiplicador `i`). O resto do texto é igual em
    todas as linhas, então fica fixo na template string.

    Uma boa forma de descobrir o laço é escrever duas ou três linhas à mão e ver **o que muda** entre
    elas: é isso que vira a variável do `for`.
---
Laços combinam muito bem com template strings. A variável do `for` pode aparecer no meio do texto:

```javascript
for (let andar = 1; andar <= 3; andar++) {
  console.log(`Elevador no ${andar}º andar`)
}
```

```text
Elevador no 1º andar
Elevador no 2º andar
Elevador no 3º andar
```

Você também pode fazer contas com ela, por exemplo `${andar * 3}` para saber a altura em metros.
