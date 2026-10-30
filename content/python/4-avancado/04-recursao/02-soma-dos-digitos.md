---
titulo: Recursão com números
xp: 25
exercicio:
  enunciado: |
    Escreva a função recursiva `soma_digitos(n)` que soma os dígitos de um número inteiro positivo,
    sem laços e sem converter o número para texto:

    ```python
    soma_digitos(1234)   # 10  (1 + 2 + 3 + 4)
    soma_digitos(7)      # 7
    ```
  codigo_inicial: |
    def soma_digitos(n):
        return n % 10


    print(soma_digitos(1234))
  testes:
    - tipo: funcao
      nome: soma_digitos(1234)
      funcao: soma_digitos
      args: [1234]
      esperado: 10
    - tipo: funcao
      nome: soma_digitos(7)
      funcao: soma_digitos
      args: [7]
      esperado: 7
    - tipo: funcao
      nome: soma_digitos(0)
      funcao: soma_digitos
      args: [0]
      esperado: 0
    - tipo: funcao
      nome: soma_digitos(99999)
      funcao: soma_digitos
      args: [99999]
      esperado: 45
    - tipo: estrutura
      nome: Recursivo, sem laços nem texto
      nao_usa: [For, While, comprehension]
      max_chamadas: { str: 0 }
      min_chamadas: { soma_digitos: 2 }
      mensagem: Use % 10 para pegar o último dígito e // 10 para tirá-lo, chamando soma_digitos de novo.
  dicas:
    - "`n % 10` é o último dígito: `1234 % 10` dá 4."
    - "`n // 10` é o número sem o último dígito: `1234 // 10` dá 123."
    - "Caso base: quando `n` for menor que 10, ele já é a resposta."
  solucao: |
    def soma_digitos(n):
        if n < 10:
            return n
        return n % 10 + soma_digitos(n // 10)


    print(soma_digitos(1234))
  explicacao_solucao: |
    A soma dos dígitos de 1234 é "o último dígito (4) + a soma dos dígitos de 123". O problema encolhe
    um dígito por chamada até sobrar um número de um dígito só, que é a própria resposta:

    ```text
    soma_digitos(1234) = 4 + soma_digitos(123)
                       = 4 + 3 + soma_digitos(12)
                       = 4 + 3 + 2 + soma_digitos(1)
                       = 4 + 3 + 2 + 1
    ```

    Repare como `%` e `//`, do nível Iniciante, viram as ferramentas para "desmontar" um número.
---
O segredo para pensar recursivamente é procurar o problema **menor** escondido dentro do problema.
Por exemplo, a soma de uma lista:

> A soma de `[3, 5, 2]` é `3` + a soma de `[5, 2]`.

```python
def somar(lista):
    if not lista:              # lista vazia: soma 0
        return 0
    return lista[0] + somar(lista[1:])


print(somar([3, 5, 2]))
```

```text
10
```

Faça sempre duas perguntas:

1. **Qual é o caso mais simples possível?** (lista vazia, número de um dígito, zero...)
2. **Como eu reduzo o problema um passo e confio que a função resolve o resto?**

O "confiar" é a parte difícil no começo: escreva a chamada recursiva como se a função já funcionasse.
