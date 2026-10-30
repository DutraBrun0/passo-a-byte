---
titulo: Criando listas
xp: 15
exercicio:
  enunciado: |
    Acrescente `"café"` ao **final** da lista de compras e depois mostre o primeiro item, o último e
    quantos itens a lista tem:

    ```text
    Primeiro: arroz
    Último: café
    Itens: 4
    ```

    Pegue o último item com um índice negativo, para o código continuar certo se a lista crescer.
  codigo_inicial: |
    compras = ["arroz", "feijão", "leite"]
    # acrescente "café" aqui

    print("Primeiro:", compras[1])
  testes:
    - tipo: variavel
      nome: compras termina com "café"
      variavel: compras
      esperado: ["arroz", "feijão", "leite", "café"]
    - tipo: saida
      nome: Mostra primeiro, último e quantidade
      esperado: |
        Primeiro: arroz
        Último: café
        Itens: 4
    - tipo: estrutura
      nome: Usa len() para contar
      min_chamadas: { len: 1 }
      mensagem: Use len(compras) em vez de escrever 4.
  dicas:
    - "O método `append` acrescenta no final: `compras.append(\"café\")`."
    - "Os índices começam em **0**. O primeiro item é `compras[0]`."
    - "`compras[-1]` é sempre o último item, qualquer que seja o tamanho."
  solucao: |
    compras = ["arroz", "feijão", "leite"]
    compras.append("café")
    print("Primeiro:", compras[0])
    print("Último:", compras[-1])
    print("Itens:", len(compras))
  explicacao_solucao: |
    - `append` muda a própria lista, colocando o item novo no fim.
    - `compras[0]` é o primeiro porque a contagem começa do zero.
    - `compras[-1]` conta de trás para frente: -1 é o último, -2 o penúltimo.
    - `len` funciona igual em textos e listas: devolve quantos elementos existem.
---
Uma **lista** guarda vários valores em ordem, dentro de colchetes e separados por vírgulas:

```python
notas = [8, 6.5, 10]
nomes = ["Ana", "Bia", "Caio"]
vazia = []
```

Cada item tem uma **posição** (índice), que começa em zero:

```python
nomes = ["Ana", "Bia", "Caio"]
print(nomes[0])    # Ana
print(nomes[2])    # Caio
print(nomes[-1])   # Caio (o último)
print(len(nomes))  # 3
```

Diferente dos textos, listas podem **mudar** depois de criadas:

```python
nomes[1] = "Beatriz"     # troca o item da posição 1
nomes.append("Duda")     # acrescenta no final
print(nomes)
```

```text
['Ana', 'Beatriz', 'Caio', 'Duda']
```

Pedir um índice que não existe, como `nomes[10]`, dá `IndexError`.
