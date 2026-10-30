---
titulo: Quantos argumentos quiser
xp: 20
exercicio:
  enunciado: |
    Crie a função `media(*numeros)` que aceita **qualquer quantidade** de números e devolve a média
    deles. Sem nenhum número, ela deve devolver `0`:

    ```python
    media(7, 8, 9)   # 8.0
    media(10)        # 10.0
    media()          # 0
    ```
  codigo_inicial: |
    def media(a, b, c):
        return (a + b + c) / 3


    print(media(7, 8, 9))
  testes:
    - tipo: funcao
      nome: media(7, 8, 9)
      funcao: media
      args: [7, 8, 9]
      esperado: 8
    - tipo: funcao
      nome: media(10)
      funcao: media
      args: [10]
      esperado: 10
    - tipo: funcao
      nome: media(1, 2, 3, 4, 5, 6)
      funcao: media
      args: [1, 2, 3, 4, 5, 6]
      esperado: 3.5
    - tipo: funcao
      nome: media() sem números dá 0
      funcao: media
      args: []
      esperado: 0
  dicas:
    - "Com `def media(*numeros):`, `numeros` vira uma tupla com todos os argumentos."
    - "Se `len(numeros) == 0`, devolva 0 antes de dividir (dividir por zero dá erro)."
  solucao: |
    def media(*numeros):
        if len(numeros) == 0:
            return 0
        return sum(numeros) / len(numeros)


    print(media(7, 8, 9))
  explicacao_solucao: |
    O `*` antes do nome junta todos os argumentos posicionais numa tupla. Em `media(7, 8, 9)`,
    `numeros` vale `(7, 8, 9)`; em `media()`, vale `()`.

    O caso vazio precisa de atenção: `sum(())` é 0 e `len(())` também, e `0 / 0` dá
    `ZeroDivisionError`. Por isso o `if` vem primeiro. Uma forma mais curta: `if not numeros:`.
---
Funções como `print` e `max` aceitam quantos argumentos você quiser. As suas também podem, com um `*`
antes do nome do parâmetro:

```python
def somar(*valores):
    print("Recebi:", valores)
    return sum(valores)


print(somar(1, 2))
print(somar(5, 5, 5, 5))
```

```text
Recebi: (1, 2)
3
Recebi: (5, 5, 5, 5)
20
```

## Argumentos nomeados

Na chamada, você pode dizer o **nome** do parâmetro. Assim a ordem deixa de importar e o código fica
mais claro:

```python
def retangulo(largura, altura):
    return largura * altura


print(retangulo(altura=3, largura=5))
```

Existe também o `**` (dois asteriscos), que junta argumentos nomeados num dicionário. Você vai
encontrá-lo como `**kwargs` em muitas bibliotecas.
