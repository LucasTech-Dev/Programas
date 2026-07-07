from models.livro_enriquecido import LivroEnriquecido

import requests
from requests.exceptions import RequestException

from apis.base import BaseAPI


class OpenLibraryAPI(BaseAPI):

    BASE_URL = "https://openlibrary.org/api/books"

    def consultar_isbn(self, isbn: str):

        parametros = {
            "bibkeys": f"ISBN:{isbn}",
            "format": "json",
            "jscmd": "data"
        }

        try:

            resposta = requests.get(
                self.BASE_URL,
                params=parametros,
                timeout=20
            )

            resposta.raise_for_status()

            dados = resposta.json()

            livro = dados.get(f"ISBN:{isbn}")

            if not livro:
                return None

            return LivroEnriquecido(
                isbn=isbn,
                titulo=livro.get("title", ""),
                subtitulo=livro.get("subtitle", ""),
                autores=[
                    autor.get("name", "")
                    for autor in livro.get("authors", [])
                ],
                editora=(
                    livro.get("publishers", [{}])[0].get("name", "")
                    if livro.get("publishers")
                    else ""
                ),
                data_publicacao=livro.get("publish_date", ""),
                paginas=livro.get("number_of_pages"),
                categorias=[
                    assunto.get("name", "")
                    for assunto in livro.get("subjects", [])
                ],
                fonte="Open Library"
            )

        except RequestException:
            return None