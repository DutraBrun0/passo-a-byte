---
titulo: Criando arrays
xp: 15
exercicio:
  enunciado: |
    Acrescente `"café"` ao **final** do array de compras e depois mostre o primeiro item, o último e
    quantos itens o array tem:

    ```text
    Primeiro: arroz
    Último: café
    Itens: 4
    ```

    Pegue o último item de um jeito que continue certo se o array crescer.
  codigo_inicial: |
    const compras = ["arroz", "feijão", "leite"]
    // acrescente "café" aqui

    console.log("Primeiro:", compras[1])
  testes:
    - tipo: variavel
      nome: compras termina com "café"
      variavel: compras
      esperado: ["arroz", "feijão", "leite", "café"]
    - tipo: saida
      nome: Mostra primeiro, último e quantidade
      esperado: |
        Primeiro: arroz
        Último: café
        Itens: 4
  dicas:
    - "O método `push` acrescenta no final: `compras.push(\"café\")`."
    - "As posições começam em **0**. O primeiro item é `compras[0]`."
    - "`compras.length` é a quantidade de itens; o último é `compras[compras.length - 1]`, ou `compras.at(-1)`."
  solucao: |
    const compras = ["arroz", "feijão", "leite"]
    compras.push("café")

    console.log("Primeiro:", compras[0])
    console.log("Último:", compras.at(-1))
    console.log("Itens:", compras.length)
  explicacao_solucao: |
    - `push` muda o próprio array, colocando o item novo no fim. Repare que `compras` é `const` e mesmo
      assim muda: `const` impede trocar o array **inteiro** por outro, mas não impede mexer dentro dele.
    - `compras[0]` é o primeiro porque a contagem começa do zero.
    - `compras.at(-1)` conta de trás para frente: -1 é o último, -2 o penúltimo.
---
Um **array** guarda vários valores em ordem, dentro de colchetes e separados por vírgulas:

```javascript
const notas = [8, 6.5, 10]
const nomes = ["Ana", "Bia", "Caio"]
const vazio = []
```

Cada item tem uma **posição** (índice), que começa em zero:

```javascript
const nomes = ["Ana", "Bia", "Caio"]
console.log(nomes[0])       // Ana
console.log(nomes[2])       // Caio
console.log(nomes.length)   // 3
```

Arrays podem **mudar** depois de criados:

```javascript
const nomes = ["Ana", "Bia", "Caio"]
nomes[1] = "Beatriz"   // troca o item da posição 1
nomes.push("Duda")     // acrescenta no final
console.log(nomes)
```

```text
[ 'Ana', 'Beatriz', 'Caio', 'Duda' ]
```

Pedir uma posição que não existe, como `nomes[10]`, não dá erro: devolve `undefined`.
