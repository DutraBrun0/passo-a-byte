---
titulo: Busca binária
xp: 30
exercicio:
  enunciado: |
    Escreva a função `busca_binaria(lista, alvo)` para uma lista **ordenada**. Ela devolve a posição de
    `alvo` ou `-1`, e precisa ser rápida: os testes procuram numa lista de 1000 números e só permitem
    **consultar a lista no máximo 25 vezes**. Uma busca item por item precisaria de até 1000.

    ```python
    busca_binaria([1, 3, 5, 7, 9, 11], 7)   # 3
    busca_binaria([1, 3, 5, 7, 9, 11], 4)   # -1
    ```
  codigo_inicial: |
    def busca_binaria(lista, alvo):
        for i in range(len(lista)):
            if lista[i] == alvo:
                return i
        return -1


    print(busca_binaria([1, 3, 5, 7, 9, 11], 7))
  testes:
    - tipo: funcao
      nome: Encontra no meio
      funcao: busca_binaria
      args: [[1, 3, 5, 7, 9, 11], 7]
      esperado: 3
    - tipo: funcao
      nome: Encontra nas pontas
      funcao: busca_binaria
      args: [[1, 3, 5, 7, 9, 11], 11]
      esperado: 5
    - tipo: funcao
      nome: Não encontrado
      funcao: busca_binaria
      args: [[1, 3, 5, 7, 9, 11], 4]
      esperado: -1
    - tipo: funcao
      nome: Lista vazia
      funcao: busca_binaria
      args: [[], 4]
      esperado: -1
    - tipo: python
      nome: Consulta a lista no máximo 25 vezes, com 1000 itens
      codigo: |
        class ListaEspia(list):
            olhadas = 0
            def __getitem__(self, i):
                ListaEspia.olhadas += 1
                return super().__getitem__(i)
            def __iter__(self):
                for i in range(len(self)):
                    yield self[i]

        numeros = ListaEspia(range(0, 2000, 2))
        for alvo, posicao in [(0, 0), (998, 499), (1998, 999), (1001, -1)]:
            ListaEspia.olhadas = 0
            assert busca_binaria(numeros, alvo) == posicao
            assert ListaEspia.olhadas <= 25
      mensagem: A cada passo, olhe o meio do intervalo e descarte a metade onde o alvo não pode estar.
  dicas:
    - "Guarde os limites do intervalo: `inicio = 0` e `fim = len(lista) - 1`."
    - "Enquanto `inicio <= fim`: calcule `meio = (inicio + fim) // 2` e compare `lista[meio]` com o alvo."
    - "Se `lista[meio]` for menor que o alvo, o alvo só pode estar depois: `inicio = meio + 1`. Se for maior, `fim = meio - 1`."
  solucao: |
    def busca_binaria(lista, alvo):
        inicio, fim = 0, len(lista) - 1
        while inicio <= fim:
            meio = (inicio + fim) // 2
            if lista[meio] == alvo:
                return meio
            if lista[meio] < alvo:
                inicio = meio + 1
            else:
                fim = meio - 1
        return -1


    print(busca_binaria([1, 3, 5, 7, 9, 11], 7))
  explicacao_solucao: |
    Cada comparação corta o intervalo pela metade: 1000 → 500 → 250 → 125 → ... → 1. São no máximo
    uns 10 passos para mil itens, 20 para um milhão e 30 para um bilhão. A busca linear precisaria de
    um bilhão de passos no pior caso.

    O preço: a lista **precisa estar ordenada**. Se ela muda muito e é pouco consultada, ordenar pode
    custar mais do que buscar linearmente.
---
Lembra do jogo de adivinhar o número? A melhor estratégia era sempre chutar o **meio**. A busca
binária é essa estratégia, aplicada a uma lista **ordenada**:

1. Olhe o elemento do meio.
2. Se for o alvo, achou.
3. Se o alvo for maior, descarte a metade da esquerda; se for menor, a da direita.
4. Repita com a metade que sobrou, até achar ou o intervalo ficar vazio.

Procurando 23 em `[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]`:

```text
intervalo 0..9 → meio 4 → 16 < 23 → vai para a direita
intervalo 5..9 → meio 7 → 56 > 23 → vai para a esquerda
intervalo 5..6 → meio 5 → 23 ✓
```

Três olhadas em vez de seis. E a diferença cresce muito com listas grandes.

> A biblioteca padrão tem o módulo `bisect`, que faz busca binária pronta.
