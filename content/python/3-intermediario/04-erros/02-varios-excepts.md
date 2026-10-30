---
titulo: Tratando erros diferentes
xp: 20
exercicio:
  enunciado: |
    Crie a função `dividir(a, b)` que devolve `a / b`, mas trata os problemas:

    - se `b` for zero, devolve o texto `"divisão por zero"`;
    - se algum valor não for número (como `"10"`), devolve `"valores inválidos"`.

    ```python
    dividir(10, 4)     # 2.5
    dividir(1, 0)      # 'divisão por zero'
    dividir("10", 2)   # 'valores inválidos'
    ```
  codigo_inicial: |
    def dividir(a, b):
        return a / b


    print(dividir(10, 4))
  testes:
    - tipo: funcao
      nome: dividir(10, 4)
      funcao: dividir
      args: [10, 4]
      esperado: 2.5
    - tipo: funcao
      nome: dividir(1, 0)
      funcao: dividir
      args: [1, 0]
      esperado: divisão por zero
    - tipo: funcao
      nome: dividir("10", 2)
      funcao: dividir
      args: ["10", 2]
      esperado: valores inválidos
    - tipo: funcao
      nome: dividir(5, None)
      funcao: dividir
      args: [5, null]
      esperado: valores inválidos
    - tipo: estrutura
      nome: Usa try/except
      usa: [Try]
      mensagem: Trate os erros com except, em vez de testar os valores com if.
  dicas:
    - "Um `try` pode ter vários `except`, um para cada tipo de erro."
    - "Dividir por zero lança `ZeroDivisionError`; dividir texto lança `TypeError`."
  solucao: |
    def dividir(a, b):
        try:
            return a / b
        except ZeroDivisionError:
            return "divisão por zero"
        except TypeError:
            return "valores inválidos"


    print(dividir(10, 4))
  explicacao_solucao: |
    O Python testa os `except` de cima para baixo e usa o primeiro que combina com o erro. Cada tipo de
    problema ganha sua própria resposta.

    Quando dois erros recebem o mesmo tratamento, dá para juntá-los numa tupla:
    `except (ZeroDivisionError, TypeError):`.
---
Um mesmo bloco pode falhar de jeitos diferentes. Use vários `except` para tratar cada um:

```python
notas = {"ana": 9}
nome = "bia"
try:
    print(100 / notas[nome])
except KeyError:
    print("Aluno não encontrado")
except ZeroDivisionError:
    print("Nota zero")
```

```text
Aluno não encontrado
```

## else e finally

O `try` ainda tem duas partes opcionais:

```python
try:
    x = int("42")
except ValueError:
    print("Inválido")
else:
    print("Deu certo:", x)     # só se NÃO houve erro
finally:
    print("Fim da tentativa")   # roda SEMPRE
```

```text
Deu certo: 42
Fim da tentativa
```

O `finally` é usado para "arrumar a casa", como fechar um arquivo, aconteça o que acontecer.
