---
titulo: Lendo com input()
xp: 10
exercicio:
  enunciado: |
    Leia o nome da pessoa com `input()` e cumprimente-a. Se o nome digitado for `Ana`, a saída deve ser:

    ```text
    Olá, Ana!
    ```

    Aqui o "teclado" é simulado: ao executar, o exercício entrega um nome para o seu `input()`.
  codigo_inicial: |
    nome = "Ana"
    print("Olá,", nome)
  entrada: [Maria]
  testes:
    - tipo: saida
      nome: Cumprimenta Ana
      entrada: [Ana]
      esperado: Olá, Ana!
    - tipo: saida
      nome: Cumprimenta Bit
      entrada: [Bit]
      esperado: Olá, Bit!
  dicas:
    - "`nome = input()` guarda em `nome` o que foi digitado."
    - "Para o `!` ficar grudado no nome, junte os textos com `+`: `\"Olá, \" + nome + \"!\"`."
  solucao: |
    nome = input("Qual é o seu nome? ")
    print("Olá, " + nome + "!")
  explicacao_solucao: |
    `input()` pausa o programa, espera o usuário digitar e devolve o texto. Com o `+`, o `!` fica
    colado ao nome; com vírgulas no `print`, apareceria um espaço antes dele.

    O texto entre parênteses do `input` é só uma pergunta para o usuário e não conta nos testes.
---
Até agora, os programas faziam sempre a mesma coisa. Com `input()`, eles passam a **conversar**:

```python
cor = input("Qual sua cor favorita? ")
print("Eu também gosto de", cor)
```

Ao executar, o programa mostra a pergunta e espera. Se a pessoa digitar `laranja`:

```text
Qual sua cor favorita? laranja
Eu também gosto de laranja
```

Três detalhes importantes:

- O texto dentro do `input("...")` é opcional e serve só para orientar quem digita.
- O valor digitado vai para a variável quando a pessoa aperta Enter.
- `input()` **sempre devolve texto** (`str`), mesmo que a pessoa digite um número. Veremos isso na próxima lição.

> Nos exercícios, a entrada é simulada: cada teste entrega valores prontos para os seus `input()`.
