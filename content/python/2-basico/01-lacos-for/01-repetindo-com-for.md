---
titulo: Repetindo com for
xp: 15
exercicio:
  enunciado: |
    Faça uma contagem regressiva de **10 até 1**, um número por linha, e depois mostre `Já!`:

    ```text
    10
    9
    8
    ...
    1
    Já!
    ```

    Use um `for`: no máximo dois `print` no programa inteiro.
  codigo_inicial: |
    print(10)
    print(9)
    # ... troque tudo isso por um for
  testes:
    - tipo: saida
      nome: Conta de 10 até 1 e mostra "Já!"
      esperado: |
        10
        9
        8
        7
        6
        5
        4
        3
        2
        1
        Já!
    - tipo: estrutura
      nome: Usa um for com no máximo dois print
      usa: [For]
      max_chamadas: { print: 2 }
      mensagem: Um print fica dentro do for (para os números) e outro fora, depois do laço.
  dicas:
    - "`range(inicio, fim, passo)` aceita passo negativo para contar para trás."
    - "O `fim` nunca entra: para chegar até 1 descendo, o fim precisa ser 0."
    - "O `print(\"Já!\")` fica sem recuo, fora do laço, para rodar uma vez só."
  solucao: |
    for numero in range(10, 0, -1):
        print(numero)
    print("Já!")
  explicacao_solucao: |
    `range(10, 0, -1)` gera 10, 9, 8, ..., 1: começa em 10, anda de -1 em -1 e para **antes** de chegar
    no 0. O `print(numero)` tem recuo, então roda a cada volta. O `print("Já!")` não tem, então só
    roda depois que o laço termina.
---
Imagine mostrar os números de 1 a 100 com cem `print`. Para repetir uma tarefa, usamos um **laço**.
O mais comum em Python é o `for`:

```python
for i in range(5):
    print("Volta", i)
```

```text
Volta 0
Volta 1
Volta 2
Volta 3
Volta 4
```

O que está **recuado** (com 4 espaços) embaixo do `for` é o corpo do laço: ele roda uma vez para cada
valor. A cada volta, a variável `i` recebe o próximo número.

## As três formas do range

| Chamada | Gera |
|---------|------|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(2, 6)` | 2, 3, 4, 5 |
| `range(0, 10, 3)` | 0, 3, 6, 9 |

Repare que o número final **nunca** entra. `range(2, 6)` para no 5.
