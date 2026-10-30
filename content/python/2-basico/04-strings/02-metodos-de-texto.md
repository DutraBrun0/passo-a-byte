---
titulo: Métodos de texto
xp: 20
exercicio:
  enunciado: |
    Num formulário, as pessoas digitam o nome de qualquer jeito. Leia um nome e mostre-o arrumado:
    sem espaços sobrando e com cada palavra começando em maiúscula. Depois mostre quantas palavras ele
    tem. Para a entrada `"  ana   MARIA silva "`:

    ```text
    Ana Maria Silva
    Palavras: 3
    ```
  codigo_inicial: |
    nome = input("Nome: ")
    print(nome.title())
  entrada: ["  ana   MARIA silva "]
  testes:
    - tipo: saida
      nome: Espaços extras e maiúsculas misturadas
      entrada: ["  ana   MARIA silva "]
      esperado: |
        Ana Maria Silva
        Palavras: 3
    - tipo: saida
      nome: Duas palavras
      entrada: ["bruno    dutra"]
      esperado: |
        Bruno Dutra
        Palavras: 2
    - tipo: saida
      nome: Uma palavra só
      entrada: ["   LUA"]
      esperado: |
        Lua
        Palavras: 1
  dicas:
    - "`texto.split()` sem argumentos quebra o texto nos espaços e já ignora os espaços repetidos."
    - "`\" \".join(lista)` faz o caminho inverso: junta as palavras com um espaço entre elas."
    - "`title()` deixa a primeira letra de cada palavra maiúscula e o resto minúsculo."
  solucao: |
    nome = input("Nome: ")
    palavras = nome.split()
    arrumado = " ".join(palavras).title()
    print(arrumado)
    print("Palavras:", len(palavras))
  explicacao_solucao: |
    `split()` transforma `"  ana   MARIA silva "` em `['ana', 'MARIA', 'silva']`: os espaços
    sobrando somem. O `join` remonta com exatamente um espaço entre as palavras e o `title()` cuida
    das maiúsculas. De quebra, o tamanho da lista de palavras é a contagem pedida.

    Só `strip()` não bastaria: ele tira os espaços das **pontas**, mas não os do meio.
---
Textos vêm com vários **métodos**, funções que você chama com um ponto depois do texto. Nenhum deles
altera o original: todos devolvem um texto novo.

| Método | Exemplo | Resultado |
|--------|---------|-----------|
| `upper()` | `"oi".upper()` | `"OI"` |
| `lower()` | `"OI".lower()` | `"oi"` |
| `title()` | `"ana lima".title()` | `"Ana Lima"` |
| `strip()` | `"  oi  ".strip()` | `"oi"` |
| `replace(a, b)` | `"bola".replace("o", "0")` | `"b0la"` |
| `count(x)` | `"banana".count("a")` | `3` |
| `startswith(x)` | `"python".startswith("py")` | `True` |

Dois métodos andam juntos: `split` quebra um texto em lista e `join` junta uma lista em texto.

```python
data = "25/12/2025"
partes = data.split("/")
print(partes)
print("-".join(partes))
```

```text
['25', '12', '2025']
25-12-2025
```
