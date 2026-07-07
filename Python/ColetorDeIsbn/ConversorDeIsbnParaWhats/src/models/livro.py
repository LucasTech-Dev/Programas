from dataclasses import dataclass, field
from typing import Optional


@dataclass
class Livro:
    """
    Representa um livro durante todo o pipeline do sistema.

    Nesta primeira etapa utilizamos apenas título e ISBN.
    Os demais campos serão adicionados no Script 1 (Enriquecedor).
    """

    titulo: str
    isbn: Optional[str] = None

    def __post_init__(self):
        self.titulo = self.titulo.strip()

        if self.isbn:
            self.isbn = (
                self.isbn.replace("-", "")
                .replace(" ", "")
                .strip()
            )

    def possui_isbn(self) -> bool:
        """Retorna True caso o livro possua ISBN."""

        return bool(self.isbn)

    def to_dict(self):
        """Converte o objeto para dicionário."""

        return {
            "Título": self.titulo,
            "ISBN": self.isbn,
        }

    def __str__(self):
        return f"{self.titulo} ({self.isbn})"