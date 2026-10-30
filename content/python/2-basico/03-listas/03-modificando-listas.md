---
titulo: Ordenando e fatiando
xp: 20
exercicio:
  enunciado: |
    O jogador com `150` pontos foi desclassificado. Remova essa pontuação da lista `pontos` e depois
    crie a lista `podio` com as **três maiores** pontuações, da maior para a menor:

    ```text
    Pódio: [980, 610, 450]
    ```

    A lista `pontos` deve continuar na ordem original (só sem o 150).
  codigo_inicial: |
    pontos = [320, 150, 980, 450, 610]
    podio = pontos[:3]
    print("Pódio:", podio)
  testes:
    - tipo: variavel
      nome: pontos fica sem o 150, na ordem original
      variavel: pontos
      esperado: [320, 980, 450, 610]
    - tipo: variavel
      nome: podio tem as três maiores, em ordem decrescente
      variavel: podio
      esperado: [980, 610, 450]
    - tipo: saida
      nome: Mostra o pódio
      esperado: "Pódio: [980, 610, 450]"
  dicas:
    - "`pontos.remove(150)` apaga a primeira ocorrência do valor 150."
    - "`sorted(pontos, reverse=True)` cria uma **cópia** ordenada da maior para a menor, sem mexer em `pontos`."
    - "Uma fatia `[:3]` pega os três primeiros itens de uma lista."
  solucao: |
    pontos = [320, 150, 980, 450, 610]
    pontos.remove(150)
    podio = sorted(pontos, reverse=True)[:3]
    print("Pódio:", podio)
  explicacao_solucao: |
    - `remove` apaga pelo **valor**. Para apagar pela **posição**, use `pop(indice)`.
    - `sorted(...)` devolve uma lista nova; a original continua igual. Já `pontos.sort()` ordenaria a
      própria lista, e o teste da ordem original falharia.
    - `[:3]` é uma fatia: do começo até antes da posição 3.
---
Algumas operações úteis com listas:

| Código | O que faz |
|--------|-----------|
| `lista.append(x)` | acrescenta `x` no final |
| `lista.insert(0, x)` | coloca `x` na posição 0 |
| `lista.remove(x)` | apaga o primeiro `x` encontrado |
| `lista.pop()` | tira e devolve o último item |
| `lista.sort()` | ordena a própria lista |
| `sorted(lista)` | devolve uma cópia ordenada |
| `x in lista` | `True` se `x` está na lista |

## Fatias

Uma **fatia** pega um pedaço da lista com `[inicio:fim]`. Como no `range`, o fim não entra:

```python
letras = ["a", "b", "c", "d", "e"]
print(letras[1:3])   # ['b', 'c']
print(letras[:2])    # ['a', 'b']
print(letras[3:])    # ['d', 'e']
```

Para ordenar ao contrário, passe `reverse=True`:

```python
print(sorted([3, 1, 2], reverse=True))
```

```text
[3, 2, 1]
```
