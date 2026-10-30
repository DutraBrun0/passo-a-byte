---
titulo: União, interseção e diferença
xp: 25
exercicio:
  enunciado: |
    Duas turmas de programação estão sendo comparadas. Crie três conjuntos:

    - `ambas`: quem faz **as duas** turmas;
    - `so_python`: quem faz **só** Python;
    - `todos`: **todo mundo**, das duas turmas.

    Use os operadores de conjuntos, não laços.
  codigo_inicial: |
    python = {"ana", "bia", "caio", "duda"}
    javascript = {"caio", "duda", "edu", "fabi"}

    ambas = set()
    so_python = set()
    todos = set()
    print(ambas, so_python, todos)
  testes:
    - tipo: variavel
      nome: ambas tem caio e duda
      variavel: ambas
      esperado: ["caio", "duda"]
    - tipo: variavel
      nome: so_python tem ana e bia
      variavel: so_python
      esperado: ["ana", "bia"]
    - tipo: variavel
      nome: todos tem as 6 pessoas
      variavel: todos
      esperado: ["ana", "bia", "caio", "duda", "edu", "fabi"]
    - tipo: estrutura
      nome: Sem laços
      nao_usa: [For, While]
      mensagem: Os operadores &, - e | resolvem tudo sem nenhum for.
  dicas:
    - "`a & b` é a interseção: o que está nos dois."
    - "`a - b` é a diferença: o que está em `a` mas não em `b`."
    - "`a | b` é a união: tudo junto, sem repetir."
  solucao: |
    python = {"ana", "bia", "caio", "duda"}
    javascript = {"caio", "duda", "edu", "fabi"}

    ambas = python & javascript
    so_python = python - javascript
    todos = python | javascript
    print(ambas, so_python, todos)
  explicacao_solucao: |
    Os operadores de conjuntos são a versão em código dos diagramas de Venn:

    | Operador | Método | Significado |
    |:--------:|--------|-------------|
    | `a & b` | `a.intersection(b)` | nos dois |
    | `a \| b` | `a.union(b)` | em pelo menos um |
    | `a - b` | `a.difference(b)` | só no primeiro |
    | `a ^ b` | `a.symmetric_difference(b)` | em um só dos dois |

    A ordem importa só na diferença: `javascript - python` daria `{'edu', 'fabi'}`.
---
Conjuntos brilham quando você precisa **comparar grupos**. Imagine os ingredientes de duas receitas:

```python
bolo = {"farinha", "ovo", "açúcar", "leite"}
panqueca = {"farinha", "ovo", "leite", "sal"}

print(bolo & panqueca)   # em comum
print(bolo - panqueca)   # só no bolo
print(bolo | panqueca)   # lista de compras das duas
```

```text
{'farinha', 'ovo', 'leite'}
{'açúcar'}
{'farinha', 'ovo', 'açúcar', 'leite', 'sal'}
```

(A ordem em que os itens aparecem pode variar: conjuntos não guardam ordem.)

Resolver isso com listas exigiria laços e vários `if`. Com conjuntos, é uma linha para cada pergunta.
