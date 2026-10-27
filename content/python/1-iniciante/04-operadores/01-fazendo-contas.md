---
titulo: Fazendo contas
xp: 10
exercicio:
  enunciado: |
    Um terreno retangular tem `largura = 7` e `comprimento = 3`. Calcule a **área**
    (largura × comprimento) e o **perímetro** (a soma dos quatro lados) e mostre:

    ```text
    Área: 21
    Perímetro: 20
    ```
  codigo_inicial: |
    largura = 7
    comprimento = 3
    area = 0
    perimetro = 0
    print("Área:", area)
    print("Perímetro:", perimetro)
  testes:
    - tipo: variavel
      nome: area vale 21
      variavel: area
      esperado: 21
    - tipo: variavel
      nome: perimetro vale 20
      variavel: perimetro
      esperado: 20
    - tipo: saida
      nome: Mostra área e perímetro
      esperado: |
        Área: 21
        Perímetro: 20
    - tipo: estrutura
      nome: Calcula com as variáveis
      usa: [BinOp]
      mensagem: Use largura e comprimento nas contas em vez de escrever o resultado.
  dicas:
    - "A multiplicação em Python é `*`."
    - "O perímetro é `2 * largura + 2 * comprimento`, ou `2 * (largura + comprimento)`."
  solucao: |
    largura = 7
    comprimento = 3
    area = largura * comprimento
    perimetro = 2 * (largura + comprimento)
    print("Área:", area)
    print("Perímetro:", perimetro)
  explicacao_solucao: |
    Guardar as medidas em variáveis faz o programa funcionar para **qualquer** terreno: basta trocar
    os valores no topo. Os parênteses em `2 * (largura + comprimento)` fazem a soma acontecer antes.
---
O Python é uma ótima calculadora:

| Operador | Conta | Exemplo | Resultado |
|----------|-------|---------|-----------|
| `+` | soma | `5 + 2` | `7` |
| `-` | subtração | `5 - 2` | `3` |
| `*` | multiplicação | `5 * 2` | `10` |
| `/` | divisão | `5 / 2` | `2.5` |
| `**` | potência | `5 ** 2` | `25` |

A ordem é a da matemática: primeiro `**`, depois `*` e `/`, por último `+` e `-`.
Use parênteses para mudar a ordem:

```python
print(2 + 3 * 4)
print((2 + 3) * 4)
```

```text
14
20
```

As contas podem usar variáveis, e o resultado pode ir para outra variável:

```python
preco = 12
quantidade = 3
total = preco * quantidade
print(total)
```
