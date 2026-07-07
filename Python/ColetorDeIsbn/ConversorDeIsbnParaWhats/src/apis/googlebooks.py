import requests
from requests.exceptions import RequestException

from apis.base import BaseAPI


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

            return dados

        except RequestException:

            return None