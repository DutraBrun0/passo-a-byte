---
titulo: Métodos especiais
xp: 25
exercicio:
  enunciado: |
    Complete a classe `Playlist` para que ela funcione com as ferramentas do Python:

    - `len(playlist)` devolve quantas músicas ela tem (método `__len__`);
    - `str(playlist)` e `print(playlist)` mostram `Playlist Treino (3 músicas)` (método `__str__`).

    ```python
    p = Playlist("Treino")
    p.adicionar("Eye of the Tiger")
    print(len(p))   # 1
    print(p)        # Playlist Treino (1 músicas)
    ```
  codigo_inicial: |
    class Playlist:
        def __init__(self, nome):
            self.nome = nome
            self.musicas = []

        def adicionar(self, musica):
            self.musicas.append(musica)


    p = Playlist("Treino")
    p.adicionar("Eye of the Tiger")
    p.adicionar("Lose Yourself")
    p.adicionar("Stronger")
    print(p)
  testes:
    - tipo: saida
      nome: print mostra o nome e a quantidade
      esperado: Playlist Treino (3 músicas)
    - tipo: python
      nome: len() conta as músicas
      codigo: |
        nova = Playlist("Foco")
        assert len(nova) == 0
        nova.adicionar("Clair de Lune")
        nova.adicionar("Gymnopédie")
        assert len(nova) == 2
      mensagem: "Crie def __len__(self): que devolve len(self.musicas)."
    - tipo: python
      nome: str() usa o nome da playlist
      codigo: |
        nova = Playlist("Estudo")
        nova.adicionar("Lo-fi")
        assert str(nova) == "Playlist Estudo (1 músicas)"
  dicas:
    - "`__str__` precisa **devolver** (com `return`) o texto, não mostrá-lo."
    - "Dentro de `__str__`, você pode usar `len(self)`, que chama o seu `__len__`."
  solucao: |
    class Playlist:
        def __init__(self, nome):
            self.nome = nome
            self.musicas = []

        def adicionar(self, musica):
            self.musicas.append(musica)

        def __len__(self):
            return len(self.musicas)

        def __str__(self):
            return f"Playlist {self.nome} ({len(self)} músicas)"


    p = Playlist("Treino")
    p.adicionar("Eye of the Tiger")
    p.adicionar("Lose Yourself")
    p.adicionar("Stronger")
    print(p)
  explicacao_solucao: |
    O Python transforma operações comuns em chamadas de métodos especiais: `len(p)` vira `p.__len__()`
    e `print(p)` usa `p.__str__()`. Implementando esses métodos, sua classe passa a se comportar como os
    tipos que já vêm com a linguagem.

    Sem o `__str__`, o `print` mostraria algo como `<__main__.Playlist object at 0x10a2...>`, que não
    ajuda ninguém.
---
Métodos com dois sublinhados dos dois lados (os **dunder methods**, de *double underscore*) são
chamados pelo próprio Python em situações especiais. O `__init__` é um deles. Outros comuns:

| Você escreve | O Python chama |
|--------------|----------------|
| `print(obj)`, `str(obj)` | `obj.__str__()` |
| `len(obj)` | `obj.__len__()` |
| `a == b` | `a.__eq__(b)` |
| `a + b` | `a.__add__(b)` |
| `x in obj` | `obj.__contains__(x)` |

```python
class Ponto:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, outro):
        return Ponto(self.x + outro.x, self.y + outro.y)

    def __str__(self):
        return f"({self.x}, {self.y})"


print(Ponto(1, 2) + Ponto(10, 20))
```

```text
(11, 22)
```
