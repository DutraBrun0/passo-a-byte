<div align="center">

# Passo a Byte

**Aprenda Python direto no navegador, uma lição de cada vez.**

Lições curtas, editor de código, Python de verdade rodando no seu navegador e correção automática
com mensagens de erro em português. E um robozinho, o Bit, que executa o seu código linha por linha.

[**▶ Acessar o site**](https://passoabyte.vercel.app/)

![React](https://img.shields.io/badge/React_19-20232a?logo=react&logoColor=61dafb)
![Vite](https://img.shields.io/badge/Vite_6-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-0f172a?logo=tailwindcss&logoColor=38bdf8)
![Pyodide](https://img.shields.io/badge/Pyodide-Python_3.14-3776ab?logo=python&logoColor=ffd43b)
![Vitest](https://img.shields.io/badge/Vitest-6e9f18?logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2ead33?logo=playwright&logoColor=white)

![Demonstração: uma lição corrigida na hora e o Bit resolvendo a fase Espiral](docs/demo.gif)

</div>

---

## Sobre o projeto

O **Passo a Byte** é uma plataforma de ensino de programação para quem está começando do zero. A ideia é tirar
todas as barreiras do primeiro contato com o código: **não precisa instalar nada, não precisa criar conta e não
precisa de servidor**. Você abre o site, lê uma explicação curta, escreve o código e recebe a correção na hora.

O Python que roda no site não é uma imitação: é o **CPython 3.14 compilado para WebAssembly** (Pyodide), executado
num Web Worker. Isso significa que as mensagens de erro e o comportamento são exatamente os mesmos do Python que a
pessoa vai instalar no computador depois. A diferença é que aqui os erros chegam **traduzidos e explicados em
português**, com a linha marcada no editor.

Todo o progresso fica salvo no próprio navegador (`localStorage`), com opção de exportar e importar um backup em JSON.

## Funcionalidades

### 📚 Trilha de lições
- Níveis divididos em módulos, e módulos divididos em lições curtas, liberadas em sequência.
- Cada lição tem a explicação com exemplos de um lado e o **editor (CodeMirror 6)**, a saída e os testes do outro.
- Execução com `Ctrl+Enter`, resultado de cada teste com "esperado" × "seu código produziu".
- **Dicas** reveladas uma de cada vez e **solução comentada** liberada depois de 3 tentativas
  (ver a solução antes de acertar vale metade do XP).
- `input()` simulado: cada teste fornece o que o "usuário" digitaria.

### 🤖 Desafios do Robô
Você programa o **Bit** com funções como `andar()` para atravessar labirintos em pixel art. O código é executado e
reproduzido passo a passo, com a linha atual destacada no editor.

| # | Fase | # | Fase |
|---|------|---|------|
| 1 | Primeiros passos | 5 | A chave |
| 2 | A primeira curva | 6 | Espiral |
| 3 | A escada | 7 | Chaves espalhadas |
| 4 | Corredor sem fim | 8 | O labirinto (regra da mão direita) |

Controles de **Executar, Pausar, Passo a passo, Reiniciar** e velocidade. As fases mais avançadas têm **limite de
linhas**, o que obriga o uso de laços em vez de repetir comandos.

### 🏆 Progresso e conquistas
- XP por lição, sequência de dias estudando e **10 conquistas** em pixel art.
- Backup do progresso em arquivo JSON (exportar e importar).

### ♿ Experiência
- Tela de carregamento do Python em pixel art, mostrando o progresso real do download.
- Responsivo para desktop e tablet, navegação por teclado, foco visível, `prefers-reduced-motion` e regiões `aria-live`.

## Conteúdo disponível

| Nível | Módulos | Status |
|-------|---------|--------|
| **1 · Iniciante** | Mostrando coisas na tela, Variáveis, Tipos de dados, Operadores, Conversando com o usuário, Tomando decisões | ✅ Completo (22 lições) |
| **2 · Básico** | Laços `for`, laços `while`, listas, strings, funções | 🚧 Em construção |
| **3 · Intermediário** | Dicionários, tuplas e conjuntos, funções, erros, compreensões, biblioteca padrão | 🚧 Em construção |
| **4 · Avançado** | Classes, herança, decoradores e geradores, recursão, algoritmos, testes | 🚧 Em construção |
| **Desafios do Robô** | 8 fases | ✅ Completo |

Os níveis 2 a 4 já aparecem na trilha com seus módulos; falta escrever as lições, o que é feito só com arquivos
Markdown, sem mexer em código.

## Tecnologias

| Área | Ferramentas |
|------|-------------|
| Interface | React 19, React Router 7, Tailwind CSS 4 |
| Editor | CodeMirror 6 (`@codemirror/lang-python`) |
| Execução de Python | Pyodide (CPython 3.14 em WebAssembly), Web Worker |
| Estado | Zustand (persistência), funções puras para as regras de progresso |
| Conteúdo | Markdown + YAML, convertidos para JSON no build por um plugin do Vite |
| Testes | Vitest (inclusive com o Pyodide real em Node), Playwright |
| Qualidade | ESLint, GitHub Actions |
| Deploy | Vercel |

## Como rodar localmente

**Requisito:** Node.js 20 ou mais recente.

```bash
git clone https://github.com/DutraBrun0/passo-a-byte.git
cd passo-a-byte
npm install
npm run dev          # http://localhost:5173
```

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | servidor de desenvolvimento (copia o Pyodide para `public/pyodide/` antes) |
| `npm test` | testes unitários e de conteúdo com Vitest |
| `npm run test:e2e` | testes no navegador com Playwright (rode `npx playwright install chromium` uma vez) |
| `npm run lint` | ESLint |
| `npm run build` | build de produção em `dist/` |
| `npm run check` | lint + testes + build (o mesmo que a CI roda) |
| `npm run demo:gif` | grava o `docs/demo.gif` com o Playwright |

## Como funciona por dentro

### Arquitetura

O projeto separa o que é **genérico** (trilha, progresso, robô, páginas) do que é **específico de uma linguagem**.
O núcleo não sabe nada de Python: ele conversa com um *adaptador de linguagem* que segue um contrato
([`src/nucleo/linguagens/contrato.js`](src/nucleo/linguagens/contrato.js)). Assim, adicionar JavaScript ou SQL no
futuro significa escrever um novo adaptador, sem tocar nas páginas.

```text
src/
├── nucleo/          ← independente de linguagem
│   ├── linguagens/  contrato do adaptador + registro
│   ├── execucao/    supervisor do Worker (fila, timeout, recriação)
│   ├── conteudo/    monta o curso a partir de content/
│   ├── progresso/   regras de XP, sequência e conquistas
│   └── robo/        simulador do labirinto (JS puro) e reprodutor
├── linguagens/
│   └── python/      adaptador, Worker, executor.py, tradução de erros
├── design-system/   tokens, componentes e sprites em pixel art
├── editor/          CodeMirror, tema e Markdown
└── paginas/         início, trilha, lição, robô e progresso
```

### Execução segura do código do aluno

1. **Sempre num Web Worker**: o código nunca roda na thread principal, então a página não trava.
2. **Limite de passos e de tempo** com `sys.settrace`, contando só as linhas do aluno.
3. **Cão de guarda**: se o Worker não responder em 10 s (por exemplo, numa conta gigante feita em C),
   ele é encerrado e recriado automaticamente.
4. **Sem rede**: depois que o Pyodide carrega, `fetch`, `XMLHttpRequest`, `WebSocket` e afins são desativados no Worker.
5. **Ambiente restrito**: só alguns módulos da biblioteca padrão podem ser importados, e `open`, `eval`, `exec`
   e `compile` são removidos.

### Como o robô é animado

O Worker executa o programa inteiro de uma vez e devolve um **trace**: uma lista de passos, cada um com a ação,
a linha do código e o estado completo do robô. A interface só percorre essa lista. Por isso pausar, avançar um passo
ou reiniciar são simples mudanças de índice, e o editor sabe exatamente qual linha destacar.

### Por que Pyodide e não Skulpt?

O Skulpt é bem mais leve (~1 MB contra ~12 MB), mas é uma reimplementação parcial do Python em JavaScript, com
diferenças de comportamento e de mensagens de erro. Para quem está aprendendo, a fidelidade pesa mais: o Pyodide
é o Python real e ainda oferece `sys.settrace`, que torna possível o limite de passos e o destaque de linha do robô.
O tamanho do download foi compensado com carregamento sob demanda, barra de progresso, cache permanente
(service worker) e execução em Worker.

## Como adicionar uma lição

A estrutura de pastas em `content/` **é o índice do curso**: o prefixo numérico define a ordem e o resto do nome
vira o id que aparece na URL. Cada lição é um arquivo `.md` com o exercício num cabeçalho YAML:

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
  dicas:
    - "Para descartar a parte decimal, use `//`."
  solucao: |
    minutos = 125
    print(minutos // 60, "horas e", minutos % 60, "minutos")
---
Texto da lição em Markdown, com exemplos.
````

Tipos de teste disponíveis: `saida` (o que foi impresso), `variavel` (valor ou tipo de uma variável),
`funcao` (retorno de uma função), `python` (um `assert` livre) e `estrutura` (análise do código sem executar,
como exigir ou proibir laços).

Ao rodar `npm test`, **toda lição é validada automaticamente**: a solução de referência precisa passar em todos os
testes e o código inicial precisa falhar, para evitar exercícios triviais por engano.

## Testes e CI

- **Vitest:** executor Python no Pyodide real, tradução de erros, supervisor do Worker, simulador do robô,
  regras de progresso e conquistas, montagem do conteúdo, sprites e validação de todas as lições e fases.
- **Playwright:** carregamento do Pyodide no Chromium, loop infinito e recuperação do Worker, lição completa,
  trilha e bloqueios, exportar/importar progresso e o robô com passo a passo.
- **GitHub Actions** ([`ci.yml`](.github/workflows/ci.yml)): lint, testes e build a cada push e pull request,
  seguidos dos testes no navegador.

## Design

O visual segue o [DESIGN.md](DESIGN.md): fundo azul-claro, **uma única cor de destaque** (laranja `#ff5e24`),
títulos na fonte Jersey 10 e texto em Manrope. Os sprites são **pixel art de verdade**, definidos como grades de
caracteres ligadas aos tokens de cor e desenhados em canvas com `image-rendering: pixelated`. Um teste garante que
todo sprite usa só cores da paleta.

## Próximos passos

- [ ] Escrever as lições dos níveis Básico, Intermediário e Avançado
- [ ] Editor de fases do robô com compartilhamento por link
- [ ] Novas linguagens (JavaScript, SQL, C, Java) usando o contrato de adaptador
- [ ] Interrupção imediata do código com `SharedArrayBuffer`
- [ ] Efeitos sonoros e busca nas lições
- [ ] Cabeçalhos de segurança (CSP) na Vercel

---

<div align="center">

Feito por [DutraBrun0](https://github.com/DutraBrun0)

</div>
