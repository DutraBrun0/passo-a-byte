---
titulo: Fazendo contas
xp: 15
exercicio:
  enunciado: |
    Um quarto retangular tem 8 metros de largura e 5 de comprimento. Crie as constantes `area` e
    `perimetro` usando `largura` e `comprimento`, e mostre:

    ```text
    Área: 40
    Perímetro: 26
    ```
  codigo_inicial: |
    const largura = 8
    const comprimento = 5
    // calcule area e perimetro aqui

    console.log("Área:", 0)
  testes:
    - tipo: variavel
      nome: area vale 40
      variavel: area
      esperado: 40
    - tipo: variavel
      nome: perimetro vale 26
      variavel: perimetro
      esperado: 26
    - tipo: saida
      nome: Mostra área e perímetro
      esperado: |
        Área: 40
        Perímetro: 26
    - tipo: estrutura
      nome: Calcula com as variáveis
      usa: [BinaryExpression]
      mensagem: Use largura e comprimento nas contas em vez de escrever o resultado.
  dicas:
    - "A multiplicação é `*`."
    - "O perímetro é `2 * largura + 2 * comprimento`, ou `2 * (largura + comprimento)`."
  solucao: |
    const largura = 8
    const comprimento = 5
    const area = largura * comprimento
    const perimetro = 2 * (largura + comprimento)

    console.log("Área:", area)
    console.log("Perímetro:", perimetro)
  explicacao_solucao: |
    Usar as variáveis nas contas, em vez de escrever 40 e 26, faz o programa funcionar para **qualquer**
    quarto: mude a largura e tudo se recalcula. Os parênteses em `2 * (largura + comprimento)` fazem a
    soma acontecer antes da multiplicação.
---
Os operadores de conta em JavaScript:

| Operador | Conta | Exemplo | Resultado |
|:--------:|-------|---------|-----------|
| `+` | soma | `7 + 2` | `9` |
| `-` | subtração | `7 - 2` | `5` |
| `*` | multiplicação | `7 * 2` | `14` |
| `/` | divisão | `7 / 2` | `3.5` |
| `**` | potência | `7 ** 2` | `49` |
| `%` | resto | `7 % 2` | `1` |

A ordem é a da matemática: primeiro potência, depois multiplicação e divisão, por último soma e
subtração. Na dúvida, use parênteses:

```javascript
console.log(2 + 3 * 4)
console.log((2 + 3) * 4)
```

```text
14
20
```

Uma curiosidade: dividir por zero não dá erro em JavaScript. `1 / 0` é `Infinity`.
