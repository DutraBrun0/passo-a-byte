---
titulo: Valores padrão
xp: 20
exercicio:
  enunciado: |
    Crie a função `preco_final(preco, desconto=0)` que devolve o preço com o desconto (em %) aplicado,
    arredondado para 2 casas. Se o desconto não for informado, o preço fica igual:

    ```python
    preco_final(100)        # 100
    preco_final(100, 10)    # 90.0
    preco_final(59.9, 50)   # 29.95
    ```
  codigo_inicial: |
    def preco_final(preco, desconto):
        return preco - desconto


    print(preco_final(100, 10))
  testes:
    - tipo: funcao
      nome: Sem desconto, o preço não muda
      funcao: preco_final
      args: [100]
      esperado: 100
    - tipo: funcao
      nome: 10% de desconto em 100
      funcao: preco_final
      args: [100, 10]
      esperado: 90
    - tipo: funcao
      nome: 50% de desconto em 59.9
      funcao: preco_final
      args: [59.9, 50]
      esperado: 29.95
    - tipo: funcao
      nome: 15% de desconto em 39.99 (arredondado)
      funcao: preco_final
      args: [39.99, 15]
      esperado: 33.99
  dicas:
    - "No `def`, um parâmetro com `=` ganha um valor padrão: `def preco_final(preco, desconto=0):`."
    - "Tirar `desconto`% é multiplicar por `(1 - desconto / 100)`."
    - "`round(valor, 2)` arredonda para 2 casas."
  solucao: |
    def preco_final(preco, desconto=0):
        return round(preco * (1 - desconto / 100), 2)


    print(preco_final(100, 10))
  explicacao_solucao: |
    Com `desconto=0`, a chamada `preco_final(100)` é válida: o Python usa 0 no lugar do argumento que
    faltou. Quando o desconto é passado, ele substitui o padrão.

    O `round` é importante com dinheiro: `39.99 * 0.85` dá `33.9915`, e ninguém paga frações de centavo.
---
Às vezes um parâmetro quase sempre recebe o mesmo valor. Em vez de obrigar quem chama a repeti-lo,
dê a ele um **valor padrão**:

```python
def saudar(nome, saudacao="Olá"):
    return f"{saudacao}, {nome}!"


print(saudar("Ana"))
print(saudar("Ana", "Bom dia"))
```

```text
Olá, Ana!
Bom dia, Ana!
```

Você já usou isso: o `print` tem os parâmetros `sep=" "` e `end="\n"`. Por isso dá para escrever
`print("a", "b", sep="-")` e mudar só o separador.

Uma regra: os parâmetros com valor padrão vêm **depois** dos obrigatórios. `def f(a=1, b):` é erro de sintaxe.
