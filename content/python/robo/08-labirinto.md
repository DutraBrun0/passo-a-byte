---
titulo: O labirinto
xp: 50
direcao: leste
max_linhas: 8
mapa: |
  ###########
  #R....#...#
  #.###.#.#.#
  #.#...#.#.#
  #.#.###.#.#
  #...#...#.#
  ###.#.###.#
  #S..#.....#
  ###########
codigo_inicial: |
  while not na_saida():
      if tem_parede():
          virar_direita()
      else:
          andar()
solucao: |
  while not na_saida():
      if not tem_parede("direita"):
          virar_direita()
          andar()
      elif not tem_parede():
          andar()
      else:
          virar_esquerda()
dica: |
  Regra da mão direita: se a direita estiver livre, vire à direita e ande; senão, se a frente
  estiver livre, ande; senão, vire à esquerda. `tem_parede("direita")` olha para o lado.
---
Um labirinto de verdade, com becos e bifurcações. Existe um truque antigo para sair de
labirintos assim: **mantenha a mão direita encostada na parede** e siga em frente.

O sensor aceita um lado: `tem_parede("direita")` e `tem_parede("esquerda")` olham para os lados,
sem o Bit precisar virar. Você tem **8 linhas**.
