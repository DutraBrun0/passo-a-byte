---
titulo: "Desafio final: funções de teste"
xp: 30
exercicio:
  enunciado: |
    Escreva a função de teste `testar_aplicar_desconto()` com asserts que verificam a função
    `aplicar_desconto(preco, porcentagem)`.

    Para conferir se seus testes são bons, o corretor vai rodá-los duas vezes:

    1. com a `aplicar_desconto` **correta**: seus testes precisam **passar**;
    2. com uma versão **com bug**, que subtrai a porcentagem direto do preço (`preco - porcentagem`):
       seus testes precisam **falhar**.
  codigo_inicial: |
    def aplicar_desconto(preco, porcentagem):
        return preco * (100 - porcentagem) / 100


    def testar_aplicar_desconto():
        pass  # escreva os asserts aqui


    testar_aplicar_desconto()
    print("Testes ok!")
  testes:
    - tipo: saida
      nome: Os testes passam com a função correta
      esperado: Testes ok!
    - tipo: python
      nome: Os testes pegam o bug "preco - porcentagem"
      codigo: |
        correta = aplicar_desconto
        def aplicar_desconto(preco, porcentagem):
            return preco - porcentagem
        try:
            testar_aplicar_desconto()
            pegou = False
        except AssertionError:
            pegou = True
        aplicar_desconto = correta
        assert pegou
      mensagem: "Com 100, preco - porcentagem coincide com o certo! Teste outro preço, como aplicar_desconto(200, 10) == 180."
    - tipo: estrutura
      nome: Usa asserts dentro de testar_aplicar_desconto
      usa: [FunctionDef, Assert]
      mensagem: Coloque os asserts dentro da função de teste.
  dicas:
    - "Um teste é só uma função com asserts: `assert aplicar_desconto(200, 10) == 180`."
    - "Cuidado com `aplicar_desconto(100, 10)`: com preço 100, a versão com bug **também** dá 90. Escolha valores que diferenciam."
    - "Inclua os casos de borda: 0% (preço igual) e 100% (preço zero)."
  solucao: |
    def aplicar_desconto(preco, porcentagem):
        return preco * (100 - porcentagem) / 100


    def testar_aplicar_desconto():
        assert aplicar_desconto(200, 10) == 180
        assert aplicar_desconto(50, 0) == 50
        assert aplicar_desconto(80, 100) == 0
        assert aplicar_desconto(30, 50) == 15


    testar_aplicar_desconto()
    print("Testes ok!")
  explicacao_solucao: |
    Um teste bom é aquele que **falharia** se o código estivesse errado. Repare na armadilha do preço
    100: `100 - 10` e `100 × 90%` dão 90, então um teste só com esse valor passaria até com o bug.

    Essa técnica de inserir bugs de propósito para avaliar os testes tem nome: **teste de mutação**.

    Em projetos reais, funções `testar_...` (em inglês, `test_...`) ficam em arquivos separados e são
    encontradas e executadas automaticamente por ferramentas como o `pytest` ou o `unittest`.

    Parabéns: você chegou ao fim da trilha de Python!
---
Juntar os asserts dentro de **funções de teste** organiza tudo: cada função verifica uma parte do
programa e pode ser rodada sempre que algo mudar.

```python
def media(notas):
    return sum(notas) / len(notas)


def testar_media():
    assert media([10]) == 10
    assert media([6, 8]) == 7
    assert media([0, 0, 3]) == 1


testar_media()
print("tudo certo")
```

Ferramentas como o `pytest` encontram todas as funções que começam com `test_` e as executam de uma
vez, mostrando um relatório com o que passou e o que falhou. A ideia é a mesma que você está vendo aqui.

## O que torna um teste bom?

- **Falha quando o código está errado.** Um teste que sempre passa não protege nada.
- **Valores que diferenciam.** Escolha entradas em que um erro comum daria um resultado diferente.
- **Casos de borda.** Zero, vazio, máximo, mínimo.
- **Um assunto por teste.** Quando falhar, o nome já diz o que quebrou.
