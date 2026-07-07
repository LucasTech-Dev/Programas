from models.relatorio import Relatorio

relatorio = Relatorio(
    total_livros=10,
    isbn_validos=8,
    isbn_invalidos=1,
    isbn_duplicados=1,
    lista_invalidos=["9788550801484"],
    lista_duplicados=["9788550801483"]
)

print(relatorio.resumo())