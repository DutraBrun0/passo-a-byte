---
titulo: Percorrendo arrays
xp: 20
exercicio:
  enunciado: |
    Dadas as notas da turma, calcule a **maior nota** (guarde em `maior`) e a **média** (guarde em
    `media`), e mostre as duas:

    ```text
    Maior: 10
    Média: 8.2
    ```

    Percorra o array com `for...of`, sem usar `Math.max`.
  codigo_inicial: |
    const notas = [7.5, 9, 6, 8.5, 10]
    let maior = notas[0]
    let soma = 0
    // percorra as notas aqui

    const media = 0
    console.log("Maior:", maior)
    console.log("Média:", media)
  testes:
    - tipo: variavel
      nome: maior vale 10
      variavel: maior
      esperado: 10
    - tipo: variavel
      nome: media vale 8.2
      variavel: media
      esperado: 8.2
    - tipo: saida
      nome: Mostra a maior nota e a média
      esperado: |
        Maior: 10
        Média: 8.2
    - tipo: estrutura
      nome: Percorre com for...of, sem Math.max
      usa: [ForOfStatement, IfStatement]
      max_chamadas: { Math.max: 0 }
      mensagem: Dentro do for...of, use um if para trocar maior quando a nota for maior que ele.
  dicas:
    - "`for (const nota of notas) { ... }` passa por cada nota."
    - "Dentro do laço: `if (nota > maior) maior = nota` e `soma += nota`."
    - "A média é `soma / notas.length`."
  solucao: |
    const notas = [7.5, 9, 6, 8.5, 10]
    let maior = notas[0]
    let soma = 0
    for (const nota of notas) {
      if (nota > maior) maior = nota
      soma += nota
    }

    const media = soma / notas.length
    console.log("Maior:", maior)
    console.log("Média:", media)
  explicacao_solucao: |
    A ideia do "maior até agora": comece supondo que o primeiro é o maior e, a cada item, troque se
    encontrar alguém maior. No mesmo laço dá para ir somando, e a média sai no fim.

    No dia a dia você usaria `Math.max(...notas)`. Saber escrever o laço à mão ajuda quando a regra é
    diferente, como "a maior nota abaixo de 9".
---
O `for` clássico funciona com arrays, usando a posição:

```javascript
const frutas = ["maçã", "uva", "pera"]
for (let i = 0; i < frutas.length; i++) {
  console.log(i, frutas[i])
}
```

Mas quando você só precisa dos **itens**, o `for...of` é mais direto:

```javascript
const frutas = ["maçã", "uva", "pera"]
for (const fruta of frutas) {
  console.log("Eu gosto de", fruta)
}
```

```text
Eu gosto de maçã
Eu gosto de uva
Eu gosto de pera
```

Junto com um `if`, dá para filtrar e contar:

```javascript
const temperaturas = [22, 31, 19, 35, 28]
let quentes = 0
for (const t of temperaturas) {
  if (t > 30) quentes++
}
console.log(quentes, "dias quentes")
```

```text
2 dias quentes
```
