---
titulo: Divisão inteira e resto
xp: 15
exercicio:
  enunciado: |
    Um filme tem `minutos = 125`. Calcule quantas **horas** completas e quantos **minutos que sobram**
    isso dá, guardando em `horas` e `resto`, e mostre:

    ```text
    2 horas e 5 minutos
    ```
  codigo_inicial: |
    minutos = 125
    horas = minutos / 60
    resto = 0
    print(horas, "horas e", resto, "minutos")
  testes:
    - tipo: variavel
      nome: horas vale 2
      variavel: horas
      esperado: 2
    - tipo: variavel
      nome: horas é inteiro
      variavel: horas
      tipo_esperado: int
    - tipo: variavel
      nome: resto vale 5
      variavel: resto
      esperado: 5
    - tipo: saida
      nome: Mostra "2 horas e 5 minutos"
      esperado: 2 horas e 5 minutos
  dicas:
    - "A divisão `/` dá `2.0833...`. Para descartar a parte decimal, use `//`."
    - "O operador `%` dá o resto da divisão: `125 % 60`."
  solucao: |
    minutos = 125
    horas = minutos // 60
    resto = minutos % 60
    print(horas, "horas e", resto, "minutos")
  explicacao_solucao: |
    `125 // 60` é 2 (quantas vezes o 60 cabe inteiro no 125) e `125 % 60` é 5 (o que sobra).
    Essa dupla aparece sempre que é preciso "quebrar" uma quantidade: segundos em minutos,
    centavos em reais, dias em semanas.
---
Além da divisão comum, o Python tem duas operações muito úteis com números inteiros:

- `//` faz a **divisão inteira**: quantas vezes um número cabe inteiro no outro.
- `%` dá o **resto** dessa divisão (o operador se chama "módulo").

```python
print(17 // 5)
print(17 % 5)
```

```text
3
2
```

Porque 17 = 5 × **3** + **2**.

## Para que serve o resto?

Um uso clássico: saber se um número é **par**. Todo par dividido por 2 deixa resto 0.

```python
print(10 % 2)
print(7 % 2)
```

```text
0
1
```
