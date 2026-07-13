import requests
from requests.exceptions import RequestException

from apis.base import BaseAPI
from models.livro_enriquecido import LivroEnriquecido


class GoogleBooksAPI(BaseAPI):

    BASE_URL = "https://www.googleapis.com/books/v1/volumes"

    def consultar_isbn(self, isbn: str):

        parametros = {
            "q": f"isbn:{isbn}"
        }

        try:

            resposta = requests.get(
                self.BASE_URL,
                params=parametros,
                timeout=20
            )

            resposta.raise_for_status()

            dados = resposta.json()

            if "items" not in dados:
                return None

            volume = dados["items"][0]["volumeInfo"]

            imagem = ""

            if "imageLinks" in volume:
                imagem = volume["imageLinks"].get(
                    "thumbnail",
                    ""
                )

            return LivroEnriquecido(
                isbn=isbn,
                titulo=volume.get("title", ""),
                subtitulo=volume.get("subtitle", ""),
                autores=volume.get("authors", []),
                editora=volume.get("publisher", ""),
                data_publicacao=volume.get("publishedDate", ""),
                paginas=volume.get("pageCount"),
                idioma=volume.get("language", ""),
                descricao=volume.get("description", ""),
                categorias=volume.get("categories", []),
                capa=imagem,
                fonte="Google Books"
            )

        except RequestException:
            return None