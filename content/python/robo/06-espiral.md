---
titulo: Espiral
xp: 40
direcao: leste
max_linhas: 5
mapa: |
  #########
  #R......#
  #######.#
  #...S##.#
  #.#####.#
  #.......#
  #########
codigo_inicial: |
  while not na_saida():
      andar()
solucao: |
  while not na_saida():
      if tem_parede():
          virar_direita()
      else:
          andar()
dica: |
  Dentro do `while`, decida a cada volta: se `tem_parede()` à frente, vire para a direita;
  senão, ande. Use `if` e `else`.
---
Neste caminho, toda curva é para a **direita**, e sempre que aparece uma parede à frente.

O sensor `tem_parede()` responde se há uma parede logo à frente do Bit. Junte um `while`
com um `if/else` e o Bit encontra o caminho sozinho, em no máximo **5 linhas**.
