from services.enriquecedor import Enriquecedor
from services.normalizador import normalizar_openlibrary


def main():
    isbn = "9788550801483"

    enriquecedor = Enriquecedor()

    print(f"Consultando ISBN: {isbn}\n")

    fonte, dados = enriquecedor.consultar(isbn)

    if dados is None:
        print("Nenhuma API retornou dados.")
        return

    print(f"Fonte utilizada: {fonte}")

    if fonte == "openlibrary":
        livro = normalizar_openlibrary(dados)

    elif fonte == "googlebooks":
        print("Normalizador do Google Books ainda não implementado.")
        return

    print("\nLivro normalizado:\n")
    print(livro)


if __name__ == "__main__":
    main()