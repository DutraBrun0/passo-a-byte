---
titulo: Senão, else
xp: 15
exercicio:
  enunciado: |
    Leia um número inteiro e diga se ele é `par` ou `ímpar` (exatamente com essas palavras).
  codigo_inicial: |
    numero = int(input("Número: "))
    if numero == 2:
        print("par")
  entrada: ["4"]
  testes:
    - tipo: saida
      nome: 4 é par
      entrada: ["4"]
      esperado: par
    - tipo: saida
      nome: 7 é ímpar
      entrada: ["7"]
      esperado: ímpar
    - tipo: saida
      nome: 0 é par
      entrada: ["0"]
      esperado: par
    - tipo: saida
      nome: -3 é ímpar
      entrada: ["-3"]
      esperado: ímpar
  dicas:
    - "Um número é par quando o resto da divisão por 2 é zero: `numero % 2 == 0`."
    - "Use `else:` (sem condição) para o caso contrário."
  solucao: |
    numero = int(input("Número: "))
    if numero % 2 == 0:
        print("par")
    else:
        print("ímpar")
  explicacao_solucao: |
    `numero % 2` é 0 para pares e 1 para ímpares (em Python, até para negativos: `-3 % 2` dá 1).
    Com `if/else`, exatamente um dos dois blocos roda, nunca os dois e nunca nenhum.
---
Com `else` ("senão"), você diz o que fazer quando a condição do `if` é falsa:

```python
saldo = 30
preco = 50
if saldo >= preco:
    print("Compra aprovada")
else:
    print("Saldo insuficiente")
```

```text
Saldo insuficiente
```

O `else` não tem condição: ele pega **todos** os casos que o `if` não pegou. Por isso também termina
com `:` e o bloco dele fica recuado, alinhado com o bloco do `if`.
