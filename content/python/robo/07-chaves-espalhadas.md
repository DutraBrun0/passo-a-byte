---
titulo: Chaves espalhadas
xp: 40
direcao: leste
max_linhas: 7
mapa: |
  #########
  #R.C...C#
  #######.#
  #S..C...#
  #########
codigo_inicial: |
  while not na_saida():
      if tem_parede():
          virar_direita()
      else:
          andar()
solucao: |
  while not na_saida():
      if tem_chave():
          pegar_chave()
      if tem_parede():
          virar_direita()
      else:
          andar()
dica: |
  Antes de decidir se anda ou vira, verifique com `tem_chave()` se há uma chave na casa atual.
  São dois `if` separados, um embaixo do outro.
---
Agora há **três chaves** pelo caminho, e a saída só abre com todas.

O código inicial já leva o Bit até a bandeira, mas passa direto pelas chaves. Acrescente a
verificação `tem_chave()` sem passar de **7 linhas**.
