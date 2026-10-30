---
titulo: Herdando de outra classe
xp: 20
exercicio:
  enunciado: |
    A classe `Animal` já sabe se apresentar, mas não sabe que som fazer. Crie as classes `Cachorro` e
    `Gato`, que **herdam** de `Animal` e substituem só o método `som`:

    ```python
    Cachorro("Rex").apresentar()   # 'Rex diz Au au!'
    Gato("Mia").apresentar()       # 'Mia diz Miau!'
    ```
  codigo_inicial: |
    class Animal:
        def __init__(self, nome):
            self.nome = nome

        def som(self):
            return "..."

        def apresentar(self):
            return f"{self.nome} diz {self.som()}"


    class Cachorro(Animal):
        pass


    class Gato(Animal):
        pass


    print(Cachorro("Rex").apresentar())
    print(Gato("Mia").apresentar())
  testes:
    - tipo: saida
      nome: Rex late e Mia mia
      esperado: |
        Rex diz Au au!
        Mia diz Miau!
    - tipo: python
      nome: Cachorro e Gato são Animais
      codigo: |
        assert issubclass(Cachorro, Animal)
        assert issubclass(Gato, Animal)
      mensagem: Escreva class Cachorro(Animal) para herdar.
    - tipo: python
      nome: Reaproveita apresentar() de Animal
      codigo: |
        assert "apresentar" not in Cachorro.__dict__
        assert "apresentar" not in Gato.__dict__
      mensagem: Só o método som precisa mudar. apresentar() vem pronto de Animal.
  dicas:
    - "Dentro de `Cachorro`, troque o `pass` por um `def som(self):` que devolve `\"Au au!\"`."
    - "Não reescreva `apresentar`: ele chama `self.som()`, que vai encontrar a versão nova."
  solucao: |
    class Animal:
        def __init__(self, nome):
            self.nome = nome

        def som(self):
            return "..."

        def apresentar(self):
            return f"{self.nome} diz {self.som()}"


    class Cachorro(Animal):
        def som(self):
            return "Au au!"


    class Gato(Animal):
        def som(self):
            return "Miau!"


    print(Cachorro("Rex").apresentar())
    print(Gato("Mia").apresentar())
  explicacao_solucao: |
    Quando `apresentar` (que só existe em `Animal`) chama `self.som()`, o Python procura `som` primeiro
    na classe do objeto. Para um `Cachorro`, encontra a versão de `Cachorro`; para um `Animal` comum,
    usaria a original.

    Isso se chama **sobrescrever** um método: a classe filha muda só o que é diferente e herda o resto.
---
**Herança** é criar uma classe nova a partir de outra que já existe. A classe filha recebe todos os
atributos e métodos da classe mãe e pode **acrescentar** ou **substituir** o que quiser:

```python
class Veiculo:
    def __init__(self, marca):
        self.marca = marca

    def descrever(self):
        return f"Veículo da {self.marca}"


class Moto(Veiculo):
    def empinar(self):
        return "Empinando!"


m = Moto("Honda")
print(m.descrever())   # herdado de Veiculo
print(m.empinar())     # só a Moto tem
```

```text
Veículo da Honda
Empinando!
```

A classe mãe vai entre parênteses: `class Moto(Veiculo)`. Dizemos que uma moto **é um** veículo.
Use herança quando essa frase fizer sentido.
