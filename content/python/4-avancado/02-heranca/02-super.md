---
titulo: Chamando a classe mãe com super()
xp: 25
exercicio:
  enunciado: |
    Crie a classe `Gerente`, filha de `Funcionario`. Um gerente recebe também um `bonus` no
    `__init__`, e o `pagamento()` dele é o salário **mais** o bônus:

    ```python
    g = Gerente("Bia", 5000, 1500)
    g.nome          # 'Bia'
    g.pagamento()   # 6500
    ```

    Use `super()` para não repetir o código de `Funcionario`.
  codigo_inicial: |
    class Funcionario:
        def __init__(self, nome, salario):
            self.nome = nome
            self.salario = salario

        def pagamento(self):
            return self.salario


    class Gerente(Funcionario):
        pass


    print(Funcionario("Ana", 3000).pagamento())
  testes:
    - tipo: python
      nome: Gerente guarda nome, salário e bônus
      codigo: |
        g = Gerente("Bia", 5000, 1500)
        assert (g.nome, g.salario, g.bonus) == ("Bia", 5000, 1500)
      mensagem: O __init__ do Gerente recebe nome, salario e bonus.
    - tipo: python
      nome: Pagamento do gerente inclui o bônus
      codigo: |
        assert Gerente("Bia", 5000, 1500).pagamento() == 6500
        assert Gerente("Caio", 4000, 0).pagamento() == 4000
    - tipo: python
      nome: Funcionário comum continua igual
      codigo: |
        assert Funcionario("Ana", 3000).pagamento() == 3000
    - tipo: estrutura
      nome: Usa super()
      min_chamadas: { super: 2 }
      mensagem: Use super() no __init__ e no pagamento, para reaproveitar o que Funcionario já faz.
  dicas:
    - "No `__init__` do Gerente: `super().__init__(nome, salario)` e depois `self.bonus = bonus`."
    - "No `pagamento`: `return super().pagamento() + self.bonus`."
  solucao: |
    class Funcionario:
        def __init__(self, nome, salario):
            self.nome = nome
            self.salario = salario

        def pagamento(self):
            return self.salario


    class Gerente(Funcionario):
        def __init__(self, nome, salario, bonus):
            super().__init__(nome, salario)
            self.bonus = bonus

        def pagamento(self):
            return super().pagamento() + self.bonus


    print(Funcionario("Ana", 3000).pagamento())
    print(Gerente("Bia", 5000, 1500).pagamento())
  explicacao_solucao: |
    `super()` dá acesso à versão da classe mãe. Assim o `Gerente` **estende** o comportamento em vez de
    copiá-lo: se um dia o cálculo do pagamento de `Funcionario` mudar (um desconto de imposto, por
    exemplo), o gerente acompanha automaticamente.
---
Às vezes a classe filha não quer **substituir** um método, e sim **acrescentar** algo ao que a mãe já
faz. Para chamar a versão da classe mãe, use `super()`:

```python
class Personagem:
    def __init__(self, nome):
        self.nome = nome
        self.vida = 100


class Mago(Personagem):
    def __init__(self, nome, mana):
        super().__init__(nome)   # nome e vida, como todo personagem
        self.mana = mana          # e algo a mais


merlin = Mago("Merlin", 50)
print(merlin.nome, merlin.vida, merlin.mana)
```

```text
Merlin 100 50
```

Se o `Mago` tivesse um `__init__` sem chamar `super().__init__`, o código da mãe nunca rodaria, e
`merlin.vida` daria `AttributeError`.
