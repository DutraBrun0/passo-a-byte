---
titulo: Números vindos do teclado
xp: 15
exercicio:
  enunciado: |
    Leia a idade da pessoa e mostre quantos anos ela terá no ano que vem. Para a entrada `20`:

    ```text
    Ano que vem você terá 21 anos
    ```
  codigo_inicial: |
    idade = input("Sua idade: ")
    print("Ano que vem você terá", idade + 1, "anos")
  entrada: ["20"]
  testes:
    - tipo: saida
      nome: Entrada 20 mostra 21
      entrada: ["20"]
      esperado: Ano que vem você terá 21 anos
    - tipo: saida
      nome: Entrada 0 mostra 1
      entrada: ["0"]
      esperado: Ano que vem você terá 1 anos
    - tipo: saida
      nome: Entrada 99 mostra 100
      entrada: ["99"]
      esperado: Ano que vem você terá 100 anos
  dicas:
    - "O `input()` devolve o texto `\"20\"`, e texto + número dá erro."
    - "Converta na hora de ler: `idade = int(input(\"Sua idade: \"))`."
  solucao: |
    idade = int(input("Sua idade: "))
    print("Ano que vem você terá", idade + 1, "anos")
  explicacao_solucao: |
    `int(input(...))` faz duas coisas em sequência: lê o texto e converte para inteiro. Assim, a
    variável `idade` já nasce como número, e `idade + 1` funciona.
---
Lembra que `input()` sempre devolve texto? Isso causa um erro clássico:

```python
quantidade = input("Quantas pizzas? ")   # a pessoa digita 2
print(quantidade * 3)
```

```text
222
```

O resultado é `222`, e não `6`, porque `"2" * 3` repete o texto três vezes!
A solução é converter o que foi lido:

```python
quantidade = int(input("Quantas pizzas? "))
print(quantidade * 3)
```

```text
6
```

Use `int()` para números inteiros e `float()` quando puder haver casas decimais, como em preços e alturas.
