---
titulo: if e else
xp: 15
exercicio:
  enunciado: |
    Leia um número inteiro e mostre `par` ou `ímpar`.
  codigo_inicial: |
    const numero = Number(prompt("Número: "))
    console.log("par")
  entrada: ["4"]
  testes:
    - tipo: saida
      nome: 4 é par
      entrada: ["4"]
      esperado: par
    - tipo: saida
      nome: 7 é ímpar
      entrada: ["7"]
      esperado: ímpar
    - tipo: saida
      nome: 0 é par
      entrada: ["0"]
      esperado: par
    - tipo: estrutura
      nome: Usa if
      usa: [IfStatement]
      mensagem: Use if e else para escolher qual mensagem mostrar.
  dicas:
    - "Um número é par quando o resto da divisão por 2 é zero: `numero % 2 === 0`."
    - "Estrutura: `if (condição) { ... } else { ... }`."
  solucao: |
    const numero = Number(prompt("Número: "))
    if (numero % 2 === 0) {
      console.log("par")
    } else {
      console.log("ímpar")
    }
  explicacao_solucao: |
    A condição `numero % 2 === 0` vale `true` ou `false`. Se for `true`, roda o bloco do `if`; senão, o
    do `else`. Só um dos dois é executado.
---
O `if` ("se") executa um bloco só quando uma condição é verdadeira. O `else` ("senão") é o caminho
alternativo:

```javascript
const temperatura = 31
if (temperatura > 30) {
  console.log("Leve água!")
} else {
  console.log("Dia tranquilo.")
}
```

```text
Leve água!
```

As partes:

- a condição fica entre **parênteses**;
- o bloco fica entre **chaves** `{ }`;
- dentro das chaves, recuamos o código (aqui, com 2 espaços) para ficar fácil de ler.

O `else` é opcional. Sem ele, quando a condição é falsa, o programa simplesmente pula o bloco.
