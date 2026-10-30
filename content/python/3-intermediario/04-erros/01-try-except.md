---
titulo: try e except
xp: 20
exercicio:
  enunciado: |
    O programa abaixo quebra se a pessoa digitar algo que não é número. Proteja a conversão com
    `try`/`except` para mostrar uma mensagem amigável em vez de um erro:

    ```text
    Idade: quinze
    Isso não é um número inteiro.
    ```

    Com uma entrada válida, o comportamento continua o mesmo:

    ```text
    Idade: 15
    Ano que vem você terá 16 anos.
    ```
  codigo_inicial: |
    idade = int(input("Idade: "))
    print(f"Ano que vem você terá {idade + 1} anos.")
  entrada: ["quinze"]
  testes:
    - tipo: saida
      nome: Entrada válida
      entrada: ["15"]
      esperado: Ano que vem você terá 16 anos.
    - tipo: saida
      nome: Texto no lugar do número
      entrada: ["quinze"]
      esperado: Isso não é um número inteiro.
    - tipo: saida
      nome: Número decimal
      entrada: ["15.5"]
      esperado: Isso não é um número inteiro.
    - tipo: estrutura
      nome: Usa try/except
      usa: [Try]
      mensagem: Coloque a conversão dentro de um try e trate o ValueError no except.
  dicas:
    - "O erro que o `int()` lança com um texto inválido é o `ValueError`."
    - "Estrutura: `try:` com o código arriscado, `except ValueError:` com a mensagem."
  solucao: |
    try:
        idade = int(input("Idade: "))
        print(f"Ano que vem você terá {idade + 1} anos.")
    except ValueError:
        print("Isso não é um número inteiro.")
  explicacao_solucao: |
    O Python executa o bloco do `try` normalmente. Se alguma linha lançar um `ValueError`, ele pula
    o resto do bloco e vai direto para o `except`. Se nada der errado, o `except` é ignorado.

    Sempre diga **qual** erro está tratando. Um `except:` sozinho engoliria qualquer problema, até
    erros de digitação no seu código, e esconderia bugs.
---
Alguns erros não são culpa do programa, e sim do mundo lá fora: a pessoa digitou errado, o arquivo
não existe, a internet caiu. Para esses casos, o Python tem o `try` ("tente"):

```python
try:
    numero = int("abc")
    print("Converteu!")
except ValueError:
    print("Não deu para converter.")
print("O programa continua.")
```

```text
Não deu para converter.
O programa continua.
```

Sem o `try`, o programa pararia no `int("abc")` com a mensagem vermelha. Com ele, o erro vira um
caminho alternativo.

Alguns erros comuns e quando aparecem:

| Erro | Quando |
|------|--------|
| `ValueError` | o tipo está certo, mas o valor não: `int("abc")` |
| `ZeroDivisionError` | divisão por zero |
| `KeyError` | chave que não existe num dicionário |
| `IndexError` | posição que não existe numa lista |
| `TypeError` | tipo errado: `"a" + 1` |
