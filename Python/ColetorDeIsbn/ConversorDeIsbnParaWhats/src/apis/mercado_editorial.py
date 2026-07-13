import requests
from requests.exceptions import RequestException

from apis.base import BaseAPI
from models.livro_enriquecido import LivroEnriquecido


class MercadoEditorialAPI(BaseAPI):

    BASE_URL = "https://api.mercadoeditorial.org/api/v1.2/book"

    def consultar_isbn(self, isbn: str):

        try:

            resposta = requests.get(
                self.BASE_URL,
                params={"isbn": isbn},
                timeout=20
            )

            resposta.raise_for_status()

            dados = resposta.json()

            if not dados.get("books"):
                return None

            livro = dados["books"][0]

            return LivroEnriquecido(
                isbn=isbn,
                titulo=livro.get("title", ""),
                subtitulo=livro.get("subtitle", ""),
                autores=livro.get("authors", []),
                editora=livro.get("publisher", ""),
                data_publicacao=str(livro.get("published_date", "")),
                paginas=livro.get("page_count"),
                idioma=livro.get("language", ""),
                descricao=livro.get("synopsis", ""),
                categorias=livro.get("subjects", []),
                capa=livro.get("cover_url", ""),
                fonte="Mercado Editorial"
            )

        except RequestException:
            return None