---
titulo: Formatando com f-strings
xp: 20
exercicio:
  enunciado: |
    Leia o **nome de um produto** e o **preço** dele (decimal) e mostre uma etiqueta com o preço
    sempre com duas casas decimais. Para `Café` e `4.5`:

    ```text
    Café custa R$ 4.50
    ```

    Use uma f-string.
  codigo_inicial: |
    produto = input("Produto: ")
    preco = float(input("Preço: "))
    print(produto, "custa R$", preco)
  entrada: [Café, "4.5"]
  testes:
    - tipo: saida
      nome: Café a 4.5
      entrada: [Café, "4.5"]
      esperado: Café custa R$ 4.50
    - tipo: saida
      nome: Pão de queijo a 12
      entrada: [Pão de queijo, "12"]
      esperado: Pão de queijo custa R$ 12.00
    - tipo: saida
      nome: Chiclete a 0.999 (arredonda)
      entrada: [Chiclete, "0.999"]
      esperado: Chiclete custa R$ 1.00
    - tipo: estrutura
      nome: Usa f-string
      usa: [JoinedStr]
      mensagem: Escreva o texto como f"..." com as variáveis entre chaves.
  dicas:
    - "Uma f-string começa com `f` antes das aspas: `f\"{produto} custa...\"`."
    - "Dentro das chaves, `{preco:.2f}` mostra o número com duas casas decimais."
  solucao: |
    produto = input("Produto: ")
    preco = float(input("Preço: "))
    print(f"{produto} custa R$ {preco:.2f}")
  explicacao_solucao: |
    Na f-string, tudo entre `{}` é calculado e colocado no texto. O `:.2f` depois do nome é um
    **formato**: `f` de float e `.2` para duas casas, arredondando se precisar (0.999 vira 1.00).
---
Montar frases com vírgulas e `+` funciona, mas fica confuso rápido. As **f-strings** deixam isso
bem mais legível: coloque um `f` antes das aspas e escreva variáveis entre chaves.

```python
nome = "Bit"
nivel = 3
print(f"{nome} chegou ao nível {nivel}!")
```

```text
Bit chegou ao nível 3!
```

Dentro das chaves pode ir qualquer conta: `f"O dobro é {nivel * 2}"`.

## Formatando números

Depois de `:` dentro das chaves, você controla a aparência do valor:

```python
pi = 3.14159
print(f"{pi:.2f}")
print(f"{0.5:.0%}")
```

```text
3.14
50%
```

`.2f` significa "decimal com 2 casas". É o jeito certo de mostrar dinheiro.
