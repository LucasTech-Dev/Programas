from models.livro_padronizado import LivroPadronizado


def normalizar_openlibrary(dados: dict) -> LivroPadronizado:
    """
    Converte o JSON da Open Library para o modelo LivroPadronizado.
    """

    autores = "; ".join(
        autor.get("name", "")
        for autor in dados.get("authors", [])
    )

    editora = "; ".join(
        editora.get("name", "")
        for editora in dados.get("publishers", [])
    )

    categorias = "; ".join(
        categoria.get("name", "")
        for categoria in dados.get("subjects", [])
    )

    imagem = dados.get("cover", {}).get("large", "")

    return LivroPadronizado(
        isbn=dados.get("identifiers", {})
                  .get("isbn_13", [""])[0],

        titulo=dados.get("title", ""),

        subtitulo=dados.get("subtitle", ""),

        autores=autores,

        editora=editora,

        data_publicacao=dados.get("publish_date", ""),

        paginas=dados.get("number_of_pages", 0),

        idioma="",

        descricao=dados.get("notes", ""),

        categorias=categorias,

        imagem=imagem,

        fonte="Open Library"
    )