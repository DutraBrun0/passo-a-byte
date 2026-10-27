---
titulo: Inteiros e decimais
xp: 10
exercicio:
  enunciado: |
    Crie as variáveis:

    - `idade` com o número inteiro `20`;
    - `altura` com o número decimal `1.75`.

    Depois mostre o tipo de cada uma com `print(type(...))`.
  codigo_inicial: |
    idade = "20"
    altura = "1,75"
    print(type(idade))
    print(type(altura))
  testes:
    - tipo: variavel
      nome: idade é um int
      variavel: idade
      tipo_esperado: int
    - tipo: variavel
      nome: idade vale 20
      variavel: idade
      esperado: 20
    - tipo: variavel
      nome: altura é um float
      variavel: altura
      tipo_esperado: float
    - tipo: variavel
      nome: altura vale 1.75
      variavel: altura
      esperado: 1.75
    - tipo: saida
      nome: Mostra os dois tipos
      esperado: |
        <class 'int'>
        <class 'float'>
  dicas:
    - Números não levam aspas. Com aspas, viram texto.
    - "Decimais usam **ponto**, não vírgula: `1.75`."
  solucao: |
    idade = 20
    altura = 1.75
    print(type(idade))
    print(type(altura))
  explicacao_solucao: |
    Sem aspas, `20` é um `int` e `1.75` é um `float`. No código inicial, as aspas transformavam
    os dois em texto (`str`), e a vírgula em `"1,75"` também não funcionaria como número:
    em Python, a vírgula separa valores, e o ponto separa as casas decimais.
---
Todo valor em Python tem um **tipo**. Para números, os dois mais comuns são:

| Tipo | Nome | Exemplos |
|------|------|----------|
| `int` | inteiro | `7`, `0`, `-3`, `2026` |
| `float` | decimal ("ponto flutuante") | `3.14`, `0.5`, `-2.0` |

A função `type()` diz o tipo de qualquer valor:

```python
print(type(42))
print(type(3.14))
```

```text
<class 'int'>
<class 'float'>
```

Atenção ao separador: em Python o decimal usa **ponto**. `3,14` não é um número, são dois valores separados por vírgula.

A divisão `/` sempre devolve um `float`, mesmo quando a conta é exata: `10 / 2` dá `5.0`.
