---
titulo: Compreensões de dicionário
xp: 25
exercicio:
  enunciado: |
    A loja vai dar **10% de desconto** nos produtos que custam **mais de 50**. Crie o dicionário
    `promocao` só com esses produtos e seus novos preços, arredondados para 2 casas, usando uma
    compreensão de dicionário:

    ```python
    {'fone': 81.0, 'mochila': 134.91}
    ```
  codigo_inicial: |
    precos = {"caneta": 3.5, "fone": 90.0, "caderno": 25.0, "mochila": 149.9}
    promocao = {}
    print(promocao)
  testes:
    - tipo: variavel
      nome: promocao tem fone e mochila com desconto
      variavel: promocao
      esperado: { fone: 81.0, mochila: 134.91 }
    - tipo: estrutura
      nome: Usa compreensão de dicionário
      usa: [DictComp]
      nao_usa: [For]
      mensagem: "Escreva no formato {chave: valor for chave, valor in precos.items() if ...}."
  dicas:
    - "A compreensão de dicionário usa chaves e dois-pontos: `{k: v for k, v in ...}`."
    - "Percorra `precos.items()` para ter o nome e o preço juntos."
    - "Novo preço: `round(preco * 0.9, 2)`. Filtro: `if preco > 50`."
  solucao: |
    precos = {"caneta": 3.5, "fone": 90.0, "caderno": 25.0, "mochila": 149.9}
    promocao = {nome: round(preco * 0.9, 2) for nome, preco in precos.items() if preco > 50}
    print(promocao)
  explicacao_solucao: |
    É a mesma ideia da list comprehension, mas entre chaves e com `chave: valor` no começo. Como
    `items()` entrega pares, a compreensão desempacota em `nome, preco`, filtra pelo preço e monta o
    novo par com o preço ajustado.

    Sem o `round`, a mochila custaria `134.91000000000003`: números decimais no computador nem sempre
    são exatos.
---
Além de listas, dá para criar **dicionários** e **conjuntos** com compreensões. A diferença está nos
símbolos:

```python
nomes = ["ana", "bia", "caio"]

# dicionário: chave: valor
tamanhos = {nome: len(nome) for nome in nomes}
print(tamanhos)

# conjunto: só o valor, entre chaves
iniciais = {nome[0] for nome in nomes}
print(iniciais)
```

```text
{'ana': 3, 'bia': 3, 'caio': 4}
{'a', 'b', 'c'}
```

Um truque útil: inverter um dicionário, trocando chaves por valores.

```python
codigo = {"a": 1, "b": 2}
print({valor: chave for chave, valor in codigo.items()})
```

```text
{1: 'a', 2: 'b'}
```
