---
titulo: Parâmetros
xp: 20
exercicio:
  enunciado: |
    Crie a função `apresentar(nome, idade)` que mostra uma frase no formato abaixo e chame-a para as duas
    pessoas, nesta ordem:

    ```text
    Meu nome é Ana e tenho 12 anos.
    Meu nome é Leo e tenho 30 anos.
    ```

    Use um único `console.log`, dentro da função.
  codigo_inicial: |
    function apresentar() {
      console.log("Meu nome é Ana e tenho 12 anos.")
    }

    apresentar()
  testes:
    - tipo: saida
      nome: Apresenta Ana e Leo
      esperado: |
        Meu nome é Ana e tenho 12 anos.
        Meu nome é Leo e tenho 30 anos.
    - tipo: js
      nome: Funciona com outros nomes e idades
      codigo: |
        const mostrado = []
        const original = console
        console = { log: (...valores) => mostrado.push(valores.join(" ")) }
        apresentar("Zé", 7)
        console = original
        assert(mostrado.length === 1 && mostrado[0] === "Meu nome é Zé e tenho 7 anos.")
      mensagem: A função precisa usar os parâmetros nome e idade, não textos fixos.
    - tipo: estrutura
      nome: Um console.log só, dentro da função
      usa: [FunctionDeclaration]
      max_chamadas: { console.log: 1 }
      min_chamadas: { apresentar: 2 }
      mensagem: Coloque o console.log dentro da função e chame apresentar duas vezes, com valores diferentes.
  dicas:
    - "Os parâmetros ficam entre os parênteses: `function apresentar(nome, idade) {`."
    - "Dentro da função, use uma template string: `` `Meu nome é ${nome} e tenho ${idade} anos.` ``."
    - "Na chamada, passe os valores na mesma ordem: `apresentar(\"Ana\", 12)`."
  solucao: |
    function apresentar(nome, idade) {
      console.log(`Meu nome é ${nome} e tenho ${idade} anos.`)
    }

    apresentar("Ana", 12)
    apresentar("Leo", 30)
  explicacao_solucao: |
    `nome` e `idade` são **parâmetros**: variáveis que só existem dentro da função e recebem os valores
    passados na chamada. Em `apresentar("Ana", 12)`, `nome` vale `"Ana"` e `idade` vale `12`; na chamada
    seguinte, recebem os novos valores.
---
Uma função fica muito mais útil quando recebe **informações** de quem a chama. Elas entram pelos
**parâmetros**, os nomes entre parênteses:

```javascript
function saudar(nome) {
  console.log(`Oi, ${nome}!`)
}

saudar("Bia")
saudar("Caio")
```

```text
Oi, Bia!
Oi, Caio!
```

Uma função pode ter vários parâmetros, separados por vírgulas. Os valores da chamada (os
**argumentos**) são encaixados na mesma ordem.

Diferente de outras linguagens, JavaScript não reclama se faltar um argumento: o parâmetro simplesmente
fica `undefined`. Por isso vale a pena conferir as chamadas com cuidado.

```javascript
saudar()
```

```text
Oi, undefined!
```
