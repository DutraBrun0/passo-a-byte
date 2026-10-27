---
titulo: A chave
xp: 30
direcao: leste
mapa: |
  #########
  #R..C..S#
  #########
codigo_inicial: |
  while not na_saida():
      andar()
solucao: |
  andar()
  andar()
  andar()
  pegar_chave()
  andar()
  andar()
  andar()
dica: Pare em cima da chave e chame `pegar_chave()` antes de seguir para a bandeira.
---
A saída está **trancada**: o Bit só pode sair depois de pegar todas as chaves do mapa.

Para pegar uma chave, o Bit precisa estar **na mesma casa** que ela e chamar `pegar_chave()`.
Se não houver chave ali, ele reclama e o programa para.
