from models.livro import Livro
from limpeza import normalizar_linha
from isbn import extrair_isbn


class Parser:
    """
    Responsável por ler um arquivo do WhatsApp e
    transformar seu conteúdo em uma lista de objetos Livro.
    """

    def executar(self, caminho_arquivo: str) -> list[Livro]:

        livros = []

        with open(caminho_arquivo, "r", encoding="utf-8") as arquivo:
            linhas = arquivo.readlines()

        for indice, linha_original in enumerate(linhas):

            linha = normalizar_linha(linha_original)

            if not linha:
                continue

            isbn = extrair_isbn(linha)

            if not isbn:
                continue

            # Caso 1: título e ISBN na mesma linha
            if linha != isbn:

                titulo = linha.replace(isbn, "").strip()

                if titulo:
                    livros.append(
                        Livro(
                            titulo=titulo,
                            isbn=isbn
                        )
                    )

                continue

            # Caso 2: ISBN sozinho na linha
            if indice > 0:

                titulo = normalizar_linha(linhas[indice - 1])

                if titulo:
                    livros.append(
                        Livro(
                            titulo=titulo,
                            isbn=isbn
                        )
                    )

        return livros