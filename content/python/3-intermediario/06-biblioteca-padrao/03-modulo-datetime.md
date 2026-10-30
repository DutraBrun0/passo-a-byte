---
titulo: Datas com datetime
xp: 25
exercicio:
  enunciado: |
    Crie a função `dias_entre(inicio, fim)` que recebe duas datas como texto no formato `AAAA-MM-DD` e
    devolve quantos dias se passam de uma para a outra:

    ```python
    dias_entre("2024-01-01", "2024-12-25")   # 359
    dias_entre("2024-02-27", "2024-03-01")   # 3 (2024 é bissexto)
    ```
  codigo_inicial: |
    def dias_entre(inicio, fim):
        dia_inicio = int(inicio[-2:])
        dia_fim = int(fim[-2:])
        return dia_fim - dia_inicio


    print(dias_entre("2024-01-01", "2024-12-25"))
  testes:
    - tipo: funcao
      nome: Do Ano-Novo ao Natal de 2024
      funcao: dias_entre
      args: ["2024-01-01", "2024-12-25"]
      esperado: 359
    - tipo: funcao
      nome: Atravessa fevereiro de ano bissexto
      funcao: dias_entre
      args: ["2024-02-27", "2024-03-01"]
      esperado: 3
    - tipo: funcao
      nome: Atravessa fevereiro de ano comum
      funcao: dias_entre
      args: ["2025-02-27", "2025-03-01"]
      esperado: 2
    - tipo: funcao
      nome: Mesmo dia dá zero
      funcao: dias_entre
      args: ["2025-06-10", "2025-06-10"]
      esperado: 0
  dicas:
    - "`from datetime import date` e depois `date.fromisoformat(\"2024-01-01\")` transforma o texto numa data."
    - "Subtrair duas datas dá um `timedelta`. O número de dias está em `.days`."
  solucao: |
    from datetime import date


    def dias_entre(inicio, fim):
        diferenca = date.fromisoformat(fim) - date.fromisoformat(inicio)
        return diferenca.days


    print(dias_entre("2024-01-01", "2024-12-25"))
  explicacao_solucao: |
    Contar dias à mão exige saber quantos dias tem cada mês e quais anos são bissextos (lembra do desafio
    do nível Iniciante?). O módulo `datetime` já sabe tudo isso. `date.fromisoformat` lê o texto, a
    subtração de datas devolve um intervalo (`timedelta`) e `.days` dá o número inteiro de dias.
---
O módulo `datetime` trabalha com datas e horas sem que você precise lembrar quantos dias tem cada mês.

```python
from datetime import date, timedelta

natal = date(2025, 12, 25)
print(natal.year, natal.month, natal.day)
print(natal.weekday())               # 0 = segunda ... 6 = domingo

daqui_a_100 = natal + timedelta(days=100)
print(daqui_a_100)
```

```text
2025 12 25
3
2026-04-04
```

Algumas operações úteis:

| Código | Resultado |
|--------|-----------|
| `date.fromisoformat("2025-03-14")` | texto → data |
| `data.isoformat()` | data → texto `"2025-03-14"` |
| `data.strftime("%d/%m/%Y")` | data → texto `"14/03/2025"` |
| `data2 - data1` | um `timedelta`, com o atributo `.days` |
| `data + timedelta(days=7)` | uma semana depois |
