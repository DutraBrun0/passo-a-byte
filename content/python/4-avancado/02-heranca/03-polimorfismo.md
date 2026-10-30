---
titulo: "Desafio: polimorfismo"
xp: 30
exercicio:
  enunciado: |
    Crie as classes `Retangulo(largura, altura)` e `Circulo(raio)`, filhas de `Forma`, cada uma com
    seu próprio método `area()`. Depois complete a função `area_total(formas)`, que soma a área de
    uma lista com formas de qualquer tipo:

    ```python
    area_total([Retangulo(2, 3), Circulo(1)])   # 9.14159...
    ```
  codigo_inicial: |
    import math


    class Forma:
        def area(self):
            raise NotImplementedError("cada forma calcula a sua área")


    # crie Retangulo e Circulo aqui


    def area_total(formas):
        return 0
  testes:
    - tipo: python
      nome: Área do retângulo
      codigo: |
        assert Retangulo(2, 3).area() == 6
        assert Retangulo(5, 5).area() == 25
    - tipo: python
      nome: Área do círculo
      codigo: |
        assert abs(Circulo(1).area() - math.pi) < 1e-9
        assert abs(Circulo(2).area() - 4 * math.pi) < 1e-9
    - tipo: python
      nome: As duas são Formas
      codigo: |
        assert isinstance(Retangulo(1, 1), Forma)
        assert isinstance(Circulo(1), Forma)
    - tipo: python
      nome: area_total soma formas misturadas
      codigo: |
        assert abs(area_total([Retangulo(2, 3), Circulo(1)]) - (6 + math.pi)) < 1e-9
        assert area_total([]) == 0
      mensagem: area_total só precisa chamar .area() de cada forma, sem perguntar o tipo.
    - tipo: estrutura
      nome: area_total não pergunta o tipo da forma
      max_chamadas: { isinstance: 0, type: 0 }
      mensagem: Deixe cada forma responder por si. Nada de if isinstance(...) dentro de area_total.
  dicas:
    - "`class Retangulo(Forma):` com um `__init__(self, largura, altura)` e um `area` que devolve `largura * altura`."
    - "A área do círculo é `math.pi * raio ** 2`."
    - "`area_total` pode ser `sum(forma.area() for forma in formas)`."
  solucao: |
    import math


    class Forma:
        def area(self):
            raise NotImplementedError("cada forma calcula a sua área")


    class Retangulo(Forma):
        def __init__(self, largura, altura):
            self.largura = largura
            self.altura = altura

        def area(self):
            return self.largura * self.altura


    class Circulo(Forma):
        def __init__(self, raio):
            self.raio = raio

        def area(self):
            return math.pi * self.raio ** 2


    def area_total(formas):
        return sum(forma.area() for forma in formas)
  explicacao_solucao: |
    `area_total` não sabe (e não quer saber) se recebeu retângulos, círculos ou formas que ainda nem
    existem. Ela só confia que todo objeto da lista sabe responder a `.area()`.

    Esse é o poder do **polimorfismo**: amanhã você cria um `Triangulo` com seu próprio `area()`, e
    `area_total` funciona com ele sem mudar uma linha.
---
**Polimorfismo** ("muitas formas") é quando objetos de classes diferentes respondem à **mesma**
chamada, cada um do seu jeito. Quem chama não precisa saber com qual tipo está falando:

```python
class Pato:
    def falar(self):
        return "Quack"


class Robo:
    def falar(self):
        return "Bip bop"


for coisa in [Pato(), Robo()]:
    print(coisa.falar())
```

```text
Quack
Bip bop
```

O contrário disso seria uma cadeia de `if`:

```python
if type(coisa) == Pato:
    ...
elif type(coisa) == Robo:
    ...
```

Toda vez que surgisse um tipo novo, alguém teria que lembrar de acrescentar mais um `elif`. Com
polimorfismo, cada classe cuida de si.
