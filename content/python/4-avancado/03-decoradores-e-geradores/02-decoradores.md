---
titulo: Decoradores
xp: 25
exercicio:
  enunciado: |
    Crie o decorador `em_maiusculas`, que faz qualquer função que devolve texto devolver esse texto em
    **maiúsculas**. Depois aplique-o à função `saudar` com `@`:

    ```python
    saudar("ana")   # 'OLÁ, ANA!'
    ```

    O decorador precisa funcionar com funções que recebem qualquer quantidade de argumentos.
  codigo_inicial: |
    def em_maiusculas(funcao):
        return funcao


    def saudar(nome):
        return f"Olá, {nome}!"


    print(saudar("ana"))
  testes:
    - tipo: saida
      nome: saudar devolve em maiúsculas
      esperado: OLÁ, ANA!
    - tipo: python
      nome: Funciona com outras funções
      codigo: |
        @em_maiusculas
        def juntar(a, b, separador=" "):
            return a + separador + b

        assert juntar("bom", "dia") == "BOM DIA"
        assert juntar("a", "b", separador="-") == "A-B"
      mensagem: "A função interna deve aceitar *args e **kwargs e repassá-los: funcao(*args, **kwargs)."
    - tipo: python
      nome: saudar foi decorada com @em_maiusculas
      codigo: |
        assert saudar("bia") == "OLÁ, BIA!"
      mensagem: Escreva @em_maiusculas na linha de cima do def saudar.
  dicas:
    - "Dentro de `em_maiusculas`, crie `def embrulho(*args, **kwargs):` e devolva `embrulho`."
    - "O `embrulho` chama a função original, `funcao(*args, **kwargs)`, e devolve o resultado com `.upper()`."
    - "Para aplicar: escreva `@em_maiusculas` logo acima de `def saudar`."
  solucao: |
    def em_maiusculas(funcao):
        def embrulho(*args, **kwargs):
            return funcao(*args, **kwargs).upper()
        return embrulho


    @em_maiusculas
    def saudar(nome):
        return f"Olá, {nome}!"


    print(saudar("ana"))
  explicacao_solucao: |
    `@em_maiusculas` em cima do `def` é só um atalho para `saudar = em_maiusculas(saudar)`. O nome
    `saudar` passa a apontar para o `embrulho`, que chama a função original e transforma o resultado.

    O `*args, **kwargs` torna o decorador genérico: tudo o que for passado para o embrulho é repassado
    igualzinho para a função original, seja um argumento ou dez, posicionais ou nomeados.
---
Um **decorador** é uma função que recebe uma função e devolve uma versão "embrulhada" dela, com algum
comportamento a mais. Por exemplo, avisar toda vez que a função for chamada:

```python
def anunciar(funcao):
    def embrulho(*args, **kwargs):
        print("Chamando", funcao.__name__)
        return funcao(*args, **kwargs)
    return embrulho


@anunciar
def somar(a, b):
    return a + b


print(somar(2, 3))
```

```text
Chamando somar
5
```

A linha `@anunciar` é o mesmo que escrever `somar = anunciar(somar)` logo depois do `def`.

Decoradores aparecem muito em código Python de verdade: para medir tempo, guardar resultados em cache
(`@functools.cache`), controlar acesso em sites e registrar rotas em frameworks web.
