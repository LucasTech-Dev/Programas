from collections import Counter

from models.relatorio import Relatorio
from isbn import validar_isbn


def analisar_livros(livros):
    """
    Analisa a lista de livros e gera um relatório estatístico.

    Parâmetros:
        livros (list[Livro])

    Retorna:
        Relatorio
    """

    relatorio = Relatorio()

    relatorio.total_livros = len(livros)

    contador = Counter()

    for livro in livros:

        contador[livro.isbn] += 1

        if validar_isbn(livro.isbn):
            relatorio.isbn_validos += 1
        else:
            relatorio.isbn_invalidos += 1
            relatorio.lista_invalidos.append(livro.isbn)

    for isbn, quantidade in contador.items():

        if quantidade > 1:
            relatorio.isbn_duplicados += 1
            relatorio.lista_duplicados.append(isbn)

    return relatorio




def salvar_relatorio(relatorio, caminho):
    """
    Salva o relatório de processamento em um arquivo Markdown.

    Parâmetros:
        relatorio (Relatorio): objeto contendo as estatísticas.
        caminho (str): caminho do arquivo de saída.
    """
    with open(caminho, "w", encoding="utf-8") as arquivo:
        arquivo.write(relatorio.resumo())

    print(f"\nRelatório criado com sucesso:\n{caminho}")