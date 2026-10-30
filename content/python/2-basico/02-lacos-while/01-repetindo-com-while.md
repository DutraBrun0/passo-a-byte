---
titulo: Repetindo com while
xp: 15
exercicio:
  enunciado: |
    Uma colônia de bactérias começa com **1** bactéria e **dobra a cada hora**. Leia um limite e mostre
    quantas horas leva para a população **passar** desse limite. Para o limite `1000`:

    ```text
    Horas: 10
    ```

    (Depois de 10 horas são 1024 bactérias, o primeiro valor acima de 1000.)
  codigo_inicial: |
    limite = int(input("Limite: "))
    populacao = 1
    horas = 0
    # dobre a população, hora a hora, até passar do limite

    print("Horas:", horas)
  entrada: ["1000"]
  testes:
    - tipo: saida
      nome: Limite 1000 leva 10 horas
      entrada: ["1000"]
      esperado: "Horas: 10"
    - tipo: saida
      nome: Limite 100 leva 7 horas
      entrada: ["100"]
      esperado: "Horas: 7"
    - tipo: saida
      nome: Limite 1 leva 1 hora
      entrada: ["1"]
      esperado: "Horas: 1"
    - tipo: estrutura
      nome: Usa um while
      usa: [While]
      mensagem: Não dá para saber de antemão quantas voltas são. Esse é o trabalho do while.
  dicas:
    - "A condição do `while` é o que precisa ser verdade para **continuar**: `populacao <= limite`."
    - "Dentro do laço, dobre a população (`populacao *= 2`) e some uma hora."
  solucao: |
    limite = int(input("Limite: "))
    populacao = 1
    horas = 0
    while populacao <= limite:
        populacao *= 2
        horas += 1
    print("Horas:", horas)
  explicacao_solucao: |
    O `while` testa a condição **antes** de cada volta. Enquanto a população ainda não passou do limite,
    ele dobra e conta mais uma hora. Na volta em que `populacao` fica maior que `limite`, a condição
    vira `False` e o programa segue para o `print`.

    Aqui não daria para usar `for` com `range`, porque não sabemos quantas horas serão antes de começar.
---
O `for` é ótimo quando você sabe quantas vezes vai repetir. Quando a repetição depende de uma
**condição**, use o `while` ("enquanto"):

```python
saldo = 100
while saldo > 0:
    print("Saldo:", saldo)
    saldo -= 40
print("Acabou o dinheiro!")
```

```text
Saldo: 100
Saldo: 60
Saldo: 20
Acabou o dinheiro!
```

## Cuidado com o laço infinito

Se nada dentro do laço mudar a condição, ele nunca termina:

```python
x = 1
while x > 0:
    print(x)   # x nunca muda: repete para sempre!
```

Aqui no site, o programa é interrompido com um aviso. Mas no seu computador ele travaria.
Sempre confira: **o que dentro do laço faz a condição um dia ficar falsa?**
