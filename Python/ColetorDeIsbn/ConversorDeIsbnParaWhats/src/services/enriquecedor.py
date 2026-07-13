from apis.openlibrary import OpenLibraryAPI
from apis.googlebooks import GoogleBooksAPI
from apis.brasilapi import BrasilAPI


class Enriquecedor:

    def __init__(self):

        self.fontes = [
            ("openlibrary", OpenLibraryAPI()),
            ("googlebooks", GoogleBooksAPI()),
            ("brasilapi", BrasilAPI())
        ]

    def consultar(self, isbn: str):

        for nome, fonte in self.fontes:

            resultado = fonte.consultar_isbn(isbn)

            if resultado is not None:
                return nome, resultado

        return None