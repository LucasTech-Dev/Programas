from services.enriquecedor import Enriquecedor

isbns = [
    "9788550801483",
    "9788575422397",
    "9788532530783"
]

enriquecedor = Enriquecedor()

for isbn in isbns:

    print("=" * 70)
    print(isbn)

    resultado = enriquecedor.consultar(isbn)

    if resultado is None:
        print("Não encontrado")
        continue

    _, livro = resultado

    print(livro.titulo)
    print(livro.autores)