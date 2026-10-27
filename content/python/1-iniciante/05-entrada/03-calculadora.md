---
titulo: Uma calculadora
xp: 20
exercicio:
  enunciado: |
    Leia **dois números decimais**, um em cada `input()`, e mostre a soma, a diferença
    (primeiro menos segundo) e o produto. Para as entradas `5` e `2.5`:

    ```text
    Soma: 7.5
    Diferença: 2.5
    Produto: 12.5
    ```
  codigo_inicial: |
    a = input()
    b = input()
    print("Soma:", a + b)
  entrada: ["5", "2.5"]
  testes:
    - tipo: saida
      nome: Entradas 5 e 2.5
      entrada: ["5", "2.5"]
      esperado: |
        Soma: 7.5
        Diferença: 2.5
        Produto: 12.5
    - tipo: saida
      nome: Entradas 3 e 4 (inteiros viram decimais)
      entrada: ["3", "4"]
      esperado: |
        Soma: 7.0
        Diferença: -1.0
        Produto: 12.0
    - tipo: saida
      nome: Entradas 0.5 e 0.25
      entrada: ["0.5", "0.25"]
      esperado: |
        Soma: 0.75
        Diferença: 0.25
        Produto: 0.125
  dicas:
    - "Converta os dois valores com `float()` logo ao ler."
    - "Faça três `print`, um para cada conta, no formato `print(\"Soma:\", a + b)`."
  solucao: |
    a = float(input("Primeiro número: "))
    b = float(input("Segundo número: "))
    print("Soma:", a + b)
    print("Diferença:", a - b)
    print("Produto:", a * b)
  explicacao_solucao: |
    Com `float()`, até números digitados sem ponto, como `3`, viram decimais (`3.0`). Por isso o
    segundo teste mostra `7.0` em vez de `7`. Sem a conversão, `a + b` juntaria os textos: `"34"`.
---
Cada `input()` lê **uma** resposta. Para ler vários valores, use vários `input()`, na ordem em que serão digitados:

```python
largura = float(input("Largura: "))
altura = float(input("Altura: "))
print("Área:", largura * altura)
```

Se a pessoa digitar `2` e depois `1.5`:

```text
Largura: 2
Altura: 1.5
Área: 3.0
```

Repare que `float("2")` funciona e vira `2.0`. Já `int("1.5")` dá erro: para `int()`, o texto precisa ser um inteiro.
