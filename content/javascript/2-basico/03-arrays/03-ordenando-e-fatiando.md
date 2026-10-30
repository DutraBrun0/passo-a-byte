---
titulo: Ordenando e fatiando
xp: 25
exercicio:
  enunciado: |
    O jogador com `150` pontos foi desclassificado. Crie o array `validos` sem essa pontuação (mantendo a
    ordem original) e o array `podio` com as **três maiores** pontuações, da maior para a menor. Mostre:

    ```text
    Pódio: 1200, 980, 610
    ```

    O array `pontos` original não pode ser alterado. Rode o código inicial antes: ele tem uma
    pegadinha clássica de JavaScript.
  codigo_inicial: |
    const pontos = [320, 150, 980, 450, 610, 1200]
    const validos = pontos
    const podio = validos.sort().slice(0, 3)

    console.log("Pódio:", podio.join(", "))
  testes:
    - tipo: variavel
      nome: pontos continua como estava
      variavel: pontos
      esperado: [320, 150, 980, 450, 610, 1200]
    - tipo: variavel
      nome: validos fica sem o 150, na ordem original
      variavel: validos
      esperado: [320, 980, 450, 610, 1200]
    - tipo: variavel
      nome: podio tem as três maiores, em ordem decrescente
      variavel: podio
      esperado: [1200, 980, 610]
    - tipo: saida
      nome: Mostra o pódio
      esperado: "Pódio: 1200, 980, 610"
  dicas:
    - "`pontos.filter((p) => p !== 150)` cria um array **novo** só com quem passa no teste."
    - "Cuidado: `sort()` sem argumentos ordena como **texto** (\"1200\" vem antes de \"320\"). Para números, use `sort((a, b) => b - a)`."
    - "`sort` muda o próprio array. Ordene uma cópia: `[...validos].sort(...)`. Depois, `slice(0, 3)` pega os três primeiros."
  solucao: |
    const pontos = [320, 150, 980, 450, 610, 1200]
    const validos = pontos.filter((p) => p !== 150)
    const podio = [...validos].sort((a, b) => b - a).slice(0, 3)

    console.log("Pódio:", podio.join(", "))
  explicacao_solucao: |
    Três ferramentas, três cuidados:

    - `filter` devolve um array **novo**; `pontos` fica intacto.
    - `sort` **muda** o array e, sem argumentos, compara como texto. Por isso `[...validos]` faz uma cópia
      antes e `(a, b) => b - a` diz como comparar números: um resultado positivo põe `b` antes de `a`.
    - `slice(0, 3)` copia do início até antes da posição 3.

    O código inicial errava de três jeitos ao mesmo tempo: `validos = pontos` não copia (os dois nomes
    apontam para o **mesmo** array, então o `sort` bagunçava `pontos` também), o 150 continuava lá e o
    `sort()` de texto colocava `1200` antes de `150`, porque `"1"` vem antes de `"3"`.
---
Algumas operações úteis com arrays:

| Código | O que faz |
|--------|-----------|
| `a.push(x)` | acrescenta `x` no final |
| `a.pop()` | tira e devolve o último item |
| `a.includes(x)` | `true` se `x` está no array |
| `a.indexOf(x)` | posição de `x`, ou `-1` |
| `a.slice(i, f)` | copia de `i` até antes de `f` |
| `a.join(", ")` | junta os itens num texto |
| `a.filter(teste)` | novo array com quem passa no teste |
| `a.sort(comparar)` | ordena o próprio array |

## A pegadinha do sort

Sem argumentos, o `sort` converte tudo para texto e ordena em ordem alfabética:

```javascript
console.log([10, 9, 100].sort())
```

```text
[ 10, 100, 9 ]
```

Para números, passe uma função que compara dois valores. `(a, b) => a - b` ordena do menor para o maior:

```javascript
console.log([10, 9, 100].sort((a, b) => a - b))
```

```text
[ 9, 10, 100 ]
```

Essa `(a, b) => a - b` é uma **arrow function**, uma função escrita de forma curta. Você vai criar as
suas no módulo de funções.
