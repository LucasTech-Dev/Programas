from services.enriquecedor import Enriquecedor


def main():

    enriquecedor = Enriquecedor()

    isbn = "9788550801483"

    print(f"Consultando ISBN: {isbn}\n")

    resultado = enriquecedor.consultar(isbn)

    if resultado is None:
        print("Nenhuma API retornou resultados.")
        return

    fonte, livro = resultado

    print("=" * 60)
    print("LIVRO ENRIQUECIDO")
    print("=" * 60)

    print(f"Fonte.............: {fonte}")
    print(f"ISBN..............: {livro.isbn}")
    print(f"Título............: {livro.titulo}")
    print(f"Subtítulo.........: {livro.subtitulo}")
    print(f"Autores...........: {', '.join(livro.autores)}")
    print(f"Editora...........: {livro.editora}")
    print(f"Publicação........: {livro.data_publicacao}")
    print(f"Páginas...........: {livro.paginas}")
    print(f"Idioma............: {livro.idioma}")
    print(f"Categorias........: {', '.join(livro.categorias)}")
    print(f"Descrição.........: {livro.descricao}")
    print(f"Capa..............: {livro.capa}")


if __name__ == "__main__":
    main()