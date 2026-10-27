---
titulo: Textos (strings)
xp: 15
exercicio:
  enunciado: |
    Junte `primeiro` e `ultimo` em uma nova variável `completo`, com um espaço no meio.
    Depois mostre `completo` e, na linha de baixo, a quantidade de caracteres dele:

    ```text
    Ada Lovelace
    12
    ```
  codigo_inicial: |
    primeiro = "Ada"
    ultimo = "Lovelace"
    completo = primeiro + ultimo
    print(completo)
  testes:
    - tipo: variavel
      nome: completo vale "Ada Lovelace"
      variavel: completo
      esperado: Ada Lovelace
    - tipo: saida
      nome: Mostra o nome e o tamanho
      esperado: |
        Ada Lovelace
        12
    - tipo: estrutura
      nome: Usa len() para contar
      min_chamadas: { len: 1 }
      mensagem: Use len(completo) em vez de contar à mão.
  dicas:
    - "O `+` cola os textos sem espaço nenhum. Some também um `\" \"` no meio."
    - "`len(texto)` devolve quantos caracteres o texto tem, contando espaços."
  solucao: |
    primeiro = "Ada"
    ultimo = "Lovelace"
    completo = primeiro + " " + ultimo
    print(completo)
    print(len(completo))
  explicacao_solucao: |
    `primeiro + " " + ultimo` cola três textos: "Ada", um espaço e "Lovelace". `len(completo)`
    conta todos os caracteres, inclusive o espaço: 3 + 1 + 8 = 12.
---
Textos em Python são do tipo `str` (de *string*, "cadeia" de caracteres). Eles ficam entre aspas:

```python
nome = "Bit"
saudacao = 'Olá'
```

## Juntando textos

O operador `+` **concatena** (cola) textos:

```python
print("pass" + "o")
print("Olá, " + nome + "!")
```

```text
passo
Olá, Bit!
```

Repare que o `+` não coloca espaço sozinho. Se quiser espaço, ele precisa estar dentro das aspas.

## Tamanho de um texto

`len()` conta os caracteres:

```python
print(len("Python"))
```

```text
6
```

E `*` repete um texto: `"ha" * 3` vira `"hahaha"`.
