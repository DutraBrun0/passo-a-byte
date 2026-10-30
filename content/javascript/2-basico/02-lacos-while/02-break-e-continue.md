---
titulo: break e continue
xp: 20
exercicio:
  enunciado: |
    Leia números, um por `prompt`, até a pessoa digitar `fim`. Some só os números **positivos** (ignore
    os negativos) e no final mostre o total. Para as entradas `10`, `-4`, `2`, `fim`:

    ```text
    Total: 12
    ```
  codigo_inicial: |
    let total = 0
    while (true) {
      const texto = prompt("Número (ou fim): ")
      // pare quando digitarem fim
      // ignore os números negativos
      total += Number(texto)
    }
    console.log("Total:", total)
  entrada: ["10", "-4", "2", "fim"]
  testes:
    - tipo: saida
      nome: 10, -4, 2, fim
      entrada: ["10", "-4", "2", "fim"]
      esperado: "Total: 12"
    - tipo: saida
      nome: 5, 3, fim
      entrada: ["5", "3", "fim"]
      esperado: "Total: 8"
    - tipo: saida
      nome: Só negativos
      entrada: ["-1", "-7", "fim"]
      esperado: "Total: 0"
    - tipo: saida
      nome: fim logo de cara
      entrada: ["fim"]
      esperado: "Total: 0"
    - tipo: estrutura
      nome: Usa break e continue
      usa: [WhileStatement, BreakStatement, ContinueStatement]
      mensagem: Use break para sair ao ler "fim" e continue para pular os negativos.
  dicas:
    - "Compare o texto lido com `\"fim\"` **antes** de converter para número."
    - "`if (texto === \"fim\") break` encerra o laço na hora."
    - "Para o negativo, `continue` volta para o começo do laço sem somar."
  solucao: |
    let total = 0
    while (true) {
      const texto = prompt("Número (ou fim): ")
      if (texto === "fim") break
      const numero = Number(texto)
      if (numero < 0) continue
      total += numero
    }
    console.log("Total:", total)
  explicacao_solucao: |
    `while (true)` repete "para sempre", e quem decide a saída é o `break`. É um padrão comum para ler
    dados até aparecer um valor especial.

    - `break` sai do laço imediatamente e o programa segue para o `console.log`.
    - `continue` pula o resto **desta** volta e já começa a próxima, então o `total += numero` não roda.

    Repare que um `if` com uma instrução só pode dispensar as chaves: `if (texto === "fim") break`.
---
Duas palavras mudam o caminho de um laço:

- **`break`**: sai do laço na hora.
- **`continue`**: pula para a próxima volta.

```javascript
for (let n = 1; n < 10; n++) {
  if (n === 7) break        // chega no 7 e para tudo
  if (n % 2 === 0) continue // pares não são mostrados
  console.log(n)
}
```

```text
1
3
5
```

Com `break`, é comum escrever `while (true)` e decidir a saída lá dentro. Fica fácil de ler quando a
condição de parada só é conhecida no meio do laço, como depois de um `prompt`.
