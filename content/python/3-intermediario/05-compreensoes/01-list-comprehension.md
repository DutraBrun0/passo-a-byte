---
titulo: Listas em uma linha
xp: 20
exercicio:
  enunciado: |
    Crie a lista `quadrados` com os quadrados dos números de 1 a 10, usando uma **list comprehension**
    (sem `for` em várias linhas):

    ```python
    [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
    ```
  codigo_inicial: |
    quadrados = []
    for n in range(1, 11):
        quadrados.append(n * n)
    print(quadrados)
  testes:
    - tipo: variavel
      nome: quadrados de 1 a 10
      variavel: quadrados
      esperado: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
    - tipo: estrutura
      nome: Usa list comprehension, sem for comum
      usa: [ListComp]
      nao_usa: [For]
      mensagem: Escreva tudo numa linha só, no formato [expressão for n in range(...)].
  dicas:
    - "O formato é `[o_que_guardar for variavel in sequencia]`."
    - "Aqui: `[n * n for n in range(1, 11)]`."
  solucao: |
    quadrados = [n * n for n in range(1, 11)]
    print(quadrados)
  explicacao_solucao: |
    Leia a compreensão da esquerda para a direita como uma frase: "a lista de `n * n` **para cada**
    `n` em `range(1, 11)`". Ela faz exatamente o que o laço do código inicial fazia (lista vazia, `for`
    e `append`), só que numa linha e de um jeito que diz logo o que a lista contém.

    `n ** 2` também funciona: `**` é a potência em Python.
---
Criar uma lista a partir de outra é tão comum que o Python tem uma sintaxe só para isso, a
**list comprehension**. Compare:

```python
# Com laço
precos_com_taxa = []
for preco in [10, 20, 30]:
    precos_com_taxa.append(preco * 1.1)

# Com compreensão
precos_com_taxa = [preco * 1.1 for preco in [10, 20, 30]]
```

As duas fazem a mesma coisa. A compreensão tem três partes dentro dos colchetes:

```text
[ preco * 1.1    for preco    in [10, 20, 30] ]
  ↑ o que entra  ↑ variável   ↑ de onde vêm os valores
```

Funciona com qualquer sequência, inclusive textos:

```python
print([letra.upper() for letra in "abc"])
print([len(p) for p in ["sol", "chuva", "neve"]])
```

```text
['A', 'B', 'C']
[3, 5, 4]
```
