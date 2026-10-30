---
titulo: Índices e fatias em textos
xp: 15
exercicio:
  enunciado: |
    Leia uma palavra, mostre-a **de trás para frente** e diga se ela é um palíndromo (se lê igual nos
    dois sentidos). Para `radar`:

    ```text
    radar
    É palíndromo
    ```

    Para `python`:

    ```text
    nohtyp
    Não é palíndromo
    ```
  codigo_inicial: |
    palavra = input("Palavra: ")
    invertida = palavra
    print(invertida)
  entrada: ["radar"]
  testes:
    - tipo: saida
      nome: radar é palíndromo
      entrada: ["radar"]
      esperado: |
        radar
        É palíndromo
    - tipo: saida
      nome: python não é palíndromo
      entrada: ["python"]
      esperado: |
        nohtyp
        Não é palíndromo
    - tipo: saida
      nome: ovo é palíndromo
      entrada: ["ovo"]
      esperado: |
        ovo
        É palíndromo
  dicas:
    - "Uma fatia com passo `-1`, `palavra[::-1]`, percorre o texto do fim para o começo."
    - "Depois é só comparar: `if palavra == invertida:`."
  solucao: |
    palavra = input("Palavra: ")
    invertida = palavra[::-1]
    print(invertida)
    if palavra == invertida:
        print("É palíndromo")
    else:
        print("Não é palíndromo")
  explicacao_solucao: |
    A fatia `[inicio:fim:passo]` tem três partes. Deixando início e fim vazios, ela cobre o texto
    inteiro; com passo `-1`, anda de trás para frente. Por isso `[::-1]` é o jeito clássico de inverter
    um texto (ou uma lista) em Python.
---
Textos se comportam como listas de letras: cada caractere tem um índice, começando em 0.

```python
nome = "Python"
print(nome[0])    # P
print(nome[-1])   # n
print(nome[1:4])  # yth
print(len(nome))  # 6
```

A fatia aceita um terceiro número, o **passo**:

```python
alfabeto = "abcdefgh"
print(alfabeto[::2])   # aceg   (de 2 em 2)
print(alfabeto[::-1])  # hgfedcba (ao contrário)
```

Uma diferença importante: textos **não mudam**. `nome[0] = "J"` dá erro. Para "mudar" um texto, você
cria um novo, por exemplo `"J" + nome[1:]`, que dá `Jython`.

E dá para percorrer as letras com `for`:

```python
for letra in "oi!":
    print(letra)
```
