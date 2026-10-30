---
titulo: Verificando com assert
xp: 20
exercicio:
  enunciado: |
    A função `e_par` já está pronta. Escreva **pelo menos três** `assert` que verificam o comportamento
    dela, cobrindo um número par, um ímpar e o zero.

    Se todos os `assert` passarem, o programa termina sem mostrar nada, e isso é bom sinal!
  codigo_inicial: |
    def e_par(n):
        return n % 2 == 0


    # escreva seus asserts aqui
  testes:
    - tipo: estrutura
      nome: Pelo menos três asserts chamando e_par
      usa: [Assert]
      min_chamadas: { e_par: 3 }
      mensagem: Escreva linhas no formato assert e_par(4) == True, uma para cada caso.
    - tipo: python
      nome: Todos os asserts passam e e_par continua correta
      codigo: |
        assert e_par(10) and not e_par(3) and e_par(0)
      mensagem: Se um assert seu falhou, confira se a afirmação está certa. A função e_par não deve ser alterada.
  dicas:
    - "Um `assert` recebe uma condição: `assert e_par(4) == True`."
    - "Para o ímpar: `assert e_par(7) == False` (ou `assert not e_par(7)`)."
    - "Não esqueça do zero, que é par."
  solucao: |
    def e_par(n):
        return n % 2 == 0


    assert e_par(4) == True
    assert e_par(7) == False
    assert e_par(0) == True
    assert e_par(-2) == True
  explicacao_solucao: |
    Cada `assert` é uma pequena afirmação sobre o código. Hoje elas passam em silêncio; se amanhã alguém
    "melhorar" a função e quebrar o caso do zero, o `assert` dispara na hora e aponta a linha.

    Escolher **quais** casos testar é a parte mais importante: um caso comum de cada tipo (par, ímpar)
    e os casos de **borda**, onde os bugs adoram se esconder (zero, negativos, listas vazias...).
---
Como saber se o seu código funciona? Até agora, você rodava e olhava a saída. Mas olhar não escala:
num projeto com centenas de funções, ninguém confere tudo à mão a cada mudança.

A ferramenta mais simples para **automatizar** a conferência é o `assert`:

```python
def dobro(x):
    return x * 2


assert dobro(3) == 6     # passa em silêncio
assert dobro(0) == 0     # passa em silêncio
assert dobro(-1) == -3   # AssertionError!
```

Se a condição for verdadeira, nada acontece. Se for falsa, o programa para com um `AssertionError`
apontando a linha. Dá para incluir uma mensagem:

```python
assert dobro(2) == 4, "dobro de 2 deveria ser 4"
```

É exatamente assim que este site corrige seus exercícios: cada teste é uma verificação automática
sobre o seu código.
