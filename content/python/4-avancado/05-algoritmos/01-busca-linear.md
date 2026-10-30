---
titulo: Busca linear
xp: 20
exercicio:
  enunciado: |
    Escreva a função `buscar(lista, alvo)` que devolve a **posição** da primeira ocorrência de `alvo`
    na lista, ou `-1` se ele não estiver lá. Percorra a lista você mesmo, sem usar `.index()` nem `in`:

    ```python
    buscar([7, 3, 9, 3], 3)   # 1
    buscar([7, 3, 9], 5)      # -1
    ```
  codigo_inicial: |
    def buscar(lista, alvo):
        return lista.index(alvo)


    print(buscar([7, 3, 9, 3], 3))
  testes:
    - tipo: funcao
      nome: Encontra a primeira ocorrência
      funcao: buscar
      args: [[7, 3, 9, 3], 3]
      esperado: 1
    - tipo: funcao
      nome: Primeiro elemento
      funcao: buscar
      args: [["a", "b", "c"], "a"]
      esperado: 0
    - tipo: funcao
      nome: Não encontrado devolve -1
      funcao: buscar
      args: [[7, 3, 9], 5]
      esperado: -1
    - tipo: funcao
      nome: Lista vazia devolve -1
      funcao: buscar
      args: [[], 1]
      esperado: -1
    - tipo: python
      nome: Não usa .index()
      codigo: |
        assert "index" not in buscar.__code__.co_names
      mensagem: O objetivo é escrever a busca. Percorra as posições com for e compare cada item.
  dicas:
    - "`for i in range(len(lista)):` passa por todas as posições."
    - "Ao encontrar, `return i` encerra a função na hora."
    - "O `return -1` fica **depois** do laço: só chega lá quem não encontrou nada."
  solucao: |
    def buscar(lista, alvo):
        for i in range(len(lista)):
            if lista[i] == alvo:
                return i
        return -1


    print(buscar([7, 3, 9, 3], 3))
  explicacao_solucao: |
    A busca linear olha um item de cada vez, do começo ao fim. No pior caso (o alvo não está na lista),
    ela compara **todos** os itens: com um milhão de itens, um milhão de comparações.

    Em Python do dia a dia, `enumerate` deixa o laço mais elegante:

    ```python
    for i, item in enumerate(lista):
        if item == alvo:
            return i
    ```
---
Um **algoritmo** é uma receita passo a passo para resolver um problema. Os de **busca** e
**ordenação** são os clássicos que toda pessoa programadora estuda, porque ensinam a pensar em
**eficiência**.

A busca mais simples é a **linear**: olhar item por item até achar.

```python
def contem(lista, alvo):
    for item in lista:
        if item == alvo:
            return True
    return False
```

O Python já faz isso por você em `alvo in lista` e `lista.index(alvo)`. Mas saber como funciona por
dentro explica por que `in` numa lista enorme é lento, e por que conjuntos e dicionários são tão
rápidos para isso.

> Para medir algoritmos, contamos **quantos passos** eles dão conforme a entrada cresce. A busca
> linear dá até `n` passos para uma lista de `n` itens.
