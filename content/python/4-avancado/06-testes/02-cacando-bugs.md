---
titulo: Caçando bugs com testes
xp: 25
exercicio:
  enunciado: |
    Os testes no fim do código mostram que `maior_de_tres` tem um bug. Rode o código, leia qual
    `assert` falhou e **corrija a função**, sem mexer nos testes.
  codigo_inicial: |
    def maior_de_tres(a, b, c):
        if a > b and a > c:
            return a
        if b > a and b > c:
            return b
        return c


    # Testes: não mexa aqui embaixo
    assert maior_de_tres(1, 2, 3) == 3
    assert maior_de_tres(9, 2, 3) == 9
    assert maior_de_tres(1, 8, 3) == 8
    assert maior_de_tres(5, 5, 1) == 5, "empate entre a e b"
    assert maior_de_tres(2, 7, 7) == 7, "empate entre b e c"
    print("Todos os testes passaram!")
  testes:
    - tipo: saida
      nome: Todos os asserts passam
      esperado: Todos os testes passaram!
    - tipo: funcao
      nome: Empate entre a e b no topo
      funcao: maior_de_tres
      args: [5, 5, 1]
      esperado: 5
    - tipo: funcao
      nome: Empate entre a e c no topo
      funcao: maior_de_tres
      args: [4, 1, 4]
      esperado: 4
    - tipo: funcao
      nome: Três iguais
      funcao: maior_de_tres
      args: [6, 6, 6]
      esperado: 6
    - tipo: funcao
      nome: Números negativos
      funcao: maior_de_tres
      args: [-5, -2, -9]
      esperado: -2
    - tipo: estrutura
      nome: Mantém os testes
      usa: [Assert]
      min_chamadas: { maior_de_tres: 5 }
      mensagem: Corrija a função, não os testes.
  dicas:
    - "O `assert` que falha é o do empate entre `a` e `b`: com `(5, 5, 1)`, a função devolve 1."
    - "Com `>`, um empate faz as duas primeiras condições falharem. Qual operador aceita empate?"
    - "Trocar `>` por `>=` resolve. Outra saída: `return max(a, b, c)`."
  solucao: |
    def maior_de_tres(a, b, c):
        if a >= b and a >= c:
            return a
        if b >= a and b >= c:
            return b
        return c


    # Testes: não mexa aqui embaixo
    assert maior_de_tres(1, 2, 3) == 3
    assert maior_de_tres(9, 2, 3) == 9
    assert maior_de_tres(1, 8, 3) == 8
    assert maior_de_tres(5, 5, 1) == 5, "empate entre a e b"
    assert maior_de_tres(2, 7, 7) == 7, "empate entre b e c"
    print("Todos os testes passaram!")
  explicacao_solucao: |
    Com `(5, 5, 1)`, `a > b` é `5 > 5`, falso. O mesmo acontece com `b > a`. A função cai no
    `return c` e devolve 1. Os três primeiros testes não pegavam o bug porque não tinham empates.

    Repare no fluxo: o teste **mostrou** que havia um bug e **qual** era o caso problemático. Sem ele,
    o erro só apareceria muito depois, no meio de outra coisa, e seria bem mais difícil de achar.
---
Testes não servem só para provar que o código funciona: servem para **encontrar** onde ele não
funciona. O fluxo de trabalho é:

1. Rode os testes.
2. Leia **qual** falhou e com quais valores.
3. Simule o código à mão com esses valores, linha por linha.
4. Corrija e rode de novo.

Uma boa prática é acrescentar uma mensagem no `assert`, para lembrar o que aquele caso verifica:

```python
assert desconto(100, 0) == 100, "sem desconto, o preço não muda"
```

Quando um bug é corrigido, o teste que o revelou **fica** no código. Se alguém reintroduzir o mesmo
erro no futuro, ele vai ser pego na hora. Esses testes se chamam **testes de regressão**.

> Bugs adoram **casos de borda**: empates, zero, números negativos, listas vazias, o primeiro e o
> último item. Pense neles sempre que escrever um teste.
