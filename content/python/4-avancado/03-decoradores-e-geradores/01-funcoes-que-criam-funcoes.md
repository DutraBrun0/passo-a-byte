---
titulo: Funções que criam funções
xp: 20
exercicio:
  enunciado: |
    Crie a função `criar_multiplicador(n)` que **devolve uma nova função**. A função devolvida recebe
    um número e o multiplica por `n`:

    ```python
    dobro = criar_multiplicador(2)
    triplo = criar_multiplicador(3)
    dobro(5)    # 10
    triplo(5)   # 15
    ```
  codigo_inicial: |
    def criar_multiplicador(n):
        return n * 2


    dobro = criar_multiplicador(2)
    print(dobro)
  testes:
    - tipo: python
      nome: dobro e triplo
      codigo: |
        dobro = criar_multiplicador(2)
        triplo = criar_multiplicador(3)
        assert dobro(5) == 10
        assert triplo(5) == 15
      mensagem: criar_multiplicador precisa devolver uma função, não um número.
    - tipo: python
      nome: Cada função lembra o próprio n
      codigo: |
        por_10 = criar_multiplicador(10)
        por_0 = criar_multiplicador(0)
        assert por_10(7) == 70
        assert por_0(7) == 0
        assert por_10(-1) == -10
    - tipo: estrutura
      nome: Define uma função dentro da outra
      usa: [FunctionDef, Return]
      mensagem: Crie a função interna com def (ou lambda) e devolva-a com return, sem os parênteses.
  dicas:
    - "Dentro de `criar_multiplicador`, crie outra função: `def multiplicar(x):`."
    - "A função interna pode usar o `n` da função de fora."
    - "Devolva a função **sem chamá-la**: `return multiplicar` (sem parênteses)."
  solucao: |
    def criar_multiplicador(n):
        def multiplicar(x):
            return x * n
        return multiplicar


    dobro = criar_multiplicador(2)
    print(dobro(5))
  explicacao_solucao: |
    Cada chamada de `criar_multiplicador` cria uma função `multiplicar` nova, que **lembra** o valor de
    `n` daquela chamada, mesmo depois de `criar_multiplicador` ter terminado. Uma função que carrega
    variáveis do lugar onde foi criada se chama **closure** (fechamento).

    Com `lambda`, a solução fica numa linha: `return lambda x: x * n`.
---
Como funções são valores, uma função pode **criar e devolver** outra:

```python
def criar_saudacao(saudacao):
    def saudar(nome):
        return f"{saudacao}, {nome}!"
    return saudar


bom_dia = criar_saudacao("Bom dia")
boa_noite = criar_saudacao("Boa noite")
print(bom_dia("Ana"))
print(boa_noite("Ana"))
```

```text
Bom dia, Ana!
Boa noite, Ana!
```

Repare: `criar_saudacao` já terminou de rodar quando `bom_dia("Ana")` é chamada, mas `saudar` ainda
lembra que a `saudacao` era `"Bom dia"`. Essa "memória" é o que faz as **closures** funcionarem, e é
a base dos decoradores, o assunto da próxima lição.
