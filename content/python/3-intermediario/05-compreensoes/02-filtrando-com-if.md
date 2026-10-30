---
titulo: Filtrando com if
xp: 20
exercicio:
  enunciado: |
    A partir de `palavras`, crie a lista `destaques` com as palavras de **mais de 5 letras**, em
    **maiúsculas**, usando uma única list comprehension:

    ```python
    ['PROGRAMAR', 'COMPUTADOR', 'TECLADO']
    ```
  codigo_inicial: |
    palavras = ["sol", "programar", "mesa", "computador", "teclado", "rato", "byte"]
    destaques = [p for p in palavras]
    print(destaques)
  testes:
    - tipo: variavel
      nome: destaques tem as palavras longas em maiúsculas
      variavel: destaques
      esperado: ["PROGRAMAR", "COMPUTADOR", "TECLADO"]
    - tipo: estrutura
      nome: Uma list comprehension, sem for comum
      usa: [ListComp, Compare]
      nao_usa: [For]
      mensagem: Ponha a condição no fim da compreensão, com if.
  dicas:
    - "O filtro vai no final: `[... for p in palavras if condição]`."
    - "A transformação vai no começo: `p.upper()`."
  solucao: |
    palavras = ["sol", "programar", "mesa", "computador", "teclado", "rato", "byte"]
    destaques = [p.upper() for p in palavras if len(p) > 5]
    print(destaques)
  explicacao_solucao: |
    A compreensão agora tem quatro partes: o que entra (`p.upper()`), a variável (`p`), a origem
    (`palavras`) e o filtro (`if len(p) > 5`). O filtro é testado **antes**: só as palavras que passam
    nele são transformadas e entram na lista.
---
Uma compreensão pode ter um `if` no final, que funciona como um **filtro**: só os itens que passam
na condição entram na nova lista.

```python
numeros = [3, 8, 1, 12, 7, 4]
pares = [n for n in numeros if n % 2 == 0]
print(pares)
```

```text
[8, 12, 4]
```

Dá para filtrar e transformar ao mesmo tempo:

```python
notas = [4.5, 8.0, 6.5, 9.5, 5.0]
aprovadas = [f"{n:.1f} ✓" for n in notas if n >= 6]
print(aprovadas)
```

```text
['8.0 ✓', '6.5 ✓', '9.5 ✓']
```

> Compreensões são ótimas quando cabem numa linha legível. Se a lógica tiver vários `if` e `else`, um
> `for` comum costuma ser mais claro.
