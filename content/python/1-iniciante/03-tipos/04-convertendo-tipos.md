---
titulo: Convertendo tipos
xp: 15
exercicio:
  enunciado: |
    A variável `texto` guarda `"25"`, mas como texto. Crie uma variável `numero` com esse valor
    convertido para inteiro e mostre `numero + 5`. A saída deve ser:

    ```text
    30
    ```
  codigo_inicial: |
    texto = "25"
    print(texto + 5)
  testes:
    - tipo: variavel
      nome: numero é um int
      variavel: numero
      tipo_esperado: int
    - tipo: variavel
      nome: numero vale 25
      variavel: numero
      esperado: 25
    - tipo: saida
      nome: Mostra 30
      esperado: "30"
  dicas:
    - "Execute o código inicial e leia o erro: o Python não sabe somar texto com número."
    - "`int(\"25\")` transforma o texto em número inteiro."
  solucao: |
    texto = "25"
    numero = int(texto)
    print(numero + 5)
  explicacao_solucao: |
    `"25"` e `25` parecem iguais, mas são tipos diferentes. `int(texto)` cria um número a partir
    do texto, e aí a soma funciona. Isso vai ser muito útil com `input()`, que sempre devolve texto.
---
Às vezes um valor está no tipo errado para o que você quer fazer:

```python
print("10" + 5)
```

O Python reclama com um `TypeError`: ele não sabe se você quer juntar textos ou somar números.
A solução é **converter** o valor:

| Função | Converte para | Exemplo |
|--------|---------------|---------|
| `int()` | inteiro | `int("42")` → `42` |
| `float()` | decimal | `float("3.5")` → `3.5` |
| `str()` | texto | `str(10)` → `"10"` |

```python
idade = 30
print("Idade: " + str(idade))
print(int("7") + 3)
```

```text
Idade: 30
10
```

Nem tudo pode ser convertido: `int("abc")` dá `ValueError`, porque "abc" não é um número.
