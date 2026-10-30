---
titulo: Sua primeira classe
xp: 20
exercicio:
  enunciado: |
    Crie a classe `Livro`, cujo `__init__` recebe `titulo`, `autor` e `paginas` e guarda cada um
    num atributo com o mesmo nome. Depois crie o objeto `livro` e mostre:

    ```text
    Dom Casmurro, de Machado de Assis (256 páginas)
    ```
  codigo_inicial: |
    class Livro:
        pass


    livro = Livro()
    print(livro)
  testes:
    - tipo: python
      nome: livro guarda título, autor e páginas
      codigo: |
        assert livro.titulo == "Dom Casmurro"
        assert livro.autor == "Machado de Assis"
        assert livro.paginas == 256
      mensagem: Crie o objeto com Livro("Dom Casmurro", "Machado de Assis", 256).
    - tipo: python
      nome: Funciona para qualquer livro
      codigo: |
        outro = Livro("O Hobbit", "Tolkien", 310)
        assert (outro.titulo, outro.autor, outro.paginas) == ("O Hobbit", "Tolkien", 310)
        assert livro.titulo == "Dom Casmurro"
      mensagem: Cada objeto precisa guardar os próprios dados em self.
    - tipo: saida
      nome: Mostra a ficha do livro
      esperado: Dom Casmurro, de Machado de Assis (256 páginas)
  dicas:
    - "O `__init__` recebe `self` primeiro: `def __init__(self, titulo, autor, paginas):`."
    - "Dentro dele, guarde cada valor em `self`: `self.titulo = titulo`."
    - "Para mostrar, acesse os atributos do objeto: `livro.titulo`, `livro.autor`..."
  solucao: |
    class Livro:
        def __init__(self, titulo, autor, paginas):
            self.titulo = titulo
            self.autor = autor
            self.paginas = paginas


    livro = Livro("Dom Casmurro", "Machado de Assis", 256)
    print(f"{livro.titulo}, de {livro.autor} ({livro.paginas} páginas)")
  explicacao_solucao: |
    Quando você escreve `Livro("Dom Casmurro", ...)`, o Python cria um objeto novo e chama o `__init__`
    passando o próprio objeto como `self`. Cada `self.algo = valor` cria um atributo **daquele** objeto.

    Por isso `livro` e `outro` não se misturam: cada um tem o seu `self`, com os seus dados.
---
Até aqui, para representar um livro você usaria um dicionário. Uma **classe** vai além: ela é um
**molde** que define como são os objetos de um tipo, e cada objeto criado a partir dela é uma
**instância**.

```python
class Cachorro:
    def __init__(self, nome, raca):
        self.nome = nome
        self.raca = raca


rex = Cachorro("Rex", "vira-lata")
bolt = Cachorro("Bolt", "pastor")
print(rex.nome, "e", bolt.nome)
```

```text
Rex e Bolt
```

- `class Cachorro:` cria a classe (por convenção, com inicial maiúscula);
- `__init__` é o método que **inicializa** cada objeto novo;
- `self` é o próprio objeto sendo criado;
- `self.nome = nome` guarda o valor recebido como **atributo** do objeto.

Você já usa objetos o tempo todo: textos, listas e dicionários são instâncias das classes `str`,
`list` e `dict`.
