---
titulo: Sorteios com random
xp: 20
exercicio:
  enunciado: |
    Crie duas funções usando o módulo `random`:

    - `rolar_dado()`: devolve um número inteiro **sorteado** de 1 a 6;
    - `sortear_vencedor(participantes)`: devolve um dos nomes da lista, sorteado.

    Os testes chamam as funções centenas de vezes para conferir que todos os resultados possíveis
    aparecem e que nenhum valor fora do esperado é sorteado.
  codigo_inicial: |
    def rolar_dado():
        return 4  # escolhido por um dado honesto


    def sortear_vencedor(participantes):
        return participantes[0]


    print(rolar_dado(), sortear_vencedor(["Ana", "Bia", "Caio"]))
  testes:
    - tipo: python
      nome: O dado sorteia todos os números de 1 a 6, e só eles
      codigo: |
        resultados = {rolar_dado() for _ in range(600)}
        assert resultados == {1, 2, 3, 4, 5, 6}
      mensagem: Use random.randint(1, 6), que inclui as duas pontas.
    - tipo: python
      nome: O dado devolve inteiros
      codigo: |
        assert all(type(rolar_dado()) is int for _ in range(50))
    - tipo: python
      nome: Todos os participantes podem ganhar
      codigo: |
        nomes = ["Ana", "Bia", "Caio", "Duda"]
        vencedores = {sortear_vencedor(nomes) for _ in range(400)}
        assert vencedores == set(nomes)
      mensagem: Use random.choice(lista) para sortear um item.
  dicas:
    - "`random.randint(a, b)` sorteia um inteiro entre `a` e `b`, **incluindo** os dois."
    - "`random.choice(lista)` sorteia um item da lista."
  solucao: |
    import random


    def rolar_dado():
        return random.randint(1, 6)


    def sortear_vencedor(participantes):
        return random.choice(participantes)


    print(rolar_dado(), sortear_vencedor(["Ana", "Bia", "Caio"]))
  explicacao_solucao: |
    Como o resultado muda a cada execução, não dá para testar um valor exato. Os testes verificam
    **propriedades**: depois de 600 lançamentos, é praticamente impossível um dado honesto não ter
    mostrado todas as faces (a chance é menor que uma em um quatrilhão).

    Atenção com o `randint`: diferente do `range`, ele **inclui** o número final.
---
O módulo `random` sorteia coisas:

```python
import random

print(random.randint(1, 10))          # inteiro de 1 a 10
print(random.random())                # decimal entre 0 e 1
print(random.choice(["pedra", "papel", "tesoura"]))

cartas = ["A", "K", "Q", "J"]
random.shuffle(cartas)                # embaralha a própria lista
print(cartas)

print(random.sample(range(1, 61), 6)) # 6 números diferentes, como na loteria
```

Cada execução dá um resultado diferente. Rode o exemplo algumas vezes para ver.

> Os números do `random` são **pseudoaleatórios**: vêm de uma fórmula que só parece imprevisível.
> Para jogos e simulações é perfeito; para senhas e segurança, o Python tem o módulo `secrets`.
