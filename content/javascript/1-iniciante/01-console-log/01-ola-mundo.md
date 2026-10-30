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
    // Escreva seu código aqui embaixo
  testes:
    - tipo: saida
      nome: Mostra "Olá, mundo!"
      esperado: Olá, mundo!
      mensagem: Confira maiúsculas, vírgula e o ponto de exclamação. O texto precisa ser idêntico.
  dicas:
    - "Em JavaScript, quem mostra coisas é o `console.log`."
    - Textos ficam entre aspas, e o que vai ser mostrado fica entre parênteses.
    - "O formato é `console.log(\"seu texto\")`."
  solucao: |
    console.log("Olá, mundo!")
  explicacao_solucao: |
    `console.log` recebe o texto entre parênteses e o mostra no **console**, a área de mensagens do
    programa. As aspas dizem ao JavaScript que `Olá, mundo!` é um **texto** (uma *string*), e não um
    comando ou nome de variável.
---
Todo programador começa do mesmo jeito: fazendo o computador dizer **"Olá, mundo!"**.

JavaScript é a linguagem que dá vida às páginas da internet, e também roda fora do navegador. Para
mostrar algo, usamos o `console.log`:

```javascript
console.log("Bem-vindo ao Passo a Byte!")
```

Ao executar, aparece na saída:

```text
Bem-vindo ao Passo a Byte!
```

Repare em três detalhes:

- `console.log` tem um **ponto** no meio: `log` é uma função que mora dentro do `console`.
- Maiúsculas importam: `Console.log` ou `console.Log` não funcionam.
- Textos podem usar aspas duplas `"assim"` ou simples `'assim'`, desde que abra e feche com a mesma.

> Em muitos códigos você vai ver um `;` no fim das linhas: `console.log("oi");`. Ele é opcional na maioria
> dos casos. Aqui no Passo a Byte vamos escrever sem, mas os dois jeitos funcionam.
