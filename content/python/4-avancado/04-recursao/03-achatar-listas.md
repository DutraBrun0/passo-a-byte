---
titulo: "Desafio: achatando listas"
xp: 30
exercicio:
  enunciado: |
    Listas podem ter listas dentro, em qualquer profundidade. Crie a função `achatar(lista)` que devolve
    uma lista só com os valores, na mesma ordem, sem nenhuma lista aninhada:

    ```python
    achatar([1, [2, [3, 4]], 5])        # [1, 2, 3, 4, 5]
    achatar([[["fundo"]], "raso"])      # ['fundo', 'raso']
    ```
  codigo_inicial: |
    def achatar(lista):
        resultado = []
        for item in lista:
            if isinstance(item, list):
                resultado.extend(item)
            else:
                resultado.append(item)
        return resultado


    print(achatar([1, [2, [3, 4]], 5]))
  testes:
    - tipo: funcao
      nome: Dois níveis de aninhamento
      funcao: achatar
      args: [[1, [2, [3, 4]], 5]]
      esperado: [1, 2, 3, 4, 5]
    - tipo: funcao
      nome: Lista já achatada
      funcao: achatar
      args: [[1, 2, 3]]
      esperado: [1, 2, 3]
    - tipo: funcao
      nome: Bem fundo
      funcao: achatar
      args: [[[["fundo"]], "raso"]]
      esperado: ["fundo", "raso"]
    - tipo: funcao
      nome: Listas vazias somem
      funcao: achatar
      args: [[[], [[]], 7, []]]
      esperado: [7]
  dicas:
    - "O código inicial só desce **um** nível: `[3, 4]` continua dentro de uma lista."
    - "Quando o item for uma lista, em vez de estendê-la direto, estenda com `achatar(item)`."
  solucao: |
    def achatar(lista):
        resultado = []
        for item in lista:
            if isinstance(item, list):
                resultado.extend(achatar(item))
            else:
                resultado.append(item)
        return resultado


    print(achatar([1, [2, [3, 4]], 5]))
  explicacao_solucao: |
    Uma mudança de uma palavra resolve: `extend(item)` vira `extend(achatar(item))`. Cada sublista é
    achatada pela própria função antes de entrar no resultado, não importa quantos níveis ela tenha.

    Aqui, laço e recursão trabalham juntos: o `for` anda **para os lados** (os itens de uma lista) e a
    recursão desce **para dentro** (as listas dentro de listas). Estruturas em árvore, como pastas com
    subpastas, são resolvidas exatamente assim.
---
Alguns problemas são **naturalmente recursivos**, porque os dados têm o mesmo formato em vários
níveis. Pense nas pastas do seu computador: uma pasta tem arquivos e outras pastas, que têm arquivos e
outras pastas...

Com um laço só, você não sabe quantos níveis vai precisar descer. Com recursão, você trata **um**
nível e deixa a própria função cuidar do resto:

```python
def profundidade(lista):
    maior = 0
    for item in lista:
        if isinstance(item, list):
            maior = max(maior, profundidade(item))
    return maior + 1


print(profundidade([1, [2, [3]]]))
```

```text
3
```

`isinstance(valor, list)` pergunta se um valor é uma lista. Funciona com qualquer tipo:
`isinstance(3, int)` é `True`.
