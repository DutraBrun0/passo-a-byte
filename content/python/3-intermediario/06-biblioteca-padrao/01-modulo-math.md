---
titulo: O módulo math
xp: 20
exercicio:
  enunciado: |
    Use o módulo `math` para criar duas funções:

    - `hipotenusa(a, b)`: devolve a hipotenusa de um triângulo retângulo com catetos `a` e `b`
      (raiz quadrada de `a² + b²`);
    - `area_circulo(raio)`: devolve a área do círculo (`π × raio²`), arredondada para 2 casas.

    ```python
    hipotenusa(3, 4)     # 5.0
    area_circulo(1)      # 3.14
    ```
  codigo_inicial: |
    def hipotenusa(a, b):
        return (a * a + b * b) / 2


    def area_circulo(raio):
        return 3 * raio * raio


    print(hipotenusa(3, 4), area_circulo(1))
  testes:
    - tipo: funcao
      nome: hipotenusa(3, 4)
      funcao: hipotenusa
      args: [3, 4]
      esperado: 5
    - tipo: funcao
      nome: hipotenusa(5, 12)
      funcao: hipotenusa
      args: [5, 12]
      esperado: 13
    - tipo: funcao
      nome: area_circulo(1)
      funcao: area_circulo
      args: [1]
      esperado: 3.14
    - tipo: funcao
      nome: area_circulo(10)
      funcao: area_circulo
      args: [10]
      esperado: 314.16
  dicas:
    - "Comece com `import math` no topo do programa."
    - "`math.sqrt(x)` calcula a raiz quadrada e `math.pi` é o π com muitas casas."
    - "Na área, arredonde com `round(..., 2)`."
  solucao: |
    import math


    def hipotenusa(a, b):
        return math.sqrt(a * a + b * b)


    def area_circulo(raio):
        return round(math.pi * raio ** 2, 2)


    print(hipotenusa(3, 4), area_circulo(1))
  explicacao_solucao: |
    `import math` carrega o módulo uma vez, e tudo o que ele tem fica disponível com `math.`: a função
    `sqrt` e a constante `pi`, por exemplo.

    Curiosidade: o próprio `math` tem `math.hypot(a, b)`, que calcula a hipotenusa direto. Sempre vale
    a pena dar uma olhada no que a biblioteca padrão já oferece antes de reinventar a roda.
---
O Python vem com uma **biblioteca padrão** enorme: módulos prontos para matemática, datas, sorteios,
textos e muito mais. Para usar um módulo, você o **importa**:

```python
import math

print(math.sqrt(81))     # 9.0
print(math.pi)           # 3.141592653589793
print(math.ceil(4.1))    # 5 (arredonda para cima)
print(math.floor(4.9))   # 4 (arredonda para baixo)
```

Se você vai usar só uma ou duas coisas, dá para importá-las pelo nome:

```python
from math import sqrt, pi

print(sqrt(2) * pi)
```

Algumas funções do `math`:

| Função | Faz |
|--------|-----|
| `sqrt(x)` | raiz quadrada |
| `ceil(x)` / `floor(x)` | arredonda para cima / para baixo |
| `gcd(a, b)` | maior divisor comum |
| `factorial(n)` | fatorial |
| `pi`, `e` | constantes |
