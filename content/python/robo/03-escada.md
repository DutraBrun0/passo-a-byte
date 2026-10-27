---
titulo: A escada
xp: 30
direcao: leste
max_linhas: 6
mapa: |
  ########
  #R.#####
  ##..####
  ###..###
  ####..##
  #####.S#
  ########
codigo_inicial: |
  andar()
  virar_direita()
  andar()
  virar_esquerda()
solucao: |
  for degrau in range(4):
      andar()
      virar_direita()
      andar()
      virar_esquerda()
  andar()
dica: |
  Os quatro comandos do código inicial formam **um degrau**. Use `for degrau in range(4):`
  e coloque os comandos recuados embaixo dele. Falta só um passo no final.
---
Uma escada é o mesmo movimento repetido várias vezes. Dava para escrever todos os comandos
um embaixo do outro, mas este desafio tem **limite de 6 linhas**.

Quando algo se repete um número conhecido de vezes, use um laço `for`:

```python
for i in range(3):
    print("isso se repete 3 vezes")
```
