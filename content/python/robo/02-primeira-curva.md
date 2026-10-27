---
titulo: A primeira curva
xp: 20
direcao: leste
mapa: |
  #######
  #R..###
  ###.###
  ###..S#
  #######
codigo_inicial: |
  andar()
  andar()
solucao: |
  andar()
  andar()
  virar_direita()
  andar()
  andar()
  virar_esquerda()
  andar()
  andar()
dica: |
  `virar_direita()` e `virar_esquerda()` giram o Bit sem sair do lugar. Depois de virar,
  o próximo `andar()` segue na nova direção.
---
O caminho agora faz curvas. Para mudar de direção, o Bit precisa **virar** antes de andar.

Lembre: "direita" e "esquerda" são do ponto de vista do Bit, não da tela. Olhe a seta no peito dele.
