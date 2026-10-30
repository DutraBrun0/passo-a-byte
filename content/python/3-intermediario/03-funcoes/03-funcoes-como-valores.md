---
titulo: Funções como valores
xp: 25
exercicio:
  enunciado: |
    Crie a função `ordenar_por_tamanho(palavras)` que devolve uma **nova** lista com as palavras
    ordenadas da mais curta para a mais longa. Palavras do mesmo tamanho ficam em ordem alfabética:

    ```python
    ordenar_por_tamanho(["uva", "abacaxi", "kiwi", "pera", "fig"])
    # ['fig', 'uva', 'kiwi', 'pera', 'abacaxi']
    ```
  codigo_inicial: |
    def ordenar_por_tamanho(palavras):
        return sorted(palavras)


    print(ordenar_por_tamanho(["uva", "abacaxi", "kiwi", "pera", "fig"]))
  testes:
    - tipo: funcao
      nome: Frutas
      funcao: ordenar_por_tamanho
      args: [["uva", "abacaxi", "kiwi", "pera", "fig"]]
      esperado: ["fig", "uva", "kiwi", "pera", "abacaxi"]
    - tipo: funcao
      nome: Empate resolvido em ordem alfabética
      funcao: ordenar_por_tamanho
      args: [["sol", "mar", "ar", "céu", "lua"]]
      esperado: ["ar", "céu", "lua", "mar", "sol"]
    - tipo: python
      nome: Não altera a lista original
      codigo: |
        original = ["ccc", "a", "bb"]
        ordenar_por_tamanho(original)
        assert original == ["ccc", "a", "bb"]
      mensagem: Use sorted(), que cria uma lista nova, em vez de .sort().
  dicas:
    - "`sorted` aceita o parâmetro `key`: uma função que diz **pelo que** ordenar. `key=len` ordena pelo tamanho."
    - "Para desempatar, a chave pode devolver uma tupla: primeiro o tamanho, depois a própria palavra."
    - "Com `lambda`: `key=lambda p: (len(p), p)`."
  solucao: |
    def ordenar_por_tamanho(palavras):
        return sorted(palavras, key=lambda p: (len(p), p))


    print(ordenar_por_tamanho(["uva", "abacaxi", "kiwi", "pera", "fig"]))
  explicacao_solucao: |
    O `sorted` chama a função `key` para cada palavra e ordena pelos valores que ela devolve. Para
    `"kiwi"`, a chave é `(4, "kiwi")`. Tuplas são comparadas item a item: primeiro o tamanho e, só
    se empatar, a palavra. Por isso `"kiwi"` vem antes de `"pera"`.

    O `lambda p: (len(p), p)` é uma função de uma linha, sem nome. Seria o mesmo que:

    ```python
    def chave(p):
        return (len(p), p)

    sorted(palavras, key=chave)
    ```
---
Em Python, funções são valores como quaisquer outros: dá para guardá-las em variáveis e passá-las
para outras funções. Repare na diferença:

```python
print(len)          # a função em si
print(len("abc"))   # o resultado de chamá-la
```

Um uso muito comum é dizer ao `sorted`, ao `max` e ao `min` **como comparar**, pelo parâmetro `key`:

```python
nomes = ["Bia", "Alexandre", "Caio"]
print(sorted(nomes, key=len))
print(max(nomes, key=len))
```

```text
['Bia', 'Caio', 'Alexandre']
Alexandre
```

## lambda

Para funções pequenas, usadas uma vez só, existe o `lambda`:

```python
dobro = lambda x: x * 2
print(dobro(21))

pessoas = [("Ana", 30), ("Bia", 25)]
print(sorted(pessoas, key=lambda p: p[1]))
```

```text
42
[('Bia', 25), ('Ana', 30)]
```
