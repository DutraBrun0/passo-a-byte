---
titulo: Comentários
xp: 10
exercicio:
  enunciado: |
    O programa abaixo mostra uma linha a mais. **Comente** (não apague) a linha que mostra
    `Esta linha não deveria aparecer`, para a saída ficar assim:

    ```text
    Passo 1
    Passo 2
    ```
  codigo_inicial: |
    console.log("Passo 1")
    console.log("Esta linha não deveria aparecer")
    console.log("Passo 2")
  testes:
    - tipo: saida
      nome: Mostra só os dois passos
      esperado: |
        Passo 1
        Passo 2
  dicas:
    - "Tudo o que vem depois de `//` numa linha é ignorado pelo JavaScript."
    - "Coloque `//` no começo da linha do meio."
  solucao: |
    console.log("Passo 1")
    // console.log("Esta linha não deveria aparecer")
    console.log("Passo 2")
  explicacao_solucao: |
    Com `//` no começo, a linha vira comentário: continua no arquivo, mas não é executada. Comentar
    uma linha em vez de apagar é um truque comum para testar o programa sem ela e poder trazê-la de
    volta depois.
---
**Comentários** são anotações para pessoas. O JavaScript ignora tudo o que vem depois de `//` na linha:

```javascript
// Mostra a saudação inicial
console.log("Oi!") // também dá para comentar no fim da linha
```

Para comentários de várias linhas, use `/*` para abrir e `*/` para fechar:

```javascript
/*
  Programa: saudação
  Autor: Bit
*/
console.log("Oi de novo!")
```

Bons comentários explicam **por que** o código faz algo, não **o que** ele faz (isso o próprio código
já mostra).

> No editor, o atalho **Ctrl + /** comenta ou descomenta a linha do cursor.
