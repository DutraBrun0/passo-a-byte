---
titulo: "Desafio: ordenação por seleção"
xp: 30
exercicio:
  enunciado: |
    Implemente a função `ordenar(lista)` usando o algoritmo de **ordenação por seleção**. Ela devolve
    uma **nova** lista em ordem crescente, sem alterar a original e sem usar `sorted()` nem `.sort()`:

    ```python
    ordenar([5, 2, 9, 1, 7])   # [1, 2, 5, 7, 9]
    ```
  codigo_inicial: |
    def ordenar(lista):
        return sorted(lista)


    print(ordenar([5, 2, 9, 1, 7]))
  testes:
    - tipo: funcao
      nome: Números embaralhados
      funcao: ordenar
      args: [[5, 2, 9, 1, 7]]
      esperado: [1, 2, 5, 7, 9]
    - tipo: funcao
      nome: Com repetidos e negativos
      funcao: ordenar
      args: [[3, -1, 3, 0, -8, 2]]
      esperado: [-8, -1, 0, 2, 3, 3]
    - tipo: funcao
      nome: Textos
      funcao: ordenar
      args: [["pera", "banana", "uva", "abacate"]]
      esperado: ["abacate", "banana", "pera", "uva"]
    - tipo: funcao
      nome: Lista vazia
      funcao: ordenar
      args: [[]]
      esperado: []
    - tipo: python
      nome: Não altera a lista original
      codigo: |
        original = [3, 1, 2]
        ordenar(original)
        assert original == [3, 1, 2]
      mensagem: Trabalhe numa cópia, criada com lista[:] ou list(lista).
    - tipo: python
      nome: Não usa sorted() nem .sort()
      codigo: |
        nomes = ordenar.__code__.co_names
        assert "sorted" not in nomes and "sort" not in nomes
      mensagem: O objetivo é implementar o algoritmo. Encontre o menor, troque de lugar, repita.
  dicas:
    - "Comece copiando: `resultado = lista[:]`."
    - "Para cada posição `i`, procure a posição do menor item entre `i` e o fim da lista."
    - "Troque o item da posição `i` com o menor que você achou: `a[i], a[menor] = a[menor], a[i]`."
  solucao: |
    def ordenar(lista):
        resultado = lista[:]
        for i in range(len(resultado)):
            menor = i
            for j in range(i + 1, len(resultado)):
                if resultado[j] < resultado[menor]:
                    menor = j
            resultado[i], resultado[menor] = resultado[menor], resultado[i]
        return resultado


    print(ordenar([5, 2, 9, 1, 7]))
  explicacao_solucao: |
    A cada volta do laço de fora, o menor item da parte ainda desordenada vai para a posição `i`. A
    parte da esquerda fica ordenada e cresce um item por volta:

    ```text
    [5, 2, 9, 1, 7]   → o menor é 1, troca com o 5
    [1, 2, 9, 5, 7]   → o menor do resto é 2, já está no lugar
    [1, 2, 9, 5, 7]   → o menor do resto é 5, troca com o 9
    [1, 2, 5, 9, 7]   → o menor do resto é 7, troca com o 9
    [1, 2, 5, 7, 9]
    ```

    São dois laços, um dentro do outro: para `n` itens, cerca de `n²/2` comparações. O `sorted` do
    Python usa um algoritmo bem mais esperto (o Timsort), que cresce perto de `n × log n`.
---
Ordenar é um dos problemas mais estudados da computação. Existem dezenas de algoritmos; um dos mais
fáceis de entender é a **ordenação por seleção**:

1. Encontre o **menor** item da lista e coloque-o na primeira posição.
2. Encontre o menor dos que **sobraram** e coloque-o na segunda posição.
3. Repita até o fim.

É o que você faria com cartas na mão: procura a menor, põe na frente, procura a próxima menor...

Para colocar um item no lugar, basta trocá-lo com quem está lá, usando a troca que você aprendeu
lá no começo:

```python
cartas = [7, 2, 5]
cartas[0], cartas[1] = cartas[1], cartas[0]
print(cartas)
```

```text
[2, 7, 5]
```

> Na vida real, use `sorted()`. Mas implementar um algoritmo de ordenação é um rito de passagem: ensina
> laços aninhados, índices e a pensar no custo de cada passo.
