---
titulo: Métodos
xp: 25
exercicio:
  enunciado: |
    Complete a classe `Conta`:

    - toda conta começa com `saldo` 0;
    - `depositar(valor)` soma o valor ao saldo;
    - `sacar(valor)` tira o valor do saldo e devolve `True`. Se não houver saldo suficiente, não muda
      nada e devolve `False`.

    ```python
    conta = Conta("Ana")
    conta.depositar(100)
    conta.sacar(30)    # True
    conta.sacar(500)   # False
    conta.saldo        # 70
    ```
  codigo_inicial: |
    class Conta:
        def __init__(self, titular):
            self.titular = titular

        def depositar(self, valor):
            pass

        def sacar(self, valor):
            pass


    conta = Conta("Ana")
    conta.depositar(100)
    print(conta.sacar(30), conta.saldo)
  testes:
    - tipo: python
      nome: Conta nova começa com saldo 0
      codigo: |
        assert Conta("Bia").saldo == 0
      mensagem: Crie self.saldo = 0 no __init__.
    - tipo: python
      nome: Depósitos somam no saldo
      codigo: |
        c = Conta("Bia")
        c.depositar(50)
        c.depositar(25)
        assert c.saldo == 75
    - tipo: python
      nome: Saque com saldo suficiente
      codigo: |
        c = Conta("Bia")
        c.depositar(100)
        assert c.sacar(30) is True
        assert c.saldo == 70
    - tipo: python
      nome: Saque sem saldo devolve False e não muda nada
      codigo: |
        c = Conta("Bia")
        c.depositar(20)
        assert c.sacar(50) is False
        assert c.saldo == 20
    - tipo: python
      nome: Contas diferentes não se misturam
      codigo: |
        a, b = Conta("A"), Conta("B")
        a.depositar(10)
        assert b.saldo == 0
  dicas:
    - "No `__init__`, acrescente `self.saldo = 0`."
    - "Dentro dos métodos, mexa em `self.saldo`, não numa variável solta."
    - "Em `sacar`, teste `if valor > self.saldo: return False` antes de descontar."
  solucao: |
    class Conta:
        def __init__(self, titular):
            self.titular = titular
            self.saldo = 0

        def depositar(self, valor):
            self.saldo += valor

        def sacar(self, valor):
            if valor > self.saldo:
                return False
            self.saldo -= valor
            return True


    conta = Conta("Ana")
    conta.depositar(100)
    print(conta.sacar(30), conta.saldo)
  explicacao_solucao: |
    Os métodos recebem `self` e, através dele, leem e alteram o estado **daquele** objeto. É isso que
    diferencia um objeto de um dicionário com funções soltas: os dados e as operações que fazem sentido
    sobre eles andam juntos.

    A regra do saque sem saldo fica escondida dentro da classe. Quem usa a conta não precisa lembrar de
    conferir o saldo: a própria conta cuida disso.
---
**Métodos** são funções definidas dentro de uma classe. Eles sempre recebem `self` como primeiro
parâmetro, e é por ele que acessam os atributos do objeto:

```python
class Contador:
    def __init__(self):
        self.valor = 0

    def incrementar(self):
        self.valor += 1

    def zerar(self):
        self.valor = 0


cliques = Contador()
cliques.incrementar()
cliques.incrementar()
print(cliques.valor)
```

```text
2
```

Na chamada `cliques.incrementar()`, você não passa o `self`: o Python coloca o objeto `cliques` ali
sozinho. Por isso o método tem um parâmetro a mais do que a chamada.

Você já chamou muitos métodos assim: `lista.append(x)`, `texto.upper()`, `dicionario.get(chave)`.
