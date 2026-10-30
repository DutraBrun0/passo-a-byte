---
titulo: Percorrendo listas
xp: 20
exercicio:
  enunciado: |
    Dadas as notas da turma, calcule a **maior nota** (guarde em `maior`) e a **média** (guarde em
    `media`), e mostre as duas:

    ```text
    Maior: 10.0
    Média: 8.2
    ```

    Encontre a maior nota percorrendo a lista com um `for`, sem usar a função `max()`.
  codigo_inicial: |
    notas = [7.5, 9.0, 6.0, 8.5, 10.0]
    maior = notas[0]
    for nota in notas:
        pass  # troque o pass: atualize maior quando achar uma nota maior

    media = 0
    print("Maior:", maior)
    print("Média:", media)
  testes:
    - tipo: variavel
      nome: maior vale 10.0
      variavel: maior
      esperado: 10.0
    - tipo: variavel
      nome: media vale 8.2
      variavel: media
      esperado: 8.2
    - tipo: saida
      nome: Mostra a maior nota e a média
      esperado: |
        Maior: 10.0
        Média: 8.2
    - tipo: estrutura
      nome: Percorre a lista sem usar max()
      usa: [For, If]
      max_chamadas: { max: 0 }
      mensagem: Dentro do for, use um if para trocar maior quando a nota for maior que ele.
  dicas:
    - "Dentro do `for`: `if nota > maior:` e então `maior = nota`."
    - "A média é a soma dividida pela quantidade. `sum(notas)` e `len(notas)` ajudam."
  solucao: |
    notas = [7.5, 9.0, 6.0, 8.5, 10.0]
    maior = notas[0]
    for nota in notas:
        if nota > maior:
            maior = nota

    media = sum(notas) / len(notas)
    print("Maior:", maior)
    print("Média:", media)
  explicacao_solucao: |
    A ideia do "maior até agora": comece supondo que o primeiro é o maior e, a cada item, troque se
    encontrar alguém maior. Ao fim do laço, `maior` guarda o maior de todos.

    No dia a dia você usaria `max(notas)`, que faz exatamente isso. Saber escrever o laço à mão ajuda
    quando a regra é diferente, como "a maior nota abaixo de 9".
---
O `for` funciona com qualquer sequência, não só com `range`. Com uma lista, a variável recebe
**cada item**, na ordem:

```python
frutas = ["maçã", "uva", "pera"]
for fruta in frutas:
    print("Eu gosto de", fruta)
```

```text
Eu gosto de maçã
Eu gosto de uva
Eu gosto de pera
```

Junto com um `if`, dá para filtrar ou procurar:

```python
temperaturas = [22, 31, 19, 35, 28]
quentes = 0
for t in temperaturas:
    if t > 30:
        quentes += 1
print(quentes, "dias quentes")
```

```text
2 dias quentes
```

O Python também tem funções prontas para listas de números: `sum`, `max`, `min` e `len`.
