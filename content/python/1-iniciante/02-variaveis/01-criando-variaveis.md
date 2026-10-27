---
titulo: Criando variáveis
xp: 10
exercicio:
  enunciado: |
    Crie duas variáveis:

    - `planeta`, com o texto `"Marte"`;
    - `distancia`, com o número `225`.

    Depois, use as variáveis (e não os valores escritos de novo) em um `print` para mostrar:

    ```text
    Marte fica a 225 milhões de km
    ```
  codigo_inicial: |
    # crie as variáveis aqui

    print("Marte fica a 225 milhões de km")
  testes:
    - tipo: variavel
      nome: Cria a variável planeta com "Marte"
      variavel: planeta
      esperado: Marte
    - tipo: variavel
      nome: Cria a variável distancia com 225
      variavel: distancia
      esperado: 225
    - tipo: saida
      nome: Mostra a frase completa
      esperado: Marte fica a 225 milhões de km
    - tipo: estrutura
      nome: Usa as variáveis no print
      usa: [Name, Assign]
      max_chamadas: { print: 1 }
      mensagem: Crie as variáveis com = e use os nomes delas dentro do print.
  dicas:
    - Uma variável é criada com `nome = valor`.
    - "O `print` aceita variáveis separadas por vírgula: `print(planeta, \"fica a\", ...)`."
  solucao: |
    planeta = "Marte"
    distancia = 225
    print(planeta, "fica a", distancia, "milhões de km")
  explicacao_solucao: |
    `planeta = "Marte"` guarda o texto em uma caixa chamada `planeta`. No `print`, escrever
    `planeta` **sem aspas** faz o Python buscar o valor guardado. Se você escrevesse `"planeta"`
    com aspas, apareceria a palavra "planeta" na tela.
---
Uma **variável** é um nome que guarda um valor para usar depois. Pense numa caixa com etiqueta:

```python
jogador = "Bit"
vidas = 3
print(jogador, "tem", vidas, "vidas")
```

```text
Bit tem 3 vidas
```

O sinal `=` **não** é "igual" da matemática: ele significa "guarde o valor da direita no nome da esquerda".

## Regras para nomes

- Use letras minúsculas, números e `_`: `pontos`, `vidas_extras`, `nivel2`.
- Não comece com número: `2nivel` é inválido.
- Sem espaços nem acentos é o mais seguro: `distancia` em vez de `distância`.
- Maiúsculas importam: `Vidas` e `vidas` são variáveis diferentes.
