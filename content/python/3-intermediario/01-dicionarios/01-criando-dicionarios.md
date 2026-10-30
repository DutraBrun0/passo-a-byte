---
titulo: Criando dicionários
xp: 15
exercicio:
  enunciado: |
    A ficha da aluna está desatualizada. No dicionário `aluna`:

    1. mude a idade para `16`;
    2. acrescente a chave `"curso"` com o valor `"Python"`;
    3. mostre a frase abaixo usando os valores do dicionário:

    ```text
    Ana tem 16 anos e faz Python
    ```
  codigo_inicial: |
    aluna = {"nome": "Ana", "idade": 15, "cidade": "Recife"}
    # atualize a ficha aqui

    print(aluna)
  testes:
    - tipo: variavel
      nome: aluna tem idade 16 e curso Python
      variavel: aluna
      esperado: { nome: Ana, idade: 16, cidade: Recife, curso: Python }
    - tipo: saida
      nome: Mostra a frase
      esperado: Ana tem 16 anos e faz Python
    - tipo: estrutura
      nome: Lê os valores pelo dicionário
      usa: [Subscript, JoinedStr]
      mensagem: Monte a frase com uma f-string usando aluna["nome"], aluna["idade"] e aluna["curso"].
  dicas:
    - "Para mudar um valor: `aluna[\"idade\"] = 16`."
    - "Acrescentar uma chave nova é igual: `aluna[\"curso\"] = \"Python\"`."
    - "Dentro de uma f-string, use aspas simples na chave: `f\"{aluna['nome']} tem ...\"`."
  solucao: |
    aluna = {"nome": "Ana", "idade": 15, "cidade": "Recife"}
    aluna["idade"] = 16
    aluna["curso"] = "Python"
    print(f"{aluna['nome']} tem {aluna['idade']} anos e faz {aluna['curso']}")
  explicacao_solucao: |
    Com dicionários, a mesma sintaxe `dicionario[chave] = valor` serve para **mudar** uma chave que
    existe e para **criar** uma nova. Dentro da f-string, as aspas da chave precisam ser diferentes das
    aspas de fora; por isso `aluna['nome']` usa aspas simples.
---
Numa lista, você acha um valor pela **posição**. Num **dicionário**, acha pelo **nome**, a chave:

```python
contato = {"nome": "Bia", "telefone": "9999-1234", "idade": 22}
print(contato["telefone"])
```

```text
9999-1234
```

Cada item é um par `chave: valor`, entre chaves `{}`. As chaves costumam ser textos e não se repetem.

```python
contato["idade"] = 23           # muda um valor
contato["email"] = "bia@ex.com" # cria uma chave nova
del contato["telefone"]         # apaga uma chave
print(contato)
```

```text
{'nome': 'Bia', 'idade': 23, 'email': 'bia@ex.com'}
```

Pedir uma chave que não existe dá `KeyError`. Para checar antes, use `in`: `"email" in contato`.
