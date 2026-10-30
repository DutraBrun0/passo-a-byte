---
titulo: Repetindo com for
xp: 15
exercicio:
  enunciado: |
    Faça uma contagem regressiva de **10 até 1**, um número por linha, e depois mostre `Já!`:

    ```text
    10
    9
    8
    ...
    1
    Já!
    ```

    Use um `for`: no máximo dois `console.log` no programa inteiro.
  codigo_inicial: |
    console.log(10)
    console.log(9)
    // ... troque tudo isso por um for
  testes:
    - tipo: saida
      nome: Conta de 10 até 1 e mostra "Já!"
      esperado: |
        10
        9
        8
        7
        6
        5
        4
        3
        2
        1
        Já!
    - tipo: estrutura
      nome: Usa um for com no máximo dois console.log
      usa: [ForStatement]
      max_chamadas: { console.log: 2 }
      mensagem: Um console.log fica dentro do for (para os números) e outro fora, depois do laço.
  dicas:
    - "O `for` tem três partes: `for (let i = 10; i >= 1; i--)`."
    - "Começo: `i` vale 10. Condição para continuar: `i >= 1`. A cada volta: `i--`."
    - "O `console.log(\"Já!\")` fica fora das chaves do laço, para rodar uma vez só."
  solucao: |
    for (let i = 10; i >= 1; i--) {
      console.log(i)
    }
    console.log("Já!")
  explicacao_solucao: |
    O `for` faz três coisas: cria `i` com 10, testa `i >= 1` antes de cada volta e, ao fim de cada volta,
    executa `i--`. Quando `i` chega a 0, a condição falha e o laço termina. O `console.log("Já!")` está
    fora das chaves, então só roda depois.
---
Imagine mostrar os números de 1 a 100 com cem `console.log`. Para repetir uma tarefa, usamos um
**laço**. O mais clássico em JavaScript é o `for`:

```javascript
for (let i = 0; i < 5; i++) {
  console.log("Volta", i)
}
```

```text
Volta 0
Volta 1
Volta 2
Volta 3
Volta 4
```

Dentro dos parênteses há três partes, separadas por `;`:

| Parte | Exemplo | Quando roda |
|-------|---------|-------------|
| início | `let i = 0` | uma vez, antes de tudo |
| condição | `i < 5` | antes de cada volta: se for `false`, o laço para |
| passo | `i++` | no fim de cada volta |

O que está entre as chaves é o **corpo** do laço, que se repete. Dá para contar de 2 em 2 com `i += 2`,
ou para trás com `i--`.
