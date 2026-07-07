from apis.openlibrary import consultar_isbn


def main():
    isbn = "9788550801483"

    print(f"Consultando ISBN: {isbn}\n")

    livro = consultar_isbn(isbn)

    if livro:
        print("Consulta realizada com sucesso!\n")
        print(livro)
    else:
        print("Livro não encontrado.")


if __name__ == "__main__":
    main()