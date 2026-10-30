---
titulo: Convertendo tipos
xp: 20
exercicio:
  enunciado: |
    Os valores `a` e `b` chegaram como **texto**. Crie a constante `soma` com a soma **numérica** dos
    dois e mostre:

    ```text
    Soma: 42
    ```
  codigo_inicial: |
    const a = "12"
    const b = "30"
    const soma = a + b

    console.log("Soma:", soma)
  testes:
    - tipo: variavel
      nome: soma vale 42
      variavel: soma
      esperado: 42
    - tipo: variavel
      nome: soma é um número
      variavel: soma
      tipo_esperado: number
    - tipo: saida
      nome: 'Mostra "Soma: 42"'
      esperado: "Soma: 42"
  dicas:
    - "Rode o código inicial: ele mostra `1230`. O `+` entre dois textos **junta** os textos."
    - "`Number(\"12\")` transforma o texto em número."
  solucao: |
    const a = "12"
    const b = "30"
    const soma = Number(a) + Number(b)

    console.log("Soma:", soma)
  explicacao_solucao: |
    O `+` faz duas coisas em JavaScript: soma números e junta textos. Se **qualquer um** dos lados for
    texto, ele junta. Por isso `"12" + "30"` dá `"1230"`, e até `"12" + 30` dá `"1230"`.

    Convertendo os dois com `Number()` antes, o `+` vira soma de verdade.
---
JavaScript tenta ajudar convertendo tipos sozinho, e às vezes isso dá resultados estranhos:

```javascript
console.log("5" + 3)   // junta: "53"
console.log("5" - 3)   // subtrai: 2
console.log("5" * "2") // multiplica: 10
```

```text
53
2
10
```

O `+` é o único que prefere **juntar** quando há um texto no meio. Para não depender da sorte, converta
você mesmo:

| Função | Exemplo | Resultado |
|--------|---------|-----------|
| `Number(x)` | `Number("3.5")` | `3.5` |
| `parseInt(x)` | `parseInt("42px")` | `42` |
| `String(x)` | `String(10)` | `"10"` |

Quando o texto não é um número, `Number` devolve `NaN` ("not a number"):

```javascript
console.log(Number("abc"))
```

```text
NaN
```
