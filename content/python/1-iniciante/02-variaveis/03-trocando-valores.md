---
titulo: Trocando valores
xp: 15
exercicio:
  enunciado: |
    As cores do time estão invertidas. Troque os valores de `principal` e `detalhe`, de modo que
    `principal` fique com `"laranja"` e `detalhe` com `"azul"`.

    Não escreva os textos `"laranja"` e `"azul"` de novo: troque usando as próprias variáveis.
  codigo_inicial: |
    principal = "azul"
    detalhe = "laranja"
    # troque os valores aqui

    print(principal, detalhe)
  testes:
    - tipo: variavel
      nome: principal fica "laranja"
      variavel: principal
      esperado: laranja
    - tipo: variavel
      nome: detalhe fica "azul"
      variavel: detalhe
      esperado: azul
    - tipo: saida
      nome: Mostra "laranja azul"
      esperado: laranja azul
  dicas:
    - "Se você fizer `principal = detalhe` primeiro, o valor antigo de `principal` se perde. Guarde-o antes em uma terceira variável."
    - "O Python tem um atalho: `a, b = b, a` troca os dois de uma vez."
  solucao: |
    principal = "azul"
    detalhe = "laranja"
    principal, detalhe = detalhe, principal
    print(principal, detalhe)
  explicacao_solucao: |
    Na linha `principal, detalhe = detalhe, principal`, o Python primeiro lê os dois valores da
    direita (`"laranja"`, `"azul"`) e só depois os guarda nos nomes da esquerda. Por isso nenhum se perde.

    O jeito clássico, que funciona em qualquer linguagem, usa uma variável auxiliar:

    ```python
    auxiliar = principal
    principal = detalhe
    detalhe = auxiliar
    ```
---
Trocar o valor de duas variáveis parece fácil, mas tem uma pegadinha:

```python
a = 1
b = 2
a = b   # agora a vale 2... e o 1 sumiu!
b = a   # b continua 2
```

Ao fazer `a = b`, o valor antigo de `a` é apagado. Existem duas saídas:

1. Guardar o valor numa **variável auxiliar** antes de sobrescrever.
2. Usar a **atribuição múltipla** do Python, que lê tudo antes de guardar:

```python
x, y = 10, 20
print(x, y)
```

```text
10 20
```
