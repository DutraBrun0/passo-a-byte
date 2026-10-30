---
titulo: Devolvendo um resultado
xp: 20
exercicio:
  enunciado: |
    Crie a função `celsius_para_fahrenheit(c)` que **devolve** (com `return`) a temperatura convertida.
    A fórmula é `F = C × 9 / 5 + 32`.

    Por exemplo, `celsius_para_fahrenheit(100)` deve devolver `212.0`. A função não deve mostrar nada:
    quem chama decide o que fazer com o valor.
  codigo_inicial: |
    def celsius_para_fahrenheit(c):
        print(c * 9 / 5 + 32)


    temperatura = celsius_para_fahrenheit(25)
    print("25 °C =", temperatura, "°F")
  testes:
    - tipo: funcao
      nome: 0 °C são 32 °F
      funcao: celsius_para_fahrenheit
      args: [0]
      esperado: 32
    - tipo: funcao
      nome: 100 °C são 212 °F
      funcao: celsius_para_fahrenheit
      args: [100]
      esperado: 212
    - tipo: funcao
      nome: -40 °C são -40 °F
      funcao: celsius_para_fahrenheit
      args: [-40]
      esperado: -40
    - tipo: funcao
      nome: 36.5 °C são 97.7 °F
      funcao: celsius_para_fahrenheit
      args: [36.5]
      esperado: 97.7
    - tipo: estrutura
      nome: Usa return
      usa: [Return]
      mensagem: Troque o print de dentro da função por return.
  dicas:
    - "Rode o código inicial: ele mostra `77.0` e depois `25 °C = None °F`. Por quê?"
    - "Uma função sem `return` devolve `None`. Troque o `print(...)` por `return ...`."
  solucao: |
    def celsius_para_fahrenheit(c):
        return c * 9 / 5 + 32


    temperatura = celsius_para_fahrenheit(25)
    print("25 °C =", temperatura, "°F")
  explicacao_solucao: |
    `print` **mostra** um valor na tela, mas ele se perde ali. `return` **entrega** o valor para quem
    chamou, que pode guardá-lo numa variável, fazer contas, comparar ou, se quiser, mostrar.

    Por isso, no código inicial, `temperatura` ficava valendo `None`: a função mostrava o número mas não
    devolvia nada. Funções que devolvem valores são muito mais fáceis de reaproveitar e de testar.
---
Até agora as funções só **mostravam** coisas. Mas `len("oi")` não mostra nada: ela **devolve** `2`,
e você faz o que quiser com esse valor. Para suas funções fazerem o mesmo, use `return`:

```python
def dobro(numero):
    return numero * 2


x = dobro(5)
print(x)              # 10
print(dobro(x) + 1)   # 21
```

Quando o Python chega num `return`, a função **termina** na hora e o valor volta para o lugar da
chamada. Por isso dá para usar a chamada no meio de uma conta, como em `dobro(x) + 1`.

```python
def maior(a, b):
    if a > b:
        return a
    return b


print(maior(3, 9))
```

```text
9
```
