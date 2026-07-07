from abc import ABC, abstractmethod


class BaseAPI(ABC):
    """
    Classe base para provedores de dados bibliográficos.
    """

    @abstractmethod
    def consultar_isbn(self, isbn: str):
        """
        Consulta um ISBN.

        Retorna:
            dict | None
        """
        pass