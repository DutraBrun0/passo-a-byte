---
titulo: Verdadeiro ou falso
xp: 10
exercicio:
  enunciado: |
    Crie duas variáveis booleanas:

    - `chovendo`, valendo **falso**;
    - `tem_guarda_chuva`, valendo **verdadeiro**.

    E mostre as duas, uma por linha.
  codigo_inicial: |
    chovendo = "não"
    tem_guarda_chuva = "sim"
    print(chovendo)
    print(tem_guarda_chuva)
  testes:
    - tipo: variavel
      nome: chovendo é False
      variavel: chovendo
      esperado: false
    - tipo: variavel
      nome: tem_guarda_chuva é True
      variavel: tem_guarda_chuva
      esperado: true
    - tipo: saida
      nome: Mostra False e True
      esperado: |
        False
        True
  dicas:
    - "Os valores booleanos são `True` e `False`, sem aspas."
    - A primeira letra é maiúscula. `true` (minúsculo) não existe em Python.
  solucao: |
    chovendo = False
    tem_guarda_chuva = True
    print(chovendo)
    print(tem_guarda_chuva)
  explicacao_solucao: |
    `True` e `False` são valores do tipo `bool`. Escritos com aspas, como `"sim"`, seriam apenas
    textos, e o Python não saberia usá-los numa decisão com `if`.
---
Alguns valores só podem ser **verdadeiro** ou **falso**. Em Python eles se chamam `True` e `False`,
e são do tipo `bool` (booleano, em homenagem ao matemático George Boole):

```python
ligado = True
pausado = False
print(type(ligado))
```

```text
<class 'bool'>
```

Booleanos aparecem o tempo todo como **resultado de perguntas**, por exemplo comparações:

```python
print(5 > 3)
print(2 == 7)
```

```text
True
False
```

Você vai usá-los muito para tomar decisões com `if`, no último módulo deste nível.
