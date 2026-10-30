---
titulo: Pensando recursivamente
xp: 20
exercicio:
  enunciado: |
    Escreva a função `fatorial(n)` de forma **recursiva**, sem `for` nem `while`. O fatorial de `n` é
    `n × (n-1) × ... × 1`, e o fatorial de 0 é 1:

    ```python
    fatorial(5)   # 120  (5 × 4 × 3 × 2 × 1)
    fatorial(0)   # 1
    ```
  codigo_inicial: |
    def fatorial(n):
        resultado = 1
        for i in range(2, n + 1):
            resultado *= i
        return resultado


    print(fatorial(5))
  testes:
    - tipo: funcao
      nome: fatorial(0)
      funcao: fatorial
      args: [0]
      esperado: 1
    - tipo: funcao
      nome: fatorial(1)
      funcao: fatorial
      args: [1]
      esperado: 1
    - tipo: funcao
      nome: fatorial(5)
      funcao: fatorial
      args: [5]
      esperado: 120
    - tipo: funcao
      nome: fatorial(10)
      funcao: fatorial
      args: [10]
      esperado: 3628800
    - tipo: estrutura
      nome: Recursivo, sem laços
      nao_usa: [For, While]
      min_chamadas: { fatorial: 2 }
      mensagem: A função deve chamar a si mesma, com n - 1, em vez de usar um laço.
  dicas:
    - "Caso base: se `n` for 0, devolva 1."
    - "Caso recursivo: `n! = n × (n-1)!`, ou seja, `return n * fatorial(n - 1)`."
  solucao: |
    def fatorial(n):
        if n == 0:
            return 1
        return n * fatorial(n - 1)


    print(fatorial(5))
  explicacao_solucao: |
    Acompanhe `fatorial(3)`:

    ```text
    fatorial(3) = 3 * fatorial(2)
                      fatorial(2) = 2 * fatorial(1)
                                        fatorial(1) = 1 * fatorial(0)
                                                          fatorial(0) = 1
    ```

    As chamadas vão se empilhando até o caso base. Daí os resultados voltam, de dentro para fora:
    `1 → 1 → 2 → 6`.
---
Uma função **recursiva** é uma função que chama a si mesma. A ideia é resolver um problema grande
usando a resposta de uma versão **menor** do mesmo problema.

Toda recursão precisa de duas partes:

1. **Caso base**: um caso tão simples que a resposta é direta, sem chamar a função de novo.
2. **Caso recursivo**: reduz o problema e chama a função para o pedaço menor.

```python
def contagem(n):
    if n == 0:              # caso base
        print("Fogo!")
        return
    print(n)
    contagem(n - 1)         # caso recursivo, com um problema menor


contagem(3)
```

```text
3
2
1
Fogo!
```

Sem o caso base, a função chamaria a si mesma para sempre, até o Python desistir com um
`RecursionError`.
