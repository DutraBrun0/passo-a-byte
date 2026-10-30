---
titulo: Lançando seus próprios erros
xp: 25
exercicio:
  enunciado: |
    Crie a função `sacar(saldo, valor)` que devolve o saldo depois do saque. Ela deve **lançar um
    `ValueError`** quando o saque for impossível:

    - valor zero ou negativo;
    - valor maior que o saldo.

    ```python
    sacar(100, 30)    # 70
    sacar(100, 150)   # ValueError
    sacar(100, -5)    # ValueError
    ```
  codigo_inicial: |
    def sacar(saldo, valor):
        return saldo - valor


    print(sacar(100, 30))
  testes:
    - tipo: funcao
      nome: Saque normal
      funcao: sacar
      args: [100, 30]
      esperado: 70
    - tipo: funcao
      nome: Saque de todo o saldo
      funcao: sacar
      args: [50, 50]
      esperado: 0
    - tipo: python
      nome: Saque maior que o saldo lança ValueError
      codigo: |
        try:
            sacar(100, 150)
        except ValueError:
            pass
        else:
            assert False
      mensagem: Use raise ValueError("...") quando o valor passar do saldo.
    - tipo: python
      nome: Valor negativo ou zero lança ValueError
      codigo: |
        for valor in (-5, 0):
            try:
                sacar(100, valor)
            except ValueError:
                pass
            else:
                assert False
      mensagem: Valores menores ou iguais a zero também são inválidos.
  dicas:
    - "Teste os casos inválidos com `if` **antes** de fazer a conta."
    - "`raise ValueError(\"Saldo insuficiente\")` interrompe a função com um erro."
  solucao: |
    def sacar(saldo, valor):
        if valor <= 0:
            raise ValueError("O valor do saque precisa ser positivo")
        if valor > saldo:
            raise ValueError("Saldo insuficiente")
        return saldo - valor


    print(sacar(100, 30))
  explicacao_solucao: |
    Por que lançar um erro em vez de devolver, por exemplo, `-1`? Porque um número esquisito pode passar
    despercebido e virar um saldo errado lá na frente. Um erro **não** passa despercebido: ou quem chamou
    trata com `try/except`, ou o programa para mostrando exatamente o que aconteceu.

    A mensagem do `ValueError` aparece para quem estiver depurando, então capriche nela.
---
Até agora você **tratou** erros lançados pelo Python. Suas funções também podem **lançar** erros,
com `raise`, quando recebem algo que não faz sentido:

```python
def definir_idade(idade):
    if idade < 0:
        raise ValueError("A idade não pode ser negativa")
    return idade


try:
    definir_idade(-3)
except ValueError as erro:
    print("Problema:", erro)
```

```text
Problema: A idade não pode ser negativa
```

O `as erro` guarda o erro numa variável, e `print(erro)` mostra a mensagem que foi passada no `raise`.

A regra prática: a função que **detecta** o problema lança o erro; quem **sabe o que fazer** com ele
(mostrar um aviso, pedir de novo) trata com `try/except`.
