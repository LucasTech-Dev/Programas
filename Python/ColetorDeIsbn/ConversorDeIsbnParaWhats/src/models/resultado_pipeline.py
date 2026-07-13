from dataclasses import dataclass, field

from models.livro import Livro
from models.livro_enriquecido import LivroEnriquecido


@dataclass
class ResultadoPipeline:

    livros: list[LivroEnriquecido] = field(default_factory=list)

    livros_nao_enriquecidos: list[Livro] = field(default_factory=list)

    processados: int = 0
    encontrados: int = 0
    nao_encontrados: int = 0

    fontes: dict[str, int] = field(default_factory=dict)