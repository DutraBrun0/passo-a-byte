---
titulo: Mudando o valor
xp: 10
exercicio:
  enunciado: |
    O jogador começa com `0` pontos e pega **três moedas**, cada uma valendo `10` pontos.

    Atualize a variável `pontos` três vezes com `+=` (uma vez por moeda) para que o programa mostre `30` no final.
  codigo_inicial: |
    pontos = 0
    # o jogador pegou três moedas de 10 pontos

    print(pontos)
  testes:
    - tipo: variavel
      nome: pontos termina valendo 30
      variavel: pontos
      esperado: 30
    - tipo: saida
      nome: Mostra 30
      esperado: "30"
    - tipo: estrutura
      nome: Soma com += em vez de escrever 30 direto
      usa: [AugAssign]
      mensagem: Use pontos += 10 para cada moeda.
  dicas:
    - "`pontos = pontos + 10` pega o valor atual, soma 10 e guarda de volta."
    - "O atalho `pontos += 10` faz a mesma coisa."
  solucao: |
    pontos = 0
    pontos += 10
    pontos += 10
    pontos += 10
    print(pontos)
  explicacao_solucao: |
    Cada `pontos += 10` lê o valor atual de `pontos`, soma 10 e guarda o resultado no mesmo nome.
    Depois de três vezes, `pontos` vale 30. A ordem importa: o `print` precisa vir depois das somas.
---
Uma variável pode receber um novo valor a qualquer momento. O valor antigo é substituído:

```python
vidas = 3
vidas = 2
print(vidas)
```

```text
2
```

Também dá para calcular o novo valor **a partir do antigo**:

```python
nivel = 1
nivel = nivel + 1   # lê 1, soma 1, guarda 2
nivel += 1          # atalho: agora vale 3
```

Existem atalhos parecidos para outras contas: `-=`, `*=` e `/=`.
