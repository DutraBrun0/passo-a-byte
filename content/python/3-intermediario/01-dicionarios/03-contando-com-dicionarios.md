---
titulo: "Desafio: contando palavras"
xp: 25
exercicio:
  enunciado: |
    Crie a função `contar_palavras(texto)` que devolve um dicionário dizendo quantas vezes cada
    palavra aparece, sem diferenciar maiúsculas de minúsculas:

    ```python
    contar_palavras("um dois um TRES dois um")
    # {'um': 3, 'dois': 2, 'tres': 1}
    ```
  codigo_inicial: |
    def contar_palavras(texto):
        contagem = {}
        # conte as palavras aqui
        return contagem


    print(contar_palavras("um dois um TRES dois um"))
  testes:
    - tipo: funcao
      nome: um dois um TRES dois um
      funcao: contar_palavras
      args: ["um dois um TRES dois um"]
      esperado: { um: 3, dois: 2, tres: 1 }
    - tipo: funcao
      nome: Maiúsculas contam como a mesma palavra
      funcao: contar_palavras
      args: ["Bola bola BOLA"]
      esperado: { bola: 3 }
    - tipo: funcao
      nome: Texto vazio dá dicionário vazio
      funcao: contar_palavras
      args: [""]
      esperado: {}
    - tipo: funcao
      nome: Frase com palavras diferentes
      funcao: contar_palavras
      args: ["o rato roeu a roupa do rei de roma"]
      esperado: { o: 1, rato: 1, roeu: 1, a: 1, roupa: 1, do: 1, rei: 1, de: 1, roma: 1 }
  dicas:
    - "Comece com `texto.lower().split()` para ter a lista de palavras."
    - "`contagem.get(palavra, 0)` devolve a contagem atual, ou 0 se a palavra ainda não apareceu."
    - "A cada palavra: `contagem[palavra] = contagem.get(palavra, 0) + 1`."
  solucao: |
    def contar_palavras(texto):
        contagem = {}
        for palavra in texto.lower().split():
            contagem[palavra] = contagem.get(palavra, 0) + 1
        return contagem


    print(contar_palavras("um dois um TRES dois um"))
  explicacao_solucao: |
    O truque é o `get` com valor padrão. Na primeira vez que `"um"` aparece, `contagem.get("um", 0)`
    devolve 0 e a contagem vira 1. Nas próximas, devolve o valor atual. Sem o `get`, seria preciso um
    `if palavra in contagem:` para não cair num `KeyError`.

    Esse padrão é tão comum que a biblioteca padrão tem uma ferramenta pronta para ele:
    `collections.Counter(texto.lower().split())`.
---
Dicionários são perfeitos para **contar**: a chave é o que está sendo contado e o valor, quantas
vezes apareceu.

O método `get` ajuda muito. Ele busca uma chave e, se ela não existir, devolve um valor padrão em vez
de dar erro:

```python
estoque = {"maçã": 3}
print(estoque.get("maçã", 0))    # 3
print(estoque.get("banana", 0))  # 0, sem KeyError
```

Contando as letras de uma palavra:

```python
letras = {}
for letra in "arara":
    letras[letra] = letras.get(letra, 0) + 1
print(letras)
```

```text
{'a': 3, 'r': 2}
```
