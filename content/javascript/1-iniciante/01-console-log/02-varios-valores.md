---
titulo: Vários valores no mesmo console.log
xp: 10
exercicio:
  enunciado: |
    Com **um único** `console.log`, mostre a frase abaixo, passando os números `3` e `2` como números
    (sem aspas), separados do texto por vírgulas:

    ```text
    Bit tem 3 anos e 2 rodas
    ```
  codigo_inicial: |
    console.log("Bit tem 3 anos")
    console.log("e 2 rodas")
  testes:
    - tipo: saida
      nome: Mostra "Bit tem 3 anos e 2 rodas"
      esperado: Bit tem 3 anos e 2 rodas
    - tipo: estrutura
      nome: Usa um único console.log
      max_chamadas: { console.log: 1 }
      mensagem: Junte tudo em um só console.log, separando os valores com vírgulas.
  dicas:
    - Dentro dos parênteses do `console.log`, separe os valores com vírgulas.
    - O `console.log` coloca um espaço entre cada valor automaticamente.
  solucao: |
    console.log("Bit tem", 3, "anos e", 2, "rodas")
  explicacao_solucao: |
    Cada vírgula separa um valor. O `console.log` mostra todos na mesma linha, com um espaço entre eles.
    Por isso os textos não precisam de espaço nas pontas: `"Bit tem"` e não `"Bit tem "`.
---
O `console.log` aceita **vários valores** de uma vez, separados por vírgula:

```javascript
console.log("Nível", 1, "concluído!")
```

```text
Nível 1 concluído!
```

Números podem ir sem aspas: `1` é um número, `"1"` é um texto que tem o caractere 1.

Cada `console.log` termina a linha. Dois `console.log` mostram duas linhas:

```javascript
console.log("primeira")
console.log("segunda")
```

```text
primeira
segunda
```
