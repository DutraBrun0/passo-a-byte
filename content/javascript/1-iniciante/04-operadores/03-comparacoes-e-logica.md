---
titulo: Comparações e lógica
xp: 20
exercicio:
  enunciado: |
    A entrada no show exige ingresso **e** idade a partir de 16 anos, a menos que a pessoa esteja
    acompanhada de um adulto. Crie a constante `podeEntrar` combinando as três variáveis com `&&`,
    `||` e `>=`, e mostre o valor dela.

    Para os valores do código (15 anos, com ingresso, sem acompanhante), o resultado é `false`.
  codigo_inicial: |
    const idade = 15
    const temIngresso = true
    const acompanhado = false

    const podeEntrar = true
    console.log(podeEntrar)
  testes:
    - tipo: variavel
      nome: podeEntrar é false para 15 anos sem acompanhante
      variavel: podeEntrar
      esperado: false
    - tipo: saida
      nome: Mostra false
      esperado: "false"
    - tipo: estrutura
      nome: Combina as condições com && e ||
      usa: [LogicalExpression, BinaryExpression]
      mensagem: Escreva a regra com as variáveis, algo como temIngresso && (idade >= 16 || acompanhado).
  dicas:
    - "`&&` é \"e\": as duas partes precisam ser verdadeiras."
    - "`||` é \"ou\": basta uma das partes."
    - "A regra: `temIngresso && (idade >= 16 || acompanhado)`. Os parênteses importam!"
  solucao: |
    const idade = 15
    const temIngresso = true
    const acompanhado = false

    const podeEntrar = temIngresso && (idade >= 16 || acompanhado)
    console.log(podeEntrar)
  explicacao_solucao: |
    Lendo a expressão: "tem ingresso **e** (tem 16 ou mais **ou** está acompanhado)". Com 15 anos e
    sem acompanhante, o parêntese dá `false`, e `true && false` é `false`.

    Sem os parênteses, `temIngresso && idade >= 16 || acompanhado` deixaria entrar quem está acompanhado
    mesmo **sem** ingresso, porque o `&&` é calculado antes do `||`.
---
Comparações respondem com `true` ou `false`:

| Operador | Pergunta |
|:--------:|----------|
| `===` | é igual? |
| `!==` | é diferente? |
| `>` `<` | maior? menor? |
| `>=` `<=` | maior ou igual? menor ou igual? |

> **Use sempre três sinais de igual.** O `==` (dois) converte os tipos antes de comparar, e aí
> `"5" == 5` vira `true`. Com `===`, valores de tipos diferentes nunca são iguais.

```javascript
console.log(5 === 5)
console.log("5" === 5)
console.log(10 >= 18)
```

```text
true
false
false
```

Para combinar condições, existem os operadores lógicos:

| Operador | Nome | Verdadeiro quando |
|:--------:|------|-------------------|
| `&&` | e | as duas partes são verdadeiras |
| `\|\|` | ou | pelo menos uma parte é verdadeira |
| `!` | não | inverte: `!true` é `false` |
