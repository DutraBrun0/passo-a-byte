---
titulo: Comentários
xp: 10
exercicio:
  enunciado: |
    O programa abaixo quebra porque a primeira linha é uma explicação para humanos, não um comando.
    Transforme essa linha em **comentário** para que o programa mostre:

    ```text
    Bit 3 x 2 Byte
    ```
  codigo_inicial: |
    Placar final da partida
    print("Bit 3 x 2 Byte")
  testes:
    - tipo: saida
      nome: Mostra o placar
      esperado: Bit 3 x 2 Byte
      mensagem: A linha de explicação precisa começar com # para o Python ignorá-la.
  dicas:
    - O Python ignora tudo o que vem depois de um `#` na linha.
    - "Basta colocar `#` no começo da primeira linha."
  solucao: |
    # Placar final da partida
    print("Bit 3 x 2 Byte")
  explicacao_solucao: |
    Com o `#` na frente, a primeira linha vira um comentário: o Python pula essa linha e executa só o `print`.
    Sem o `#`, ele tenta entender `Placar final da partida` como código e reclama de erro de sintaxe.
---
Programas também são lidos por pessoas. **Comentários** são anotações que o Python ignora
completamente. Eles começam com `#`:

```python
# Mostra uma saudação para o jogador
print("Bem-vindo!")

print("Até logo!")  # também dá para comentar no fim da linha
```

Use comentários para explicar **por que** o código faz algo, não para repetir o que já está escrito.

> Dica de editor: comentar uma linha é um jeito rápido de "desligá-la" para testar o programa sem ela.
