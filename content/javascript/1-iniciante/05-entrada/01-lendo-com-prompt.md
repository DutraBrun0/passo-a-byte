---
titulo: Lendo dados com prompt
xp: 15
exercicio:
  enunciado: |
    Pergunte o nome da pessoa com `prompt` e responda com uma saudação. Se ela digitar `Bia`:

    ```text
    Olá, Bia! Bem-vinda ao JavaScript.
    ```
  codigo_inicial: |
    const nome = "Bia"
    console.log(`Olá, ${nome}! Bem-vinda ao JavaScript.`)
  entrada: ["Bia"]
  testes:
    - tipo: saida
      nome: Responde para Bia
      entrada: ["Bia"]
      esperado: Olá, Bia! Bem-vinda ao JavaScript.
    - tipo: saida
      nome: Responde para Caio
      entrada: ["Caio"]
      esperado: Olá, Caio! Bem-vinda ao JavaScript.
    - tipo: estrutura
      nome: Usa prompt
      min_chamadas: { prompt: 1 }
      mensagem: O nome precisa vir do prompt, não de um texto fixo.
  dicas:
    - "`prompt(\"Qual é o seu nome? \")` mostra a pergunta e devolve o que foi digitado."
    - "Guarde a resposta numa constante: `const nome = prompt(...)`."
  solucao: |
    const nome = prompt("Qual é o seu nome? ")
    console.log(`Olá, ${nome}! Bem-vinda ao JavaScript.`)
  explicacao_solucao: |
    O `prompt` pausa o programa, mostra a pergunta e espera a resposta. O que a pessoa digitou volta
    como resultado e é guardado em `nome`. A partir daí, `nome` é uma constante como qualquer outra.

    Nos testes, o "digitar" é simulado: cada teste fornece uma resposta diferente.
---
Para conversar com quem usa o programa, o navegador oferece o `prompt`: ele mostra uma pergunta e
devolve o que a pessoa digitou.

```javascript
const cor = prompt("Qual é a sua cor favorita? ")
console.log(`Que legal, eu também gosto de ${cor}!`)
```

Se a pessoa digitar `verde`, a saída fica:

```text
Qual é a sua cor favorita? verde
Que legal, eu também gosto de verde!
```

Num site de verdade, o `prompt` abre uma janelinha. Aqui no Passo a Byte, as respostas vêm dos dados de
teste do exercício, e o que foi "digitado" aparece na saída depois da pergunta.

> O `prompt` **sempre** devolve um texto, mesmo quando a pessoa digita um número. A próxima lição mostra
> por que isso importa.
