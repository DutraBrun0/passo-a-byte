---
titulo: Olá, mundo!
xp: 10
exercicio:
  enunciado: |
    Escreva um programa que mostre exatamente esta mensagem:

    ```text
    Olá, mundo!
    ```
  codigo_inicial: |
    # Escreva seu código aqui embaixo
  testes:
    - tipo: saida
      nome: Mostra "Olá, mundo!"
      esperado: Olá, mundo!
      mensagem: Confira maiúsculas, vírgula e o ponto de exclamação. O texto precisa ser idêntico.
  dicas:
    - A função que mostra coisas na tela se chama `print`.
    - Textos ficam entre aspas, e o que vai para o `print` fica entre parênteses.
    - "O formato é `print(\"seu texto\")`."
  solucao: |
    print("Olá, mundo!")
  explicacao_solucao: |
    `print` recebe o texto entre parênteses e o mostra na tela. As aspas dizem ao Python que
    `Olá, mundo!` é um **texto** (uma *string*), e não um comando ou nome de variável.
---
Todo programador começa do mesmo jeito: fazendo o computador dizer **"Olá, mundo!"**.

Em Python, para mostrar algo na tela usamos a função `print`:

```python
print("Bem-vindo ao Passo a Byte!")
```

Ao executar, aparece na saída:

```text
Bem-vindo ao Passo a Byte!
```

Repare em três detalhes:

- `print` é escrito em letras minúsculas. `Print` ou `PRINT` não funcionam.
- O que vai ser mostrado fica **entre parênteses**.
- Texto fica **entre aspas**. Pode ser aspas duplas `"assim"` ou simples `'assim'`, desde que abra e feche com a mesma.

> O Python executa o programa de cima para baixo, uma linha de cada vez.
