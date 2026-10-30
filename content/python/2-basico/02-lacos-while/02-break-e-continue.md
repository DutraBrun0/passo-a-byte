---
titulo: break e continue
xp: 20
exercicio:
  enunciado: |
    Leia números, um por `input()`, até a pessoa digitar `fim`. Some só os números **positivos**
    (ignore os negativos) e no final mostre o total. Para as entradas `10`, `-4`, `2`, `fim`:

    ```text
    Total: 12
    ```
  codigo_inicial: |
    total = 0
    while True:
        texto = input("Número (ou fim): ")
        # pare quando digitarem fim
        # ignore os números negativos
        total += int(texto)
    print("Total:", total)
  entrada: ["10", "-4", "2", "fim"]
  testes:
    - tipo: saida
      nome: 10, -4, 2, fim
      entrada: ["10", "-4", "2", "fim"]
      esperado: "Total: 12"
    - tipo: saida
      nome: 5, 3, fim
      entrada: ["5", "3", "fim"]
      esperado: "Total: 8"
    - tipo: saida
      nome: Só negativos
      entrada: ["-1", "-7", "fim"]
      esperado: "Total: 0"
    - tipo: saida
      nome: fim logo de cara
      entrada: ["fim"]
      esperado: "Total: 0"
    - tipo: estrutura
      nome: Usa break e continue
      usa: [While, Break, Continue]
      mensagem: Use break para sair ao ler "fim" e continue para pular os negativos.
  dicas:
    - "Compare o texto lido com `\"fim\"` **antes** de converter para `int`."
    - "`if texto == \"fim\": break` encerra o laço na hora."
    - "Para o negativo, `continue` volta para o começo do laço sem somar."
  solucao: |
    total = 0
    while True:
        texto = input("Número (ou fim): ")
        if texto == "fim":
            break
        numero = int(texto)
        if numero < 0:
            continue
        total += numero
    print("Total:", total)
  explicacao_solucao: |
    `while True` repete "para sempre", e quem decide a saída é o `break`. É um padrão comum para ler
    dados até aparecer um valor especial.

    - `break` sai do laço imediatamente e o programa segue para o `print`.
    - `continue` pula o resto **desta** volta e já começa a próxima, então o `total += numero` não roda.

    A ordem importa: se você convertesse `int(texto)` antes de testar `"fim"`, o Python daria erro ao
    tentar transformar `"fim"` em número.
---
Duas palavras mudam o caminho de um laço:

- **`break`**: sai do laço na hora.
- **`continue`**: pula para a próxima volta.

```python
for numero in range(1, 10):
    if numero == 7:
        break        # chega no 7 e para tudo
    if numero % 2 == 0:
        continue     # pares não são mostrados
    print(numero)
```

```text
1
3
5
```

Com `break`, é comum escrever `while True:` e decidir a saída lá dentro. Fica fácil de ler quando a
condição de parada só é conhecida no meio do laço, como depois de um `input()`.
