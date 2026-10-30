---
titulo: Devolvendo um resultado
xp: 25
exercicio:
  enunciado: |
    Crie a função `celsiusParaFahrenheit(c)` que **devolve** (com `return`) a temperatura convertida. A
    fórmula é `F = C × 9 / 5 + 32`.

    Por exemplo, `celsiusParaFahrenheit(100)` deve devolver `212`. A função não deve mostrar nada: quem
    chama decide o que fazer com o valor.
  codigo_inicial: |
    function celsiusParaFahrenheit(c) {
      console.log(c * 9 / 5 + 32)
    }

    const temperatura = celsiusParaFahrenheit(25)
    console.log("25 °C =", temperatura, "°F")
  testes:
    - tipo: funcao
      nome: 0 °C são 32 °F
      funcao: celsiusParaFahrenheit
      args: [0]
      esperado: 32
    - tipo: funcao
      nome: 100 °C são 212 °F
      funcao: celsiusParaFahrenheit
      args: [100]
      esperado: 212
    - tipo: funcao
      nome: -40 °C são -40 °F
      funcao: celsiusParaFahrenheit
      args: [-40]
      esperado: -40
    - tipo: funcao
      nome: 36.5 °C são 97.7 °F
      funcao: celsiusParaFahrenheit
      args: [36.5]
      esperado: 97.7
    - tipo: estrutura
      nome: Usa return
      usa: [ReturnStatement]
      mensagem: Troque o console.log de dentro da função por return.
  dicas:
    - "Rode o código inicial: ele mostra `77` e depois `25 °C = undefined °F`. Por quê?"
    - "Uma função sem `return` devolve `undefined`. Troque o `console.log(...)` por `return ...`."
  solucao: |
    function celsiusParaFahrenheit(c) {
      return c * 9 / 5 + 32
    }

    const temperatura = celsiusParaFahrenheit(25)
    console.log("25 °C =", temperatura, "°F")
  explicacao_solucao: |
    `console.log` **mostra** um valor, mas ele se perde ali. `return` **entrega** o valor para quem chamou,
    que pode guardá-lo numa variável, fazer contas, comparar ou, se quiser, mostrar.

    A mesma função também pode ser escrita como **arrow function**, o formato curto que apareceu no
    `sort`:

    ```javascript
    const celsiusParaFahrenheit = (c) => c * 9 / 5 + 32
    ```

    Numa arrow function de uma linha só, sem chaves, o `return` é automático.
---
Até agora as funções só **mostravam** coisas. Mas `Number("3")` não mostra nada: ela **devolve** `3`, e
você faz o que quiser com esse valor. Para suas funções fazerem o mesmo, use `return`:

```javascript
function dobro(numero) {
  return numero * 2
}

const x = dobro(5)
console.log(x)              // 10
console.log(dobro(x) + 1)   // 21
```

Quando o JavaScript chega num `return`, a função **termina** na hora e o valor volta para o lugar da
chamada. Por isso dá para usar a chamada no meio de uma conta.

## Arrow functions

Funções pequenas costumam ser escritas no formato **arrow** ("flecha"), guardadas numa constante:

```javascript
const maior = (a, b) => (a > b ? a : b)
const saudacao = (nome) => `Oi, ${nome}!`

console.log(maior(3, 9))
console.log(saudacao("Bit"))
```

```text
9
Oi, Bit!
```

O `a > b ? a : b` é o **operador ternário**: um `if/else` de uma linha que devolve um valor.
