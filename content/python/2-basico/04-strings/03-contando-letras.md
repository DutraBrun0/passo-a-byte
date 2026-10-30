---
titulo: "Desafio: contando vogais"
xp: 25
exercicio:
  enunciado: |
    Leia uma frase e mostre quantas **vogais** ela tem, contando maiúsculas e vogais acentuadas.
    Para `Programar é divertido`:

    ```text
    Vogais: 8
    ```

    A constante `VOGAIS` já tem todas as vogais minúsculas que devem contar.
  codigo_inicial: |
    VOGAIS = "aeiouáéíóúâêôãõà"
    frase = input("Frase: ")
    total = 0
    # percorra a frase contando as vogais

    print("Vogais:", total)
  entrada: ["Programar é divertido"]
  testes:
    - tipo: saida
      nome: Programar é divertido
      entrada: ["Programar é divertido"]
      esperado: "Vogais: 8"
    - tipo: saida
      nome: Maiúsculas também contam (ABACAXI)
      entrada: ["ABACAXI"]
      esperado: "Vogais: 4"
    - tipo: saida
      nome: Olá, mundo!
      entrada: ["Olá, mundo!"]
      esperado: "Vogais: 4"
    - tipo: saida
      nome: Sem vogais
      entrada: ["xyz 123"]
      esperado: "Vogais: 0"
    - tipo: estrutura
      nome: Percorre a frase com for
      usa: [For]
      mensagem: Use um for sobre as letras da frase e um contador.
  dicas:
    - "`for letra in frase:` passa por cada caractere, inclusive espaços e pontuação."
    - "`letra in VOGAIS` diz se a letra é uma das vogais."
    - "Para contar maiúsculas, compare a versão minúscula: `letra.lower() in VOGAIS`."
  solucao: |
    VOGAIS = "aeiouáéíóúâêôãõà"
    frase = input("Frase: ")
    total = 0
    for letra in frase.lower():
        if letra in VOGAIS:
            total += 1
    print("Vogais:", total)
  explicacao_solucao: |
    Converter a frase inteira com `lower()` antes do laço resolve as maiúsculas de uma vez: `"A"` vira
    `"a"`, `"É"` vira `"é"`. Depois, o operador `in` procura cada letra dentro do texto `VOGAIS`.

    O mesmo padrão (laço + condição + contador) serve para contar qualquer coisa: dígitos, espaços,
    palavras com mais de 5 letras...
---
O operador `in` também funciona com textos: ele diz se um pedaço aparece dentro de outro.

```python
print("a" in "banana")     # True
print("nan" in "banana")   # True
print("x" in "banana")     # False
```

Combinado com um `for` sobre as letras, dá para analisar textos letra a letra:

```python
digitos = 0
for c in "Senha123":
    if c in "0123456789":
        digitos += 1
print(digitos, "dígitos")
```

```text
3 dígitos
```

> Os textos também têm o método `isdigit()`: `"7".isdigit()` é `True`. Existem vários como ele:
> `isalpha()`, `isupper()`, `isspace()`...
