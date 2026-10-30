---
titulo: "Desafio: ano bissexto"
xp: 25
exercicio:
  enunciado: |
    Leia um ano e mostre `bissexto` ou `comum`. As regras do calendário são:

    - anos divisíveis por **4** são bissextos,
    - **exceto** os divisíveis por **100**,
    - **que voltam a ser** bissextos se forem divisíveis por **400**.

    Exemplos: 2024 é bissexto, 1900 é comum, 2000 é bissexto, 2023 é comum.
  codigo_inicial: |
    const ano = Number(prompt("Ano: "))
    if (ano % 4 === 0) {
      console.log("bissexto")
    } else {
      console.log("comum")
    }
  entrada: ["2024"]
  testes:
    - tipo: saida
      nome: 2024 é bissexto
      entrada: ["2024"]
      esperado: bissexto
    - tipo: saida
      nome: 2023 é comum
      entrada: ["2023"]
      esperado: comum
    - tipo: saida
      nome: 1900 é comum (divisível por 100)
      entrada: ["1900"]
      esperado: comum
    - tipo: saida
      nome: 2000 é bissexto (divisível por 400)
      entrada: ["2000"]
      esperado: bissexto
    - tipo: saida
      nome: 2100 é comum
      entrada: ["2100"]
      esperado: comum
  dicas:
    - "Teste primeiro com 1900: o código inicial erra porque esquece a exceção do 100."
    - "Uma forma: `(ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0`."
    - "Outra forma, com `else if`: teste primeiro o 400, depois o 100, depois o 4."
  solucao: |
    const ano = Number(prompt("Ano: "))
    if ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0) {
      console.log("bissexto")
    } else {
      console.log("comum")
    }
  explicacao_solucao: |
    A condição tem duas partes ligadas por `||`:

    - `ano % 4 === 0 && ano % 100 !== 0` pega os anos "normais" de 4 em 4, excluindo os de século;
    - `ano % 400 === 0` devolve a vaga para os séculos múltiplos de 400.

    Uma versão com `else if` também é ótima:

    ```javascript
    if (ano % 400 === 0) {
      console.log("bissexto")
    } else if (ano % 100 === 0) {
      console.log("comum")
    } else if (ano % 4 === 0) {
      console.log("bissexto")
    } else {
      console.log("comum")
    }
    ```
---
Este é o desafio final do nível: juntar **resto da divisão**, **comparações**, **&& e ||** e
**if/else** para implementar uma regra de verdade, a do calendário gregoriano.

Uma estratégia que funciona para qualquer regra com exceções:

1. Escreva a regra mais simples (divisível por 4).
2. Teste com um caso que deveria dar errado (1900) e veja falhar.
3. Acrescente a exceção e teste de novo.
4. Repita para a exceção da exceção (2000).

Os testes automáticos fazem exatamente isso por você: leia qual caso falhou e ajuste a condição.
