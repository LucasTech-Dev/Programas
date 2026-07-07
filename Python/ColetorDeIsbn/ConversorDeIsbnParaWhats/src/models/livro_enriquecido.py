from dataclasses import dataclass, field


@dataclass
class LivroEnriquecido:
    """
    Representa um livro após o enriquecimento por APIs externas.
    """

    # Identificação
    isbn: str

    # Dados bibliográficos
    titulo: str = ""
    subtitulo: str = ""
    autores: list[str] = field(default_factory=list)
    editora: str = ""
    data_publicacao: str = ""
    paginas: int | None = None
    idioma: str = ""
    descricao: str = ""

    # Classificação
    categorias: list[str] = field(default_factory=list)

    # Recursos
    capa: str = ""

    # Metadados
    fonte: str = ""