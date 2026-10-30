---
titulo: Acumulando valores
xp: 20
exercicio:
  enunciado: |
    Leia um número `n` e mostre a soma de todos os inteiros de 1 até `n`. Para a entrada `5`:

    ```text
    A soma de 1 a 5 é 15
    ```

    Faça a soma com um `for` e uma variável acumuladora, sem usar a função `sum()`.
  codigo_inicial: |
    n = int(input("Até quanto? "))
    soma = 0
    # some os números de 1 até n aqui

    print(f"A soma de 1 a {n} é {soma}")
  entrada: ["5"]
  testes:
    - tipo: saida
      nome: Entrada 5
      entrada: ["5"]
      esperado: A soma de 1 a 5 é 15
    - tipo: saida
      nome: Entrada 100
      entrada: ["100"]
      esperado: A soma de 1 a 100 é 5050
    - tipo: saida
      nome: Entrada 1
      entrada: ["1"]
      esperado: A soma de 1 a 1 é 1
    - tipo: estrutura
      nome: Usa for e não usa sum()
      usa: [For]
      max_chamadas: { sum: 0 }
      mensagem: O objetivo é praticar o acumulador. Some dentro de um for com soma += numero.
  dicas:
    - "Para incluir o próprio `n`, o range precisa ir até `n + 1`."
    - "Dentro do laço, faça `soma += numero` para ir acumulando."
  solucao: |
    n = int(input("Até quanto? "))
    soma = 0
    for numero in range(1, n + 1):
        soma += numero
    print(f"A soma de 1 a {n} é {soma}")
  explicacao_solucao: |
    A variável `soma` começa em 0 e, a cada volta, recebe mais um número. Para `n = 5`:

    | Volta | numero | soma |
    |:-----:|:------:|:----:|
    | 1 | 1 | 1 |
    | 2 | 2 | 3 |
    | 3 | 3 | 6 |
    | 4 | 4 | 10 |
    | 5 | 5 | 15 |

    Esse padrão (começar com um valor neutro e ir somando) se chama **acumulador** e aparece o tempo todo.
---
Um uso muito comum de laços é **acumular**: ir juntando um resultado a cada volta.

```python
total = 0
for preco in range(10, 31, 10):
    total += preco
    print("Somei", preco, "e o total ficou", total)
```

```text
Somei 10 e o total ficou 10
Somei 20 e o total ficou 30
Somei 30 e o total ficou 60
```

O segredo é criar a variável **antes** do laço. Se ela fosse criada dentro, voltaria a zero a cada volta.

> Para contar quantas vezes algo acontece, o padrão é o mesmo: comece com `contador = 0` e faça `contador += 1`.
