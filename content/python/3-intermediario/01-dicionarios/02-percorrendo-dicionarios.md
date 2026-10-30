---
titulo: Percorrendo dicionários
xp: 20
exercicio:
  enunciado: |
    Monte o cupom da padaria. Para cada item do `carrinho`, mostre a quantidade, o preço unitário
    (do dicionário `precos`) e o subtotal. No fim, mostre o total:

    ```text
    pão: 6 x 0.5 = 3.0
    leite: 2 x 4.75 = 9.5
    café: 1 x 12.0 = 12.0
    Total: 24.5
    ```

    Guarde o total na variável `total`.
  codigo_inicial: |
    precos = {"pão": 0.5, "leite": 4.75, "café": 12.0, "bolo": 18.0}
    carrinho = {"pão": 6, "leite": 2, "café": 1}
    total = 0
    # percorra o carrinho aqui

    print("Total:", total)
  testes:
    - tipo: saida
      nome: Mostra o cupom completo
      esperado: |
        pão: 6 x 0.5 = 3.0
        leite: 2 x 4.75 = 9.5
        café: 1 x 12.0 = 12.0
        Total: 24.5
    - tipo: variavel
      nome: total vale 24.5
      variavel: total
      esperado: 24.5
    - tipo: estrutura
      nome: Percorre o carrinho com for
      usa: [For]
      mensagem: Use for item, quantidade in carrinho.items().
  dicas:
    - "`carrinho.items()` entrega os pares chave e valor: `for item, quantidade in carrinho.items():`."
    - "O preço do item está em `precos[item]`."
    - "Acumule o subtotal em `total` a cada volta."
  solucao: |
    precos = {"pão": 0.5, "leite": 4.75, "café": 12.0, "bolo": 18.0}
    carrinho = {"pão": 6, "leite": 2, "café": 1}
    total = 0
    for item, quantidade in carrinho.items():
        preco = precos[item]
        subtotal = quantidade * preco
        print(f"{item}: {quantidade} x {preco} = {subtotal}")
        total += subtotal
    print("Total:", total)
  explicacao_solucao: |
    Os dois dicionários usam as **mesmas chaves** (os nomes dos produtos). Isso permite percorrer um
    deles e consultar o outro: o `item` que vem do carrinho é a chave para achar o preço.

    O bolo existe em `precos` mas não no carrinho, então nunca aparece: quem manda no laço é o carrinho.
---
Um `for` direto num dicionário percorre as **chaves**:

```python
idades = {"Ana": 15, "Bia": 17, "Caio": 16}
for nome in idades:
    print(nome, idades[nome])
```

Há três jeitos de ver o dicionário:

| Método | Entrega |
|--------|---------|
| `idades.keys()` | as chaves: `Ana`, `Bia`, `Caio` |
| `idades.values()` | os valores: `15`, `17`, `16` |
| `idades.items()` | os pares: `("Ana", 15)`, ... |

O mais prático costuma ser `items()`, que já entrega chave e valor separados:

```python
for nome, idade in idades.items():
    print(f"{nome} tem {idade} anos")
```

```text
Ana tem 15 anos
Bia tem 17 anos
Caio tem 16 anos
```

Desde o Python 3.7, os dicionários lembram a **ordem** em que as chaves foram inseridas.
