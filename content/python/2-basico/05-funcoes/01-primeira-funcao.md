---
titulo: Sua primeira função
xp: 15
exercicio:
  enunciado: |
    Crie uma função chamada `linha` que mostra 20 traços (`-`). Depois use-a para emoldurar o título:

    ```text
    --------------------
    Passo a Byte
    --------------------
    ```

    O programa todo deve ter só dois `print`: um dentro da função e o do título.
  codigo_inicial: |
    # crie a função linha aqui

    print("Passo a Byte")
  testes:
    - tipo: saida
      nome: Título entre duas linhas de traços
      esperado: |
        --------------------
        Passo a Byte
        --------------------
    - tipo: estrutura
      nome: Define uma função e reaproveita o print
      usa: [FunctionDef]
      max_chamadas: { print: 2 }
      min_chamadas: { linha: 2 }
      mensagem: Defina linha() com def e chame-a duas vezes, uma antes e outra depois do título.
  dicas:
    - "Uma função começa com `def nome():` e o corpo vem recuado embaixo."
    - "`\"-\" * 20` repete o traço 20 vezes."
    - "Definir a função não a executa. Para isso, escreva `linha()`."
  solucao: |
    def linha():
        print("-" * 20)


    linha()
    print("Passo a Byte")
    linha()
  explicacao_solucao: |
    O `def` só **ensina** ao Python o que `linha()` significa; nada aparece na tela nessa hora. Cada
    `linha()` lá embaixo **chama** a função, e aí sim o `print` de dentro roda.

    Se um dia você quiser linhas de `=`, muda em um só lugar e todas as chamadas acompanham.
---
Uma **função** é um bloco de código com nome. Você o escreve uma vez e o usa quantas vezes quiser.

```python
def comemorar():
    print("Parabéns!")
    print("Você conseguiu!")


comemorar()
comemorar()
```

```text
Parabéns!
Você conseguiu!
Parabéns!
Você conseguiu!
```

As partes:

- `def` avisa que uma função está sendo criada;
- `comemorar` é o nome (mesmas regras dos nomes de variáveis);
- os parênteses `()` e os dois-pontos `:` são obrigatórios;
- o corpo vem **recuado**, como no `if` e no `for`.

Você já usava funções prontas o tempo todo: `print`, `len`, `input`. Agora está criando as suas.
