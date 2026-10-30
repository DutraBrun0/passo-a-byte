---
titulo: Métodos de texto
xp: 20
exercicio:
  enunciado: |
    Num formulário, as pessoas digitam o nome de qualquer jeito. Leia um nome e mostre-o arrumado: sem
    espaços sobrando e com cada palavra começando em maiúscula e o resto em minúscula. Depois mostre
    quantas palavras ele tem. Para a entrada `"  ana   MARIA silva "`:

    ```text
    Ana Maria Silva
    Palavras: 3
    ```
  codigo_inicial: |
    const nome = prompt("Nome: ")
    console.log(nome.trim())
  entrada: ["  ana   MARIA silva "]
  testes:
    - tipo: saida
      nome: Espaços extras e maiúsculas misturadas
      entrada: ["  ana   MARIA silva "]
      esperado: |
        Ana Maria Silva
        Palavras: 3
    - tipo: saida
      nome: Duas palavras
      entrada: ["bruno    dutra"]
      esperado: |
        Bruno Dutra
        Palavras: 2
    - tipo: saida
      nome: Uma palavra só
      entrada: ["   LUA"]
      esperado: |
        Lua
        Palavras: 1
  dicas:
    - "`nome.trim()` tira os espaços das pontas. Depois, `split(/ +/)` quebra o texto em palavras, ignorando espaços repetidos."
    - "Para arrumar uma palavra: `p[0].toUpperCase() + p.slice(1).toLowerCase()`."
    - "Guarde as palavras arrumadas num array com `push` e junte no fim com `join(\" \")`."
  solucao: |
    const nome = prompt("Nome: ")
    const palavras = nome.trim().split(/ +/)
    const arrumadas = []
    for (const p of palavras) {
      arrumadas.push(p[0].toUpperCase() + p.slice(1).toLowerCase())
    }
    console.log(arrumadas.join(" "))
    console.log("Palavras:", palavras.length)
  explicacao_solucao: |
    O `/ +/` dentro do `split` é uma **expressão regular**: um padrão que quer dizer "um ou mais espaços".
    Com ele, `"ana   MARIA"` vira `["ana", "MARIA"]`, sem pedaços vazios no meio. Um `split(" ")` comum
    deixaria textos vazios entre os espaços repetidos.

    Depois, cada palavra é remontada: a primeira letra em maiúscula, o resto em minúscula. O `join(" ")`
    devolve tudo com exatamente um espaço entre as palavras.
---
Textos vêm com vários **métodos**. Nenhum deles altera o original: todos devolvem um texto novo.

| Método | Exemplo | Resultado |
|--------|---------|-----------|
| `toUpperCase()` | `"oi".toUpperCase()` | `"OI"` |
| `toLowerCase()` | `"OI".toLowerCase()` | `"oi"` |
| `trim()` | `"  oi  ".trim()` | `"oi"` |
| `replaceAll(a, b)` | `"bola".replaceAll("o", "0")` | `"b0la"` |
| `includes(x)` | `"banana".includes("nan")` | `true` |
| `startsWith(x)` | `"javascript".startsWith("java")` | `true` |
| `repeat(n)` | `"ha".repeat(3)` | `"hahaha"` |

Dois métodos andam juntos: `split` quebra um texto em array e `join` junta um array em texto.

```javascript
const data = "25/12/2025"
const partes = data.split("/")
console.log(partes)
console.log(partes.join("-"))
```

```text
[ '25', '12', '2025' ]
25-12-2025
```
