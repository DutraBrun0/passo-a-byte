---
titulo: Mudando valores
xp: 15
exercicio:
  enunciado: |
    No jogo, o Bit pegou **3 moedas** (cada uma vale 10 pontos) e perdeu **1 vida**. Atualize as
    variáveis usando `+=` para as moedas e `--` para a vida, e mostre:

    ```text
    Pontos: 30 | Vidas: 2
    ```
  codigo_inicial: |
    let pontos = 0
    let vidas = 3
    // atualize pontos e vidas aqui

    console.log("Pontos:", pontos, "| Vidas:", vidas)
  testes:
    - tipo: variavel
      nome: pontos vale 30
      variavel: pontos
      esperado: 30
    - tipo: variavel
      nome: vidas vale 2
      variavel: vidas
      esperado: 2
    - tipo: saida
      nome: Mostra pontos e vidas
      esperado: "Pontos: 30 | Vidas: 2"
    - tipo: estrutura
      nome: Usa += e --
      usa: [AssignmentExpression, UpdateExpression]
      mensagem: Some com pontos += 10 (uma vez por moeda) e tire a vida com vidas--.
  dicas:
    - "`pontos += 10` é um atalho para `pontos = pontos + 10`."
    - "`vidas--` tira 1 de `vidas`. O contrário é `vidas++`."
  solucao: |
    let pontos = 0
    let vidas = 3
    pontos += 10
    pontos += 10
    pontos += 10
    vidas--

    console.log("Pontos:", pontos, "| Vidas:", vidas)
  explicacao_solucao: |
    Cada `pontos += 10` pega o valor atual, soma 10 e guarda de volta: 0 → 10 → 20 → 30. E `vidas--`
    faz 3 → 2. Por isso as duas variáveis foram criadas com `let`: com `const`, o JavaScript não
    deixaria mudar.
---
Uma variável criada com `let` pode receber um valor novo a qualquer momento:

```javascript
let energia = 100
energia = energia - 25
console.log(energia)
```

```text
75
```

Repare na linha do meio: o JavaScript calcula o lado direito primeiro (`100 - 25`) e depois guarda o
resultado na variável. Atualizar uma variável a partir dela mesma é tão comum que existem atalhos:

| Atalho | É o mesmo que |
|--------|---------------|
| `x += 5` | `x = x + 5` |
| `x -= 5` | `x = x - 5` |
| `x *= 2` | `x = x * 2` |
| `x++` | `x = x + 1` |
| `x--` | `x = x - 1` |
