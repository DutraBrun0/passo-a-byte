---
titulo: Conjuntos
xp: 20
exercicio:
  enunciado: |
    A lista `acessos` registra quem entrou no site, com repetições. Crie o conjunto `unicos` com cada
    visitante uma vez só e mostre:

    ```text
    Acessos: 9
    Visitantes únicos: 4
    ```
  codigo_inicial: |
    acessos = ["ana", "bia", "ana", "caio", "bia", "ana", "duda", "caio", "ana"]
    unicos = acessos

    print("Acessos:", len(acessos))
    print("Visitantes únicos:", len(unicos))
  testes:
    - tipo: variavel
      nome: unicos tem os 4 visitantes
      variavel: unicos
      esperado: ["ana", "bia", "caio", "duda"]
    - tipo: python
      nome: unicos é um conjunto
      codigo: |
        assert type(unicos) is set
      mensagem: Use set(acessos) para criar o conjunto.
    - tipo: saida
      nome: Mostra acessos e visitantes únicos
      esperado: |
        Acessos: 9
        Visitantes únicos: 4
  dicas:
    - "`set(lista)` cria um conjunto com os itens da lista, sem repetições."
  solucao: |
    acessos = ["ana", "bia", "ana", "caio", "bia", "ana", "duda", "caio", "ana"]
    unicos = set(acessos)

    print("Acessos:", len(acessos))
    print("Visitantes únicos:", len(unicos))
  explicacao_solucao: |
    Um conjunto simplesmente ignora o que já tem. Ao converter a lista com `set()`, cada nome entra
    uma vez só, então `len(unicos)` conta pessoas, não acessos.

    Repare que um conjunto **não tem ordem**: `print(unicos)` pode mostrar os nomes em qualquer ordem.
---
Um **conjunto** (`set`) guarda valores **sem repetição** e **sem ordem**. Ele é criado com chaves, como
um dicionário, mas sem os pares `chave: valor`:

```python
cores = {"azul", "verde", "azul", "rosa"}
print(len(cores))
```

```text
3
```

Para criar um conjunto vazio, use `set()`: `{}` sozinho é um dicionário vazio.

```python
vistos = set()
vistos.add("filme A")
vistos.add("filme B")
vistos.add("filme A")      # já estava: nada muda
print("filme B" in vistos)  # True
```

Verificar se algo está num conjunto com `in` é muito rápido, mesmo com milhões de itens. Já numa lista,
o Python precisa olhar item por item.
