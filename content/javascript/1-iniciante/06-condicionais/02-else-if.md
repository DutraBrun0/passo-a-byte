---
titulo: else if
xp: 20
exercicio:
  enunciado: |
    Leia a temperatura e classifique:

    - abaixo de 15: `Frio`
    - de 15 até 24: `Agradável`
    - 25 ou mais: `Calor`
  codigo_inicial: |
    const temperatura = Number(prompt("Temperatura: "))
    if (temperatura < 15) {
      console.log("Frio")
    }
  entrada: ["20"]
  testes:
    - tipo: saida
      nome: 10 graus é Frio
      entrada: ["10"]
      esperado: Frio
    - tipo: saida
      nome: 20 graus é Agradável
      entrada: ["20"]
      esperado: Agradável
    - tipo: saida
      nome: 15 graus já é Agradável
      entrada: ["15"]
      esperado: Agradável
    - tipo: saida
      nome: 25 graus é Calor
      entrada: ["25"]
      esperado: Calor
    - tipo: estrutura
      nome: Usa if, else if e else
      usa: [IfStatement]
      max_chamadas: { prompt: 1 }
      mensagem: Encadeie as condições com else if, lendo a temperatura uma vez só.
  dicas:
    - "Depois do bloco do `if`, escreva `else if (temperatura < 25) { ... }`."
    - "O último caso não precisa de condição: é o `else`."
  solucao: |
    const temperatura = Number(prompt("Temperatura: "))
    if (temperatura < 15) {
      console.log("Frio")
    } else if (temperatura < 25) {
      console.log("Agradável")
    } else {
      console.log("Calor")
    }
  explicacao_solucao: |
    As condições são testadas de cima para baixo, e só o **primeiro** bloco verdadeiro roda. Por isso o
    `else if` não precisa de `temperatura >= 15`: se chegou nele, a temperatura já não é menor que 15.
---
Quando há mais de dois caminhos, encadeie condições com `else if`:

```javascript
const nota = 8.5
if (nota >= 9) {
  console.log("Excelente")
} else if (nota >= 7) {
  console.log("Aprovado")
} else if (nota >= 5) {
  console.log("Recuperação")
} else {
  console.log("Reprovado")
}
```

```text
Aprovado
```

O JavaScript testa de cima para baixo e para no primeiro verdadeiro. A nota 8.5 também é maior ou igual
a 5, mas o bloco "Recuperação" nunca é alcançado, porque "Aprovado" veio antes.

> A ordem importa: se `nota >= 5` viesse primeiro, toda nota acima de 5 cairia ali.
