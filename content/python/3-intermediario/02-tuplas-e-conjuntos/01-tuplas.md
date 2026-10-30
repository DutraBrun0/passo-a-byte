---
titulo: Tuplas e desempacotamento
xp: 20
exercicio:
  enunciado: |
    Crie a função `menor_e_maior(numeros)` que devolve uma **tupla** com o menor e o maior número da
    lista, nessa ordem:

    ```python
    menor, maior = menor_e_maior([4, 9, 1, 7])
    print(menor, maior)  # 1 9
    ```
  codigo_inicial: |
    def menor_e_maior(numeros):
        return min(numeros)


    menor, maior = menor_e_maior([4, 9, 1, 7])
    print(menor, maior)
  testes:
    - tipo: funcao
      nome: "[4, 9, 1, 7] dá (1, 9)"
      funcao: menor_e_maior
      args: [[4, 9, 1, 7]]
      esperado: [1, 9]
    - tipo: funcao
      nome: Números negativos
      funcao: menor_e_maior
      args: [[-3, -10, 5]]
      esperado: [-10, 5]
    - tipo: funcao
      nome: Lista de um item só
      funcao: menor_e_maior
      args: [[42]]
      esperado: [42, 42]
    - tipo: python
      nome: Devolve uma tupla
      codigo: |
        assert type(menor_e_maior([1, 2])) is tuple
      mensagem: "Devolva os dois valores separados por vírgula: return a, b."
  dicas:
    - "`min(lista)` e `max(lista)` dão o menor e o maior."
    - "`return a, b` devolve uma tupla com os dois valores."
  solucao: |
    def menor_e_maior(numeros):
        return min(numeros), max(numeros)


    menor, maior = menor_e_maior([4, 9, 1, 7])
    print(menor, maior)
  explicacao_solucao: |
    A vírgula é o que cria a tupla: `return min(numeros), max(numeros)` devolve `(1, 9)`. Do outro
    lado, `menor, maior = ...` **desempacota** a tupla, guardando cada parte numa variável.

    É assim que funções em Python "devolvem vários valores": na verdade devolvem uma tupla só.
---
Uma **tupla** é parecida com uma lista, mas usa parênteses e **não pode mudar** depois de criada:

```python
ponto = (3, 7)
print(ponto[0])   # 3
ponto[0] = 5      # TypeError: tuplas não mudam
```

Use tuplas para grupos fixos de valores que andam juntos: coordenadas, uma data `(dia, mes, ano)`,
uma cor `(r, g, b)`.

## Desempacotamento

Dá para separar os valores de uma tupla em variáveis numa linha só:

```python
dia, mes, ano = (25, 12, 2025)
print(mes)
```

```text
12
```

Você já usou isso sem saber: em `a, b = b, a` e em `for nome, idade in idades.items()`.
