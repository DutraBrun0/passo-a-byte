---
titulo: "Desafio: adivinhe o número"
xp: 25
exercicio:
  enunciado: |
    O número secreto é `42`. Leia palpites até a pessoa acertar. Para cada palpite errado, diga
    `É maior!` ou `É menor!` (comparando o **segredo** com o palpite). Ao acertar, mostre quantas
    tentativas foram usadas. Para os palpites `50`, `30` e `42`:

    ```text
    É menor!
    É maior!
    Acertou! Tentativas: 3
    ```
  codigo_inicial: |
    const segredo = 42
    const palpite = Number(prompt("Palpite: "))
    if (palpite === segredo) {
      console.log("Acertou!")
    }
  entrada: ["50", "30", "42"]
  testes:
    - tipo: saida
      nome: Palpites 50, 30, 42
      entrada: ["50", "30", "42"]
      esperado: |
        É menor!
        É maior!
        Acertou! Tentativas: 3
    - tipo: saida
      nome: Acerta de primeira
      entrada: ["42"]
      esperado: "Acertou! Tentativas: 1"
    - tipo: saida
      nome: Vai chegando perto
      entrada: ["1", "99", "40", "45", "43", "41", "42"]
      esperado: |
        É maior!
        É menor!
        É maior!
        É menor!
        É menor!
        É maior!
        Acertou! Tentativas: 7
  dicas:
    - "Você precisa de um contador de tentativas (com `let`) que aumenta a cada `prompt`."
    - "Uma forma: `while (true)`, ler o palpite, contar, e dar `break` quando acertar."
    - "Se `segredo > palpite`, o segredo é maior: mostre `É maior!`."
  solucao: |
    const segredo = 42
    let tentativas = 0
    while (true) {
      const palpite = Number(prompt("Palpite: "))
      tentativas++
      if (palpite === segredo) {
        console.log("Acertou! Tentativas:", tentativas)
        break
      } else if (segredo > palpite) {
        console.log("É maior!")
      } else {
        console.log("É menor!")
      }
    }
  explicacao_solucao: |
    O laço junta tudo o que você viu até aqui: `while`, `prompt`, contador, `if/else if/else` e `break`.

    Repare que `palpite` é `const` mesmo dentro de um laço: a cada volta, um `palpite` novo é criado. Já
    `tentativas` precisa de `let` e fica **fora** do laço, porque acumula de uma volta para a outra.
---
Hora de juntar tudo em um joguinho clássico. A estrutura de quase todo jogo é um laço:

1. lê a jogada,
2. atualiza o estado (aqui, o número de tentativas),
3. dá uma resposta,
4. decide se o jogo acabou.

Num jogo de verdade, o segredo seria sorteado com
`Math.floor(Math.random() * 100) + 1`. Aqui ele é fixo para os testes saberem a resposta.

> Estratégia vencedora: sempre chute o meio do intervalo que sobrou. Com ela, qualquer número de 1 a 100
> é encontrado em no máximo 7 palpites.
