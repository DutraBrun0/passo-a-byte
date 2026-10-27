---
titulo: Corredor sem fim
xp: 30
direcao: leste
max_linhas: 2
mapa: |
  #################
  #R..............S
  #################
codigo_inicial: |
  andar()
solucao: |
  while not na_saida():
      andar()
dica: |
  `na_saida()` responde `True` ou `False`. Combine com `while not ...:` para andar
  **enquanto** o Bit ainda não chegou.
---
Este corredor é longo, e você só tem **2 linhas**. Contar as casas não vai adiantar.

Em vez de dizer quantas vezes repetir, diga **até quando**: o laço `while` repete enquanto
uma condição for verdadeira. Os sensores do Bit (como `na_saida()`) devolvem `True` ou `False`
e servem exatamente para isso.
