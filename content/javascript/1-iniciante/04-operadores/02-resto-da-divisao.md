---
titulo: Divisão inteira e resto
xp: 15
exercicio:
  enunciado: |
    Com `minutos = 125`, crie as constantes `horas` (horas completas) e `resto` (minutos que sobram) e
    mostre:

    ```text
    2 horas e 5 minutos
    ```
  codigo_inicial: |
    const minutos = 125
    const horas = minutos / 60
    const resto = 0

    console.log(horas, "horas e", resto, "minutos")
  testes:
    - tipo: variavel
      nome: horas vale 2
      variavel: horas
      esperado: 2
    - tipo: variavel
      nome: resto vale 5
      variavel: resto
      esperado: 5
    - tipo: saida
      nome: Mostra "2 horas e 5 minutos"
      esperado: 2 horas e 5 minutos
  dicas:
    - "`125 / 60` dá `2.0833...`. Para descartar a parte decimal, use `Math.floor(...)`."
    - "O resto da divisão é o operador `%`: `125 % 60`."
  solucao: |
    const minutos = 125
    const horas = Math.floor(minutos / 60)
    const resto = minutos % 60

    console.log(horas, "horas e", resto, "minutos")
  explicacao_solucao: |
    `Math.floor` arredonda para baixo, ficando só com as horas completas. O `%` dá exatamente o que
    sobrou da divisão: 125 = 2 × 60 + **5**.

    O par "divisão inteira + resto" aparece em todo lugar: converter segundos em minutos, centavos em
    reais, descobrir se um número é par (`n % 2 === 0`).
---
Em JavaScript, `/` sempre dá o resultado com casas decimais:

```javascript
console.log(7 / 2)
```

```text
3.5
```

Para ficar só com a parte inteira, use `Math.floor`, que arredonda para baixo. Para o que **sobra** da
divisão, use o operador `%` (resto):

```javascript
console.log(Math.floor(17 / 5))   // 3: cabem 3 grupos de 5 em 17
console.log(17 % 5)               // 2: sobram 2
```

O `Math` é uma caixa de ferramentas que já vem com o JavaScript:

| Função | Faz | Exemplo |
|--------|-----|---------|
| `Math.floor(x)` | arredonda para baixo | `Math.floor(2.9)` → `2` |
| `Math.ceil(x)` | arredonda para cima | `Math.ceil(2.1)` → `3` |
| `Math.round(x)` | arredonda para o mais próximo | `Math.round(2.5)` → `3` |
| `Math.abs(x)` | tira o sinal | `Math.abs(-4)` → `4` |
