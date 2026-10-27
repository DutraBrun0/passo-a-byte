---
titulo: Vários caminhos com elif
xp: 20
exercicio:
  enunciado: |
    Leia uma nota de 0 a 10 (pode ter decimais) e mostre o conceito:

    | Nota | Conceito |
    |------|----------|
    | 9 ou mais | `A` |
    | 7 ou mais | `B` |
    | 5 ou mais | `C` |
    | menos de 5 | `D` |
  codigo_inicial: |
    nota = float(input("Nota: "))
    if nota >= 5:
        print("C")
    if nota >= 7:
        print("B")
  entrada: ["8.5"]
  testes:
    - tipo: saida
      nome: 9.5 é A
      entrada: ["9.5"]
      esperado: A
    - tipo: saida
      nome: 9 é A (limite)
      entrada: ["9"]
      esperado: A
    - tipo: saida
      nome: 8.5 é B
      entrada: ["8.5"]
      esperado: B
    - tipo: saida
      nome: 5 é C (limite)
      entrada: ["5"]
      esperado: C
    - tipo: saida
      nome: 4.9 é D
      entrada: ["4.9"]
      esperado: D
    - tipo: estrutura
      nome: Usa if/elif/else
      usa: [If]
      max_chamadas: { print: 4 }
  dicas:
    - "Com vários `if` separados, uma nota 9 passa em todos e imprime várias letras. Use `elif`."
    - "Comece pela faixa mais alta: `if nota >= 9:`, depois `elif nota >= 7:` e assim por diante."
  solucao: |
    nota = float(input("Nota: "))
    if nota >= 9:
        print("A")
    elif nota >= 7:
        print("B")
    elif nota >= 5:
        print("C")
    else:
        print("D")
  explicacao_solucao: |
    O Python testa as condições de cima para baixo e para na **primeira** verdadeira. Por isso a
    ordem importa: uma nota 9.5 entra no `if nota >= 9` e as outras nem são verificadas. Se a
    ordem fosse invertida, `nota >= 5` pegaria todo mundo primeiro.
---
Quando há mais de dois caminhos, use `elif` (abreviação de "else if", "senão, se"):

```python
velocidade = 75
if velocidade > 100:
    print("Multa grave")
elif velocidade > 80:
    print("Multa leve")
else:
    print("Dentro do limite")
```

```text
Dentro do limite
```

Pode haver quantos `elif` quiser. O `else` no final é opcional e pega o que sobrou.

A grande diferença para vários `if` seguidos: no `if/elif/else`, **só um bloco roda**, o
da primeira condição verdadeira.
