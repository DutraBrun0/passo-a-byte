---
titulo: and, or e not
xp: 15
exercicio:
  enunciado: |
    Para entrar no show, a pessoa precisa **ter ingresso** e ter **14 anos ou mais**.

    Com as variáveis já criadas, monte `pode_entrar` combinando as duas condições, e mostre o resultado.
  codigo_inicial: |
    tem_ingresso = True
    idade = 15
    pode_entrar = tem_ingresso
    print(pode_entrar)
  testes:
    - tipo: estrutura
      nome: Combina as condições com and
      usa: [BoolOp, Compare]
      mensagem: As duas condições precisam valer ao mesmo tempo. Use and.
    - tipo: variavel
      nome: pode_entrar é True para quem tem ingresso e 15 anos
      variavel: pode_entrar
      esperado: true
    - tipo: saida
      nome: Mostra True
      esperado: "True"
  dicas:
    - "\"Precisa disto **e** daquilo\" se escreve com `and`."
    - "`tem_ingresso and idade >= 14`."
  solucao: |
    tem_ingresso = True
    idade = 15
    pode_entrar = tem_ingresso and idade >= 14
    print(pode_entrar)
  explicacao_solucao: |
    `and` só dá `True` quando os dois lados são verdadeiros. Se trocasse por `or`, bastaria ter
    ingresso **ou** idade, e uma criança de 8 anos com ingresso entraria.
---
Às vezes uma condição depende de outras. Os operadores lógicos combinam booleanos:

| Operador | Dá `True` quando... |
|----------|---------------------|
| `a and b` | **os dois** são verdadeiros |
| `a or b` | **pelo menos um** é verdadeiro |
| `not a` | `a` é falso (inverte) |

```python
fim_de_semana = True
chovendo = False

print(fim_de_semana and not chovendo)
print(chovendo or fim_de_semana)
```

```text
True
True
```

Dá para misturar com comparações: `nota >= 6 and faltas < 10`. O Python primeiro calcula as
comparações e depois aplica o `and`.
