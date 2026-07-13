from apis.openlibrary import OpenLibraryAPI
from apis.googlebooks import GoogleBooksAPI
from apis.brasilapi import BrasilAPI


def testar_api(nome, api, isbn):
    print("=" * 60)
    print(nome)
    print("=" * 60)

    resultado = api.consultar_isbn(isbn)

    if resultado is None:
        print("Nenhum resultado encontrado.")
    else:
        print(resultado)

    print()


def main():

    # Troque por qualquer ISBN que quiser testar
    isbn = "9788550801483"

    print(f"Testando ISBN: {isbn}\n")

    testar_api("OpenLibrary", OpenLibraryAPI(), isbn)
    testar_api("Google Books", GoogleBooksAPI(), isbn)
    testar_api("BrasilAPI", BrasilAPI(), isbn)


if __name__ == "__main__":
    main()