"""
Executor do Passo a Byte.

Roda dentro do Pyodide (no Web Worker do navegador e no Node durante os testes).
Recebe o código do aluno, executa com limites de passos, tempo e saída, roda os
testes do exercício e devolve um resultado estruturado em JSON.

As barreiras de segurança reais são o Web Worker (sem DOM) e o bloqueio de rede
feito em JavaScript. As restrições daqui (imports, builtins) são guarda-corpos
pedagógicos: impedem que o aluno quebre o ambiente sem querer.
"""

import ast
import builtins
import json
import math
import sys
import time

ARQUIVO_ALUNO = "<aluno>"

MODULOS_PERMITIDOS = frozenset({
    "abc", "array", "bisect", "calendar", "collections", "contextlib", "copy",
    "dataclasses", "datetime", "decimal", "enum", "fractions", "functools",
    "heapq", "itertools", "json", "math", "numbers", "operator", "pprint",
    "random", "re", "statistics", "string", "textwrap", "time", "typing",
    "unittest",
})

BUILTINS_REMOVIDOS = ("open", "exec", "eval", "compile", "breakpoint", "help", "exit", "quit", "input")


class LimiteExcedido(BaseException):
    """Herda de BaseException para que um `except Exception` do aluno não a engula."""

    def __init__(self, tipo, mensagem):
        super().__init__(mensagem)
        self.tipo = tipo


def _importar_restrito(nome, globais=None, locais=None, lista=(), nivel=0):
    raiz = nome.split(".")[0]
    if nivel != 0 or raiz not in MODULOS_PERMITIDOS:
        raise ImportError(f"o módulo '{nome}' não está disponível aqui")
    return __import__(nome, globais, locais, lista, nivel)


class _Fluxo:
    """Substitui sys.stdout/sys.stderr durante a execução do aluno."""

    def __init__(self, sessao, para_saida):
        self.sessao = sessao
        self.para_saida = para_saida

    def write(self, texto):
        self.sessao.escrever(texto, para_saida=self.para_saida)
        return len(texto)

    def flush(self):
        pass


class Sessao:
    """Uma execução isolada: namespace próprio, fila de entrada, saída e contadores.

    `console` guarda tudo o que o aluno veria num terminal (inclusive os prompts
    do input e o que foi "digitado"). `saida` guarda só o que o programa
    imprimiu, que é o que os testes comparam.
    """

    def __init__(self, limites, entrada=(), extras=None, ao_escrever=None, ao_linha=None):
        self.limites = limites
        self.entrada = [str(valor) for valor in entrada]
        self.extras = extras or {}
        self.ao_escrever = ao_escrever
        self.ao_linha = ao_linha
        self.console = []
        self.saida = []
        self.tamanho = 0
        self.passos = 0
        self.linha = None
        self.inicio = time.monotonic()
        self.namespace = {"__name__": "__main__", "__builtins__": self._builtins()}

    def _builtins(self):
        tabela = dict(vars(builtins))
        for nome in BUILTINS_REMOVIDOS:
            tabela.pop(nome, None)
        tabela["__import__"] = _importar_restrito
        tabela["input"] = self.input
        tabela.update(self.extras)
        return tabela

    def escrever(self, texto, para_saida=True):
        self.tamanho += len(texto)
        if self.tamanho > self.limites["saida"]:
            raise LimiteExcedido("LimiteDeSaida", "o programa imprimiu texto demais")
        self.console.append(texto)
        if para_saida:
            self.saida.append(texto)
        if self.ao_escrever:
            self.ao_escrever(texto)

    def input(self, prompt=""):
        self.escrever(str(prompt), para_saida=False)
        if not self.entrada:
            raise EOFError("o programa pediu um input(), mas não há mais dados de entrada")
        valor = self.entrada.pop(0)
        self.escrever(valor + "\n", para_saida=False)
        return valor

    def _rastrear(self, frame, evento, _arg):
        # Só o código do aluno é rastreado; a biblioteca padrão roda livre.
        if frame.f_code.co_filename != ARQUIVO_ALUNO:
            return None
        if evento == "line":
            self.passos += 1
            self.linha = frame.f_lineno
            if self.ao_linha:
                self.ao_linha(frame.f_lineno)
            if self.passos > self.limites["passos"]:
                raise LimiteExcedido("LimiteDePassos", "o programa executou linhas demais")
            if self.passos % 256 == 0 and time.monotonic() - self.inicio > self.limites["segundos"]:
                raise LimiteExcedido("LimiteDeTempo", "o programa demorou demais")
        return self._rastrear

    def chamar(self, funcao, *args):
        """Executa `funcao` com limites, saída capturada e rastreamento de linhas.

        Devolve (resultado, erro); erro é None quando tudo correu bem.
        """
        antigos = sys.stdout, sys.stderr
        sys.stdout, sys.stderr = _Fluxo(self, True), _Fluxo(self, False)
        sys.settrace(self._rastrear)
        try:
            return funcao(*args), None
        except SystemExit:
            return None, None
        except LimiteExcedido as erro:
            return None, {"tipo": erro.tipo, "mensagem": str(erro), "linha": self.linha}
        except BaseException as erro:  # noqa: BLE001 — qualquer erro do aluno vira resultado
            return None, _descrever_excecao(erro, self.linha)
        finally:
            sys.settrace(None)
            sys.stdout, sys.stderr = antigos

    def executar(self, codigo_compilado):
        _, erro = self.chamar(exec, codigo_compilado, self.namespace)
        return erro

    def texto_console(self):
        return "".join(self.console)

    def texto_saida(self):
        return "".join(self.saida)


def _descrever_excecao(erro, linha_atual):
    linha = None
    rastro = erro.__traceback__
    while rastro is not None:
        if rastro.tb_frame.f_code.co_filename == ARQUIVO_ALUNO:
            linha = rastro.tb_lineno
        rastro = rastro.tb_next
    if isinstance(erro, SyntaxError) and erro.filename == ARQUIVO_ALUNO:
        linha = erro.lineno
    mensagem = str(erro)
    if isinstance(erro, KeyError) and erro.args:
        mensagem = repr(erro.args[0])
    return {"tipo": type(erro).__name__, "mensagem": mensagem, "linha": linha or linha_atual}


def compilar(codigo):
    """Devolve (código compilado, erro)."""
    try:
        return compile(codigo, ARQUIVO_ALUNO, "exec"), None
    except SyntaxError as erro:
        return None, {
            "tipo": type(erro).__name__,
            "mensagem": erro.msg,
            "linha": erro.lineno,
            "coluna": erro.offset,
        }


# --- Comparação de valores -------------------------------------------------

def _normalizar(valor):
    if isinstance(valor, (list, tuple)):
        return [_normalizar(item) for item in valor]
    if isinstance(valor, dict):
        return {chave: _normalizar(item) for chave, item in valor.items()}
    return valor


def valores_iguais(obtido, esperado):
    obtido, esperado = _normalizar(obtido), _normalizar(esperado)
    if isinstance(obtido, bool) or isinstance(esperado, bool):
        return type(obtido) is type(esperado) and obtido == esperado
    if isinstance(obtido, (int, float)) and isinstance(esperado, (int, float)):
        return math.isclose(obtido, esperado, rel_tol=1e-9, abs_tol=1e-9)
    if isinstance(obtido, (set, frozenset)) and isinstance(esperado, list):
        try:
            return obtido == set(esperado)
        except TypeError:
            return False
    if isinstance(obtido, list) and isinstance(esperado, list):
        return len(obtido) == len(esperado) and all(map(valores_iguais, obtido, esperado))
    if isinstance(obtido, dict) and isinstance(esperado, dict):
        return obtido.keys() == esperado.keys() and all(
            valores_iguais(obtido[chave], esperado[chave]) for chave in obtido
        )
    return obtido == esperado


def normalizar_texto(texto):
    linhas = [linha.rstrip() for linha in texto.replace("\r\n", "\n").split("\n")]
    while linhas and not linhas[-1]:
        linhas.pop()
    return "\n".join(linhas)


def _mostrar(valor):
    return valor if isinstance(valor, str) else repr(valor)


# --- Testes ----------------------------------------------------------------

def _teste_saida(teste, sessao):
    obtido = normalizar_texto(sessao.texto_saida())
    esperado = normalizar_texto(str(teste["esperado"]))
    return obtido == esperado, esperado, obtido


def _teste_funcao(teste, sessao):
    nome = teste["funcao"]
    funcao = sessao.namespace.get(nome)
    if not callable(funcao):
        return False, f"uma função chamada {nome}", "a função não foi encontrada", None
    obtido, erro = sessao.chamar(funcao, *teste.get("args", []))
    if erro:
        return False, repr(teste["esperado"]), None, erro
    return valores_iguais(obtido, teste["esperado"]), repr(teste["esperado"]), repr(obtido), None


def _teste_variavel(teste, sessao):
    nome = teste["nome"]
    if nome not in sessao.namespace:
        return False, f"uma variável chamada {nome}", "a variável não foi criada"
    obtido = sessao.namespace[nome]
    if "tipo_esperado" in teste:
        tipo = type(obtido).__name__
        return tipo == teste["tipo_esperado"], teste["tipo_esperado"], tipo
    return valores_iguais(obtido, teste["esperado"]), repr(teste["esperado"]), repr(obtido)


def _teste_python(teste, sessao):
    codigo = compile(teste["codigo"], "<teste>", "exec")
    _, erro = sessao.chamar(exec, codigo, sessao.namespace)
    if erro and erro["tipo"] == "AssertionError":
        return False, None, None, None
    return erro is None, None, None, erro


def _contar_chamadas(arvore):
    contagem = {}
    for no in ast.walk(arvore):
        if isinstance(no, ast.Call) and isinstance(no.func, ast.Name):
            contagem[no.func.id] = contagem.get(no.func.id, 0) + 1
    return contagem


def _teste_estrutura(teste, arvore):
    """Olha o código sem executar: nós da AST exigidos/proibidos e quantas vezes cada função é chamada."""
    presentes = {type(no).__name__ for no in ast.walk(arvore)}
    if any(nome not in presentes for nome in teste.get("usa", [])):
        return False
    if any(nome in presentes for nome in teste.get("nao_usa", [])):
        return False
    chamadas = _contar_chamadas(arvore)
    if any(chamadas.get(nome, 0) > limite for nome, limite in teste.get("max_chamadas", {}).items()):
        return False
    return all(chamadas.get(nome, 0) >= minimo for nome, minimo in teste.get("min_chamadas", {}).items())


def rodar_teste(teste, codigo_compilado, arvore, limites):
    tipo = teste["tipo"]
    resultado = {
        "nome": teste.get("nome", ""),
        "mensagem": teste.get("mensagem", ""),
        "passou": False,
        "esperado": None,
        "obtido": None,
        "erro": None,
    }

    if tipo == "estrutura":
        resultado["passou"] = _teste_estrutura(teste, arvore)
        return resultado

    sessao = Sessao(limites, teste.get("entrada", []))
    erro = sessao.executar(codigo_compilado)
    if erro:
        resultado["erro"] = erro
        resultado["obtido"] = sessao.texto_saida() if tipo == "saida" else None
        return resultado

    if tipo == "saida":
        passou, esperado, obtido = _teste_saida(teste, sessao)
    elif tipo == "funcao":
        passou, esperado, obtido, resultado["erro"] = _teste_funcao(teste, sessao)
    elif tipo == "variavel":
        passou, esperado, obtido = _teste_variavel(teste, sessao)
    elif tipo == "python":
        passou, esperado, obtido, resultado["erro"] = _teste_python(teste, sessao)
    else:
        raise ValueError(f"tipo de teste desconhecido: {tipo}")

    resultado.update(passou=passou, esperado=esperado, obtido=obtido)
    return resultado


# --- Ponto de entrada ------------------------------------------------------

def executar(codigo, opcoes):
    limites = opcoes["limites"]
    inicio = time.monotonic()
    compilado, erro = compilar(codigo)
    resposta = {"console": "", "erro": erro, "testes": [], "passos": 0}

    if compilado is not None:
        sessao = Sessao(limites, opcoes.get("entrada", []))
        resposta["erro"] = sessao.executar(compilado)
        resposta["console"] = sessao.texto_console()
        resposta["passos"] = sessao.passos

        testes = opcoes.get("testes", [])
        if testes:
            arvore = ast.parse(codigo)
            resposta["testes"] = [rodar_teste(teste, compilado, arvore, limites) for teste in testes]

    resposta["ms"] = round((time.monotonic() - inicio) * 1000)
    return resposta


def executar_json(codigo, opcoes_json):
    """Interface com o JavaScript: texto entra, texto sai (sem proxies do Pyodide)."""
    resposta = executar(codigo, json.loads(opcoes_json))
    return json.dumps(resposta, ensure_ascii=False, default=_mostrar)
