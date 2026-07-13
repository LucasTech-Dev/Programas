from apis.base import BaseAPI


class IAAPI(BaseAPI):
    """
    API de IA.

    Nesta primeira versão ela ainda não realiza consultas.
    Será implementada futuramente para enriquecer os livros
    que não forem encontrados pelas APIs tradicionais.
    """

    def consultar_isbn(self, isbn: str):
        return None