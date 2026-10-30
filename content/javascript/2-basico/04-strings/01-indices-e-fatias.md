---
titulo: Letras, posições e fatias
xp: 15
exercicio:
  enunciado: |
    Leia uma palavra, mostre-a **de trás para frente** e diga se ela é um palíndromo (se lê igual nos
    dois sentidos). Para `radar`:

    ```text
    radar
    É palíndromo
    ```

    Para `javascript`:

    ```text
    tpircsavaj
    Não é palíndromo
    ```
  codigo_inicial: |
    const palavra = prompt("Palavra: ")
    const invertida = palavra
    console.log(invertida)
  entrada: ["radar"]
  testes:
    - tipo: saida
      nome: radar é palíndromo
      entrada: ["radar"]
      esperado: |
        radar
        É palíndromo
    - tipo: saida
      nome: javascript não é palíndromo
      entrada: ["javascript"]
      esperado: |
        tpircsavaj
        Não é palíndromo
    - tipo: saida
      nome: ovo é palíndromo
      entrada: ["ovo"]
      esperado: |
        ovo
        É palíndromo
  dicas:
    - "Textos não têm `reverse`, mas arrays têm. `palavra.split(\"\")` transforma o texto num array de letras."
    - "A receita completa: `palavra.split(\"\").reverse().join(\"\")`."
    - "Depois é só comparar: `if (palavra === invertida)`."
  solucao: |
    const palavra = prompt("Palavra: ")
    const invertida = palavra.split("").reverse().join("")
    console.log(invertida)
    if (palavra === invertida) {
      console.log("É palíndromo")
    } else {
      console.log("Não é palíndromo")
    }
  explicacao_solucao: |
    A linha `palavra.split("").reverse().join("")` é uma corrente de três passos:

    1. `split("")` quebra `"radar"` em `["r", "a", "d", "a", "r"]`;
    2. `reverse()` inverte a ordem do array;
    3. `join("")` cola as letras de volta num texto, sem nada entre elas.

    Encadear métodos assim, um depois do outro, é muito comum em JavaScript.
---
Textos se comportam parecido com arrays: cada caractere tem uma posição, começando em 0.

```javascript
const nome = "JavaScript"
console.log(nome[0])           // J
console.log(nome.at(-1))       // t
console.log(nome.length)       // 10
console.log(nome.slice(0, 4))  // Java
console.log(nome.slice(4))     // Script
```

O `slice(inicio, fim)` funciona como nos arrays: o `fim` não entra.

Uma diferença importante: textos **não mudam**. `nome[0] = "j"` não faz nada. Para "mudar" um texto,
você cria um novo, por exemplo `"j" + nome.slice(1)`.

E dá para percorrer as letras com `for...of`:

```javascript
for (const letra of "oi!") {
  console.log(letra)
}
```
