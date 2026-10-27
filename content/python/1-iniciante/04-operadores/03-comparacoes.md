---
titulo: Comparações
xp: 10
exercicio:
  enunciado: |
    No Brasil, é possível votar a partir dos 16 anos. Com `idade = 17`, crie a variável
    `pode_votar` com o **resultado de uma comparação** entre `idade` e `16`, e mostre o valor dela.
  codigo_inicial: |
    idade = 17
    pode_votar = idade
    print(pode_votar)
  testes:
    - tipo: variavel
      nome: pode_votar é True para 17 anos
      variavel: pode_votar
      esperado: true
    - tipo: estrutura
      nome: Usa uma comparação
      usa: [Compare]
      mensagem: Compare a idade com 16 usando um operador como >=.
    - tipo: saida
      nome: Mostra True
      esperado: "True"
  dicas:
    - "\"A partir de 16\" inclui o próprio 16. Qual operador quer dizer \"maior ou igual\"?"
    - "`idade >= 16` já é um valor `True` ou `False`. Guarde esse resultado em `pode_votar`."
  solucao: |
    idade = 17
    pode_votar = idade >= 16
    print(pode_votar)
  explicacao_solucao: |
    Uma comparação **é** um valor: `idade >= 16` vira `True` ou `False`, e pode ser guardado numa
    variável como qualquer outro. Usar `>` aqui seria um erro sutil: quem tem exatamente 16 anos ficaria de fora.
---
Comparações respondem perguntas com `True` ou `False`:

| Operador | Pergunta |
|----------|----------|
| `==` | é igual? |
| `!=` | é diferente? |
| `>` / `<` | é maior? / é menor? |
| `>=` / `<=` | é maior ou igual? / é menor ou igual? |

```python
nota = 7
print(nota >= 6)
print(nota == 10)
print(nota != 10)
```

```text
True
False
True
```

> Cuidado: `=` **guarda** um valor; `==` **compara** dois valores. Trocar um pelo outro é um dos erros mais comuns.

Textos também podem ser comparados: `"bit" == "bit"` é `True`, mas `"Bit" == "bit"` é `False`, porque maiúsculas contam.
