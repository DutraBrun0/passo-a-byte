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

    O programa todo deve ter só dois `console.log`: um dentro da função e o do título.
  codigo_inicial: |
    // crie a função linha aqui

    console.log("Passo a Byte")
  testes:
    - tipo: saida
      nome: Título entre duas linhas de traços
      esperado: |
        --------------------
        Passo a Byte
        --------------------
    - tipo: estrutura
      nome: Define uma função e reaproveita o console.log
      usa: [FunctionDeclaration]
      max_chamadas: { console.log: 2 }
      min_chamadas: { linha: 2 }
      mensagem: Defina linha() com function e chame-a duas vezes, uma antes e outra depois do título.
  dicas:
    - "Uma função começa com `function nome() {` e o corpo vem entre as chaves."
    - "`\"-\".repeat(20)` repete o traço 20 vezes."
    - "Definir a função não a executa. Para isso, escreva `linha()`."
  solucao: |
    function linha() {
      console.log("-".repeat(20))
    }

    linha()
    console.log("Passo a Byte")
    linha()
  explicacao_solucao: |
    A declaração `function linha() { ... }` só **ensina** ao JavaScript o que `linha()` significa; nada
    aparece na tela nessa hora. Cada `linha()` lá embaixo **chama** a função, e aí sim o `console.log` de
    dentro roda.

    Se um dia você quiser linhas de `=`, muda em um só lugar e todas as chamadas acompanham.
---
Uma **função** é um bloco de código com nome. Você o escreve uma vez e o usa quantas vezes quiser.

```javascript
function comemorar() {
  console.log("Parabéns!")
  console.log("Você conseguiu!")
}

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

- `function` avisa que uma função está sendo criada;
- `comemorar` é o nome (mesmas regras dos nomes de variáveis);
- os parênteses `()` são obrigatórios, mesmo vazios;
- o corpo fica entre **chaves**.

Você já usava funções prontas o tempo todo: `console.log`, `prompt`, `Number`. Agora está criando as suas.
