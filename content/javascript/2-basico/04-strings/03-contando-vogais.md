---
titulo: "Desafio: contando vogais"
xp: 25
exercicio:
  enunciado: |
    Leia uma frase e mostre quantas **vogais** ela tem, contando maiúsculas e vogais acentuadas. Para
    `Programar é divertido`:

    ```text
    Vogais: 8
    ```

    A constante `VOGAIS` já tem todas as vogais minúsculas que devem contar.
  codigo_inicial: |
    const VOGAIS = "aeiouáéíóúâêôãõà"
    const frase = prompt("Frase: ")
    let total = 0
    // percorra a frase contando as vogais

    console.log("Vogais:", total)
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
      nome: Percorre a frase com for...of
      usa: [ForOfStatement]
      mensagem: Use um for...of sobre as letras da frase e um contador.
  dicas:
    - "`for (const letra of frase)` passa por cada caractere, inclusive espaços e pontuação."
    - "`VOGAIS.includes(letra)` diz se a letra é uma das vogais."
    - "Para contar maiúsculas, percorra a frase já em minúsculas: `frase.toLowerCase()`."
  solucao: |
    const VOGAIS = "aeiouáéíóúâêôãõà"
    const frase = prompt("Frase: ")
    let total = 0
    for (const letra of frase.toLowerCase()) {
      if (VOGAIS.includes(letra)) total++
    }

    console.log("Vogais:", total)
  explicacao_solucao: |
    Converter a frase inteira com `toLowerCase()` antes do laço resolve as maiúsculas de uma vez: `"A"`
    vira `"a"`, `"É"` vira `"é"`. Depois, o `includes` procura cada letra dentro do texto `VOGAIS`.

    O mesmo padrão (laço + condição + contador) serve para contar qualquer coisa: dígitos, espaços,
    palavras com mais de 5 letras...
---
O método `includes` diz se um pedaço aparece dentro de um texto (ou se um item está num array):

```javascript
console.log("banana".includes("a"))     // true
console.log("banana".includes("nan"))   // true
console.log("banana".includes("x"))     // false
```

Combinado com um `for...of` sobre as letras, dá para analisar textos letra a letra:

```javascript
let digitos = 0
for (const c of "Senha123") {
  if ("0123456789".includes(c)) digitos++
}
console.log(digitos, "dígitos")
```

```text
3 dígitos
```

> Por convenção, constantes que funcionam como "configuração" do programa costumam ter o nome todo em
> maiúsculas, como `VOGAIS` ou `LIMITE_DE_TENTATIVAS`.
