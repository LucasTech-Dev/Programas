import requests
from requests.exceptions import RequestException

from apis.base import BaseAPI
from models.livro_enriquecido import LivroEnriquecido


class BrasilAPI(BaseAPI):

    BASE_URL = "https://brasilapi.com.br/api/isbn/v1"

    def consultar_isbn(self, isbn: str):

        try:

            resposta = requests.get(
                f"{self.BASE_URL}/{isbn}",
                timeout=20
            )

            if resposta.status_code == 404:
                return None

            resposta.raise_for_status()

            livro = resposta.json()

            return LivroEnriquecido(
                isbn=isbn,
                titulo=livro.get("title", ""),
                subtitulo=livro.get("subtitle", ""),
                autores=livro.get("authors", []),
                editora=livro.get("publisher", ""),
                data_publicacao=livro.get("year", ""),
                paginas=livro.get("page_count"),
                idioma=livro.get("language", ""),
                descricao=livro.get("synopsis", ""),
                categorias=[],
                capa=livro.get("cover_url", ""),
                fonte="BrasilAPI"
            )

        except RequestException:
            return None