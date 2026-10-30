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
    segredo = 42
    palpite = int(input("Palpite: "))
    if palpite == segredo:
        print("Acertou!")
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
    - "Você precisa de um contador de tentativas que aumenta a cada `input()`."
    - "Uma forma: `while True`, ler o palpite, contar, e dar `break` quando acertar."
    - "Se `segredo > palpite`, o segredo é maior: mostre `É maior!`."
  solucao: |
    segredo = 42
    tentativas = 0
    while True:
        palpite = int(input("Palpite: "))
        tentativas += 1
        if palpite == segredo:
            print("Acertou! Tentativas:", tentativas)
            break
        elif segredo > palpite:
            print("É maior!")
        else:
            print("É menor!")
  explicacao_solucao: |
    O laço junta tudo o que você viu até aqui: `while`, `input()`, contador, `if/elif/else` e `break`.

    Também daria para escrever sem `break`, usando a própria condição do `while`:

    ```python
    segredo = 42
    palpite = int(input("Palpite: "))
    tentativas = 1
    while palpite != segredo:
        print("É maior!" if segredo > palpite else "É menor!")
        palpite = int(input("Palpite: "))
        tentativas += 1
    print("Acertou! Tentativas:", tentativas)
    ```
---
Hora de juntar tudo em um joguinho clássico. A estrutura de quase todo jogo é um laço:

1. lê a jogada,
2. atualiza o estado (aqui, o número de tentativas),
3. dá uma resposta,
4. decide se o jogo acabou.

Num jogo de verdade, o segredo seria sorteado com o módulo `random` (você vai conhecê-lo no nível
Intermediário). Aqui ele é fixo para os testes saberem a resposta.

> Estratégia vencedora: sempre chute o meio do intervalo que sobrou. Com ela, qualquer número de 1 a 100
> é encontrado em no máximo 7 palpites. Essa ideia tem nome: **busca binária**, e aparece no nível Avançado.
