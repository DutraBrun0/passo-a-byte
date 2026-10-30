---
titulo: Geradores com yield
xp: 25
exercicio:
  enunciado: |
    Crie o **gerador** `fibonacci(quantidade)` que produz, um de cada vez, os primeiros números da
    sequência de Fibonacci (cada número é a soma dos dois anteriores, começando com 0 e 1):

    ```python
    list(fibonacci(8))   # [0, 1, 1, 2, 3, 5, 8, 13]
    ```

    Use `yield`, sem montar uma lista dentro da função.
  codigo_inicial: |
    def fibonacci(quantidade):
        resultado = []
        a, b = 0, 1
        for _ in range(quantidade):
            resultado.append(a)
            a, b = b, a + b
        return resultado


    print(list(fibonacci(8)))
  testes:
    - tipo: python
      nome: Os 8 primeiros números
      codigo: |
        assert list(fibonacci(8)) == [0, 1, 1, 2, 3, 5, 8, 13]
    - tipo: python
      nome: Quantidade zero não produz nada
      codigo: |
        assert list(fibonacci(0)) == []
    - tipo: python
      nome: É um gerador (entrega um valor por vez)
      codigo: |
        g = fibonacci(3)
        assert next(g) == 0
        assert next(g) == 1
        assert next(g) == 1
      mensagem: Um gerador é preguiçoso. Troque o append por yield e apague a lista.
    - tipo: estrutura
      nome: Usa yield
      usa: [Yield]
      mensagem: Troque resultado.append(a) por yield a.
  dicas:
    - "Troque `resultado.append(a)` por `yield a`."
    - "Um gerador não precisa de `return` nem de lista: os valores saem pelo `yield`."
  solucao: |
    def fibonacci(quantidade):
        a, b = 0, 1
        for _ in range(quantidade):
            yield a
            a, b = b, a + b


    print(list(fibonacci(8)))
  explicacao_solucao: |
    Cada `yield a` entrega um número e **pausa** a função ali mesmo, com `a` e `b` guardados. Quando
    alguém pede o próximo valor (o `for`, o `list` ou o `next`), ela continua da linha seguinte.

    A grande vantagem: `fibonacci(1_000_000)` não ocupa memória com um milhão de números de uma vez.
    Eles são calculados conforme são pedidos.
---
Um **gerador** é uma função que produz uma sequência de valores **um de cada vez**, sob demanda. Em vez
de `return`, ele usa `yield`:

```python
def contagem(n):
    while n > 0:
        yield n
        n -= 1


for numero in contagem(3):
    print(numero)
```

```text
3
2
1
```

Chamar `contagem(3)` não roda nada ainda: devolve um objeto gerador. O código só anda quando alguém
pede o próximo valor:

```python
g = contagem(2)
print(next(g))   # 2
print(next(g))   # 1
print(next(g))   # StopIteration: acabou
```

`range` funciona de um jeito parecido: `range(10**9)` não cria um bilhão de números na memória.
