# Passo a Byte

Trilha interativa para aprender Python **no navegador**: lições curtas, editor de código, execução de
Python de verdade (CPython 3.14 via Pyodide, num Web Worker) e correção automática com mensagens de erro
em português. Inclui os **Desafios do Robô**, em que você programa o Bit para atravessar labirintos e
acompanha cada linha do código sendo executada, passo a passo.

Sem back-end, sem banco de dados, sem cadastro: tudo roda no navegador e o progresso fica no `localStorage`
(com exportação e importação em JSON).

![Demonstração: uma lição corrigida na hora e o Bit resolvendo a fase Espiral](docs/demo.gif)

> **Status do conteúdo:** por enquanto, **só o Nível 1 (Iniciante) está completo**, com 6 módulos e 22 lições.
> Os Níveis 2 (Básico), 3 (Intermediário) e 4 (Avançado) existem apenas como **estrutura**: os níveis e os
> módulos já aparecem na trilha, marcados como "Em breve" e "Em construção", mas ainda não têm lições.
> Eles serão escritos numa próxima etapa, sem precisar mudar código (ver [Como adicionar uma lição](#como-adicionar-uma-lição)).

**Link online:** ainda não publicado. O projeto está pronto para a Vercel (`vercel.json` incluso).

---

## Sumário

- [O que tem no site](#o-que-tem-no-site)
- [Como rodar](#como-rodar)
- [Como adicionar uma lição](#como-adicionar-uma-lição)
- [Arquitetura](#arquitetura)
- [Pyodide ou Skulpt?](#pyodide-ou-skulpt)
- [Testes](#testes)
- [Design system](#design-system)
- [Roadmap](#roadmap)

## O que tem no site

- **Página inicial** com apresentação e seleção de nível.
- **Trilha** com módulos e lições em sequência: bloqueada, disponível, em andamento e concluída.
- **Lição** em duas colunas: explicação com exemplos à esquerda; editor (CodeMirror 6), saída e testes à direita.
  - Execução com `Ctrl+Enter`, saída do programa, erro traduzido para português com a linha marcada no editor,
    e cada teste com "esperado" e "seu código produziu".
  - Dicas reveladas uma por vez; solução comentada liberada depois de 3 tentativas (ver antes de acertar dá metade do XP).
  - `input()` simulado: cada teste fornece a "digitação" do usuário.
- **Desafios do Robô**: 8 fases (de linha reta a um labirinto com a regra da mão direita), com Executar, Pausar,
  Passo a passo, Reiniciar, controle de velocidade, destaque da linha atual e **limite de linhas** nas fases que pedem laços.
- **Progresso**: XP, sequência de dias, 10 conquistas em pixel art e backup em arquivo JSON.
- **Tela de carregamento do Python** em pixel art, com o progresso real do download (~12 MB na primeira visita;
  depois vem do cache).
- Responsivo para desktop e tablet; foco visível, navegação por teclado, `prefers-reduced-motion` e regiões `aria-live`.

## Como rodar

Requisitos: **Node.js 20 ou mais recente** (o projeto foi desenvolvido no Node 24 LTS).

```bash
npm install
npm run dev          # http://localhost:5173
```

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | servidor de desenvolvimento (copia o Pyodide para `public/pyodide/` antes) |
| `npm test` | testes unitários e de conteúdo (Vitest, inclusive com o Pyodide real em Node) |
| `npm run test:e2e` | testes no navegador com Playwright (rode `npx playwright install chromium` uma vez) |
| `npm run lint` | ESLint |
| `npm run build` | build de produção em `dist/` |
| `npm run check` | lint + testes + build (o mesmo que a CI roda antes de cada merge) |
| `npm run demo:gif` | grava `docs/demo.gif` com o Playwright |

## Como adicionar uma lição

O conteúdo fica em `content/<linguagem>/` e **a estrutura de pastas é o índice**: o prefixo numérico define
a ordem e o resto do nome vira o id (que aparece na URL).

```text
content/python/
├── 1-iniciante/
│   ├── nivel.json                  ← título, descrição e ícone do nível
│   └── 01-print/
│       ├── modulo.json             ← título e descrição do módulo
│       ├── 01-ola-mundo.md         ← uma lição
│       └── 02-varios-valores.md
├── 2-basico/ ...                   ← só nivel.json e modulo.json, por enquanto
└── robo/
    └── 01-primeiros-passos.md      ← uma fase dos Desafios do Robô
```

Para criar uma lição, crie um `.md` na pasta do módulo. Os metadados e o exercício ficam num cabeçalho YAML;
o texto da lição vem depois, em Markdown:

````markdown
---
titulo: Divisão inteira e resto
xp: 15
exercicio:
  enunciado: |
    Com `minutos = 125`, mostre `2 horas e 5 minutos`.
  codigo_inicial: |
    minutos = 125
  testes:
    - tipo: saida
      nome: Mostra "2 horas e 5 minutos"
      esperado: 2 horas e 5 minutos
    - tipo: variavel
      nome: horas vale 2
      variavel: horas
      esperado: 2
  dicas:
    - "Para descartar a parte decimal, use `//`."
  solucao: |
    minutos = 125
    horas = minutos // 60
    resto = minutos % 60
    print(horas, "horas e", resto, "minutos")
  explicacao_solucao: |
    `//` dá a divisão inteira e `%` dá o resto.
---
Texto da lição em Markdown, com exemplos:

```python
print(17 // 5)
```
````

Tipos de teste disponíveis em Python:

| `tipo` | O que verifica | Campos |
|--------|----------------|--------|
| `saida` | o que o programa imprimiu (ignora espaços no fim das linhas e os prompts do `input`) | `esperado`, `entrada` (opcional) |
| `variavel` | o valor ou o tipo de uma variável depois de rodar | `variavel`, `esperado` ou `tipo_esperado` |
| `funcao` | o retorno de uma função do aluno | `funcao`, `args`, `esperado` |
| `python` | um `assert` livre, rodado no namespace do aluno | `codigo` |
| `estrutura` | o código sem executar (AST): construções exigidas ou proibidas e quantas vezes cada função é chamada | `usa`, `nao_usa`, `max_chamadas`, `min_chamadas` |

Todo teste tem `nome` (aparece para o aluno) e pode ter `mensagem` (dica mostrada quando ele falha).

Ao rodar `npm test`, cada lição é validada automaticamente: formato do arquivo, **a solução de referência
precisa passar em todos os testes** e **o código inicial precisa falhar** (para pegar exercício trivial por engano).
Tudo isso roda no mesmo Pyodide que o navegador usa.

## Arquitetura

```text
src/
├── nucleo/                 ← não sabe nada de Python
│   ├── linguagens/         contrato do adaptador + registro
│   ├── execucao/           SupervisorWorker (fila, timeout, terminate), estado de carga
│   ├── conteudo/           monta o curso a partir de content/
│   ├── progresso/          regras puras de XP, sequência, conquistas; store Zustand; import/export
│   └── robo/               simulador do labirinto (JS puro) e reprodutor do trace
├── linguagens/
│   ├── catalogo.js         linguagem padrão e linguagens "em breve"
│   ├── index.js            registra os adaptadores (carregado sob demanda)
│   └── python/             ← tudo que é específico de Python
│       ├── index.js        o adaptador
│       ├── python.worker.js
│       ├── runtime/executor.py   executa, limita, testa (roda dentro do Pyodide)
│       ├── erros.js        tradução dos erros para português
│       └── limites.js
├── design-system/          tokens, componentes base e sprites
├── editor/                 CodeMirror, tema, destaque estático, Markdown
└── paginas/                início, trilha, lição, robô, progresso
```

### Adaptador de linguagem

As páginas, a trilha, o editor e o progresso só conversam com esta interface
([`src/nucleo/linguagens/contrato.js`](src/nucleo/linguagens/contrato.js)), validada no registro:

```js
{
  id: 'python',                       // rota /python/... e pasta content/python/
  nome: 'Python',
  extensao: '.py',
  editor: { suporte, indentacao },    // LanguageSupport do CodeMirror (também usado no destaque estático)
  limites: { passos, segundos, saida },
  tiposDeTeste: ['saida', 'funcao', ...],
  preparar(),                         // carrega o interpretador
  estadoCarga(), assinarCarga(fn),    // para a tela de carregamento
  executar(codigo, { entrada, testes }) → { console, erro, testes, passou, metricas },
  robo: {                             // capacidade opcional
    funcoes, contarLinhas(codigo),
    executar(codigo, fase) → { trace, sucesso, motivo, console, erro },
  },
}
```

O erro já chega traduzido (`{ titulo, explicacao, original, linha }`), então a interface nunca interpreta
mensagens de uma linguagem específica.

### Execução segura

1. **Sempre num Web Worker.** O código do aluno nunca roda na thread principal, e a página não trava.
2. **Limite de passos e de tempo** com `sys.settrace`: só as linhas do código do aluno contam. A exceção de limite
   herda de `BaseException`, então um `except Exception` do aluno não a engole.
3. **Cão de guarda:** uma única chamada longa em C (por exemplo `sum(range(10**13))`) não passa pelo trace. Se o Worker
   não responder em 10 s, o `SupervisorWorker` faz `terminate()` e cria outro no pedido seguinte. Há teste e2e para isso.
4. **Sem rede:** depois de carregar o Pyodide, o Worker substitui `fetch`, `XMLHttpRequest`, `WebSocket`,
   `EventSource` e `importScripts` por funções que falham. O Pyodide é servido do próprio domínio, sem CDN.
5. **Ambiente restrito:** `import` só de uma lista da biblioteca padrão (`math`, `random`, `collections`...). `js`, `pyodide`,
   `os`, `sys`, `socket` e `subprocess` são bloqueados, e `open`, `eval`, `exec` e `compile` são removidos.

Sendo honesto sobre o modelo de ameaça: a fronteira de segurança real é o Worker sem DOM e sem rede. A restrição de
imports em Python é um guarda-corpo pedagógico, porque sandboxes de Python puro sempre têm escapes conhecidos. Como o
código roda no navegador do próprio aluno, o objetivo é proteger a página e a experiência, não um servidor.

### Modelo de trace (Desafios do Robô)

```text
Thread principal                         Web Worker
────────────────                         ──────────
robo.executar(codigo, fase) ───────────▶ simulador = criarSimulador(fase)   (JS, src/nucleo/robo)
                                         Python roda o código do aluno;
                                         andar() → simulador.andar(linhaAtual)
                                         (linha vinda do sys.settrace)
◀──────────────────────────────────────  trace = [{ tipo, acao, linha, resultado, estado }, ...]
useReprodutor(trace): índice + timer
Canvas desenha trace[i].estado
Editor destaca trace[i].linha
```

- O Worker **não anima nada**: ele executa tudo de uma vez e devolve o trace. Cada passo carrega o estado completo do
  robô, então pausar, avançar um passo e reiniciar são só mudanças de índice.
- O simulador é **JavaScript puro e independente de linguagem**. Uma linguagem nova só precisa expor funções com os
  nomes dela que chamem o mesmo simulador.
- Bater na parede gera um evento de erro no trace e encerra o programa (`ErroDoRobo`, também `BaseException`).
- O canvas desenha na resolução nativa dos sprites e amplia por CSS com **fator inteiro**, para os pixels ficarem quadrados.

### Outras decisões

- **YAML lido no build** por um plugin do Vite ([`scripts/vite-plugin-conteudo.js`](scripts/vite-plugin-conteudo.js)):
  o navegador recebe JSON, e o parser não entra no bundle.
- **Progresso com funções puras** (`estado → estado`) e a store do Zustand só para persistir. A sequência de dias usa a
  data **local** do aluno. A importação de JSON valida campo a campo.
- **Code splitting:** editor, CodeMirror e adaptadores só carregam nas páginas que os usam (bundle inicial ≈ 272 kB).
- **Cache do Pyodide:** caminho com a versão (`/pyodide/314.0.7/`) mais `Cache-Control: immutable` mais um service worker
  cache-first. A barra de progresso mede os bytes reais do download (o Worker envolve o `fetch` durante a carga).

## Pyodide ou Skulpt?

| | Pyodide (escolhido) | Skulpt |
|---|---|---|
| O que é | CPython compilado para WebAssembly | reimplementação de Python em JavaScript |
| Download | ~12 MB na primeira visita (depois, cache) | ~1 MB |
| Fidelidade | Python 3.14 real: mesmas mensagens de erro, mesma semântica, biblioteca padrão | subconjunto do Python 3, com diferenças de comportamento e de mensagens |
| `sys.settrace` | sim (limite de passos e linha atual do robô) | não (exigiria mecanismos próprios) |
| Testável fora do navegador | sim, o mesmo pacote roda no Node (Vitest) | parcialmente |

A escolha foi o **Pyodide**. Para quem está aprendendo, o que mais importa é que o Python do site se comporte
exatamente como o Python que a pessoa vai instalar depois, inclusive nas mensagens de erro. O custo de download foi
mitigado com carga sob demanda (só nas páginas com editor), progresso visível, cache permanente e Worker (a página
continua utilizável enquanto o Python carrega). Também pesou o `sys.settrace`, que viabiliza o modelo de trace.

## Testes

- **Vitest (205 testes):** executor Python no Pyodide real (limites, imports, `input()`, cada tipo de teste, robô),
  tradução de erros, SupervisorWorker com Worker falso (timeout e recriação), simulador, regras de progresso e
  conquistas, import/export, montagem do conteúdo, sprites e **todas as lições e fases** (solução de referência passa,
  código inicial falha, limite de linhas respeitado).
- **Playwright (14 testes):** Worker e Pyodide no Chromium (progresso do download, erro traduzido, loop infinito,
  recuperação após `terminate()`), lição completa, trilha e bloqueios, rascunho persistido, exportar e importar,
  robô com passo a passo e destaque de linha.
- **CI** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)): lint, testes e build, depois e2e.

## Design system

O visual segue o [DESIGN.md](DESIGN.md), aproveitando só o sistema visual (cores, tipos, espaçamento, pixel art) e não a marca.

- **Tokens com os mesmos nomes do DESIGN.md**, declarados em `@theme` do Tailwind v4
  ([`src/design-system/tokens.css`](src/design-system/tokens.css)) e expostos como CSS custom properties.
  Os namespaces padrão do Tailwind são zerados (`--color-*: initial` etc.), então uma classe como `bg-blue-500`
  nem existe. `--spacing: 1px` faz `p-16` valer exatamente o token `--spacing-16`.
- **Tipografia:** Jersey 10 só em títulos de 36 px ou mais (o componente `Titulo` só aceita esses tamanhos); Manrope
  no resto; o editor usa fonte monoespaçada com cores de sintaxe tiradas da paleta.
- **Uma cor de destaque:** Signal Orange `#ff5e24`, e **um único botão laranja preenchido por tela**. Quando a lição
  é concluída, "Executar" vira secundário e "Próxima lição" assume o laranja. O fundo é Cloud Mist.
- **Forma e elevação:** botões com raio de 6 px; cards com 12 px ou mais e uma única sombra; foco e estado ativo com o
  anel laranja (`--shadow-subtle`).
- **Pixel art de verdade:** sprites definidos como grades de caracteres que apontam para tokens (sem hex soltos),
  desenhados em canvas com `image-rendering: pixelated`. Um teste garante que toda grade é retangular e só usa cores
  da paleta. Nuvens nos cantos, mascote Bit de até 80 px e rodapé em Ember Crust.
- **Contraste:** texto branco sobre Signal Orange tem 3,05:1, abaixo do AA para texto normal. Mantive porque o DESIGN.md
  exige texto branco no botão primário; o texto do botão é em negrito, e o laranja nunca é usado para texto corrido
  (links e textos usam Graphite e Ember Crust).

## Roadmap

### Conteúdo

1. **Nível 2 (Básico):** laços `for`/`range` e `while`, listas, strings e funções simples.
2. **Nível 3 (Intermediário):** dicionários, tuplas e conjuntos, parâmetros e retorno, `try/except`, list comprehension
   e biblioteca padrão.
3. **Nível 4 (Avançado):** classes e herança, decoradores e geradores, recursão, busca e ordenação, testes.

Os módulos desses níveis já existem em `content/python/`; falta escrever as lições (só arquivos `.md`, sem mudar código).

### Outras linguagens

Para adicionar uma linguagem: criar `src/linguagens/<id>/` com um adaptador que cumpra o contrato, registrá-lo em
`src/linguagens/index.js` e escrever `content/<id>/`. Núcleo, páginas, trilha, progresso e robô não mudam. Em cada caso,
o trabalho está no executor que roda no navegador:

| Linguagem | Executor no navegador | O que seria preciso |
|-----------|----------------------|---------------------|
| **JavaScript** | QuickJS compilado para WebAssembly, num Worker | QuickJS dá limite de memória e um *interrupt handler* para cortar loops (o `eval` nativo não permite). Testes no estilo `saida`/`funcao`, tradução dos erros do V8/QuickJS e as funções do robô em camelCase. |
| **SQL** | SQLite em WebAssembly (sql.js ou o build oficial), num Worker | Cada exercício traz um banco inicial (script de criação); tipo de teste novo que compara o resultado da consulta como tabela; o robô não se aplica. |
| **C** | um interpretador de C em JS/Wasm (por exemplo JSCPP ou picoc), ou clang + wasi para fidelidade total | Compilar é pesado: um interpretador é leve e permite contar passos; clang em Wasm é fiel, mas tem dezenas de MB. Erros de compilação traduzidos e `scanf` simulado como o `input()`. |
| **Java** | uma JVM no navegador (CheerpJ ou DoppioJVM) | É a mais pesada: JVM e compilação `javac` no cliente. Alternativa: limitar ao subconjunto suportado por um interpretador leve. Testes por método (`funcao`) se encaixam bem. |

### Próximos passos técnicos

- Editor de fases do robô com compartilhamento por link (fase codificada na URL).
- Interrupção imediata com `SharedArrayBuffer` + `pyodide.setInterruptBuffer` (exige COOP/COEP), para cortar
  até chamadas longas em C sem recriar o Worker.
- Efeitos sonoros e partículas em pixel art; busca nas lições.
- Cabeçalhos de segurança (CSP) na Vercel, validados com o Pyodide em produção.
- Publicar na Vercel e adicionar o link aqui.
