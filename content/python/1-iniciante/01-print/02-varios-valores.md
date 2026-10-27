---
titulo: Vários valores no mesmo print
xp: 10
exercicio:
  enunciado: |
    Use **um único** `print` com três valores separados por vírgula para mostrar:

    ```text
    Bit tem 3 rodas
    ```

    O número `3` deve ser escrito como número, sem aspas.
  codigo_inicial: |
    print()
  testes:
    - tipo: saida
      nome: Mostra "Bit tem 3 rodas"
      esperado: Bit tem 3 rodas
    - tipo: estrutura
      nome: Usa um único print
      max_chamadas: { print: 1 }
      mensagem: Junte tudo em um só print, separando os valores com vírgulas.
  dicas:
    - Dentro dos parênteses do `print`, separe os valores com vírgulas.
    - O `print` coloca um espaço entre cada valor automaticamente.
    - "Algo como `print(\"Bit tem\", 3, \"rodas\")`."
  solucao: |
    print("Bit tem", 3, "rodas")
  explicacao_solucao: |
    Quando o `print` recebe vários valores separados por vírgula, ele mostra todos na mesma linha
    com **um espaço entre eles**. Por isso não é preciso colocar espaços dentro das aspas.
---
O `print` aceita vários valores de uma vez. Basta separá-los com **vírgulas**:

```python
print("Nível", 1, "concluído")
```

```text
Nível 1 concluído
```

O Python coloca um espaço entre cada valor. Números podem ir sem aspas: `1` é um número, `"1"` é um texto.

## Uma linha por print

Cada `print` termina pulando para a linha de baixo:

```python
print("primeira linha")
print("segunda linha")
```

```text
primeira linha
segunda linha
```

E um `print()` vazio mostra uma linha em branco.
