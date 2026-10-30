---
titulo: Template strings
xp: 15
exercicio:
  enunciado: |
    Usando as variáveis `nome` e `idade`, mostre a frase abaixo com **uma template string** (entre
    crases), calculando a idade do ano que vem dentro dela:

    ```text
    Olá, Ana! Ano que vem você terá 16 anos.
    ```
  codigo_inicial: |
    const nome = "Ana"
    const idade = 15

    console.log("Olá, " + nome + "!")
  testes:
    - tipo: saida
      nome: Mostra a frase completa
      esperado: Olá, Ana! Ano que vem você terá 16 anos.
    - tipo: estrutura
      nome: Usa template string
      usa: [TemplateLiteral]
      max_chamadas: { console.log: 1 }
      mensagem: Escreva o texto entre crases (`) com as variáveis dentro de ${ }.
  dicas:
    - "A crase fica perto da tecla de aspas ou do Enter, dependendo do teclado: `` ` ``."
    - "Dentro da crase, `${nome}` é trocado pelo valor da variável."
    - "Dá para fazer contas dentro: `${idade + 1}`."
  solucao: |
    const nome = "Ana"
    const idade = 15

    console.log(`Olá, ${nome}! Ano que vem você terá ${idade + 1} anos.`)
  explicacao_solucao: |
    Tudo o que está dentro de `${ }` é calculado e encaixado no texto. Sem template string, a mesma
    frase precisaria de vários `+` e de cuidado com os espaços:

    ```javascript
    console.log("Olá, " + nome + "! Ano que vem você terá " + (idade + 1) + " anos.")
    ```
---
Juntar textos com `+` funciona, mas fica confuso rápido:

```javascript
const produto = "café"
const preco = 12
console.log("O " + produto + " custa R$ " + preco + ".")
```

As **template strings** resolvem isso. Elas usam **crases** (`` ` ``) em vez de aspas e aceitam
expressões dentro de `${ }`:

```javascript
const produto = "café"
const preco = 12
console.log(`O ${produto} custa R$ ${preco}.`)
console.log(`Dois custam R$ ${preco * 2}.`)
```

```text
O café custa R$ 12.
Dois custam R$ 24.
```

Template strings também podem ocupar várias linhas, sem truque nenhum.
