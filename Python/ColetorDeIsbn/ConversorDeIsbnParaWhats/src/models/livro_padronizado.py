from dataclasses import dataclass


@dataclass
class LivroPadronizado:
    isbn: str
    titulo: str
    subtitulo: str
    autores: str
    editora: str
    data_publicacao: str
    paginas: int
    idioma: str
    descricao: str
    categorias: str
    imagem: str
    fonte: str