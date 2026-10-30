---
titulo: Parâmetros
xp: 20
exercicio:
  enunciado: |
    Crie a função `apresentar(nome, idade)` que mostra uma frase no formato abaixo e chame-a para
    as duas pessoas, nesta ordem:

    ```text
    Meu nome é Ana e tenho 12 anos.
    Meu nome é Leo e tenho 30 anos.
    ```

    Use um único `print`, dentro da função.
  codigo_inicial: |
    def apresentar():
        print("Meu nome é Ana e tenho 12 anos.")


    apresentar()
  testes:
    - tipo: saida
      nome: Apresenta Ana e Leo
      esperado: |
        Meu nome é Ana e tenho 12 anos.
        Meu nome é Leo e tenho 30 anos.
    - tipo: python
      nome: Funciona com outros nomes e idades
      codigo: |
        mostrado = []
        def print(*valores, **_opcoes):
            mostrado.append(" ".join(str(v) for v in valores))
        apresentar("Zé", 7)
        del print
        assert mostrado == ["Meu nome é Zé e tenho 7 anos."]
      mensagem: A função precisa usar os parâmetros nome e idade, não textos fixos.
    - tipo: estrutura
      nome: Um print só, dentro da função
      usa: [FunctionDef]
      max_chamadas: { print: 1 }
      min_chamadas: { apresentar: 2 }
      mensagem: Coloque o print dentro da função e chame apresentar duas vezes, com valores diferentes.
  dicas:
    - "Os parâmetros ficam entre os parênteses do `def`: `def apresentar(nome, idade):`."
    - "Dentro da função, use uma f-string: `f\"Meu nome é {nome} e tenho {idade} anos.\"`."
    - "Na chamada, passe os valores na mesma ordem: `apresentar(\"Ana\", 12)`."
  solucao: |
    def apresentar(nome, idade):
        print(f"Meu nome é {nome} e tenho {idade} anos.")


    apresentar("Ana", 12)
    apresentar("Leo", 30)
  explicacao_solucao: |
    `nome` e `idade` são **parâmetros**: variáveis que só existem dentro da função e recebem os valores
    passados na chamada. Em `apresentar("Ana", 12)`, `nome` vale `"Ana"` e `idade` vale `12`; na chamada
    seguinte, recebem os novos valores.
---
Uma função fica muito mais útil quando recebe **informações** de quem a chama. Elas entram pelos
**parâmetros**, os nomes entre parênteses:

```python
def saudar(nome):
    print(f"Oi, {nome}!")


saudar("Bia")
saudar("Caio")
```

```text
Oi, Bia!
Oi, Caio!
```

Uma função pode ter vários parâmetros, separados por vírgulas. Os valores da chamada (os
**argumentos**) são encaixados na mesma ordem:

```python
def repetir(texto, vezes):
    for _ in range(vezes):
        print(texto)


repetir("eco", 3)
```

Esquecer um argumento dá `TypeError`: o Python avisa que faltou um valor para o parâmetro.
