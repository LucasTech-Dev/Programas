from services.enriquecedor import Enriquecedor
from repositories.livros_repository import LivrosRepository


def main():

    isbn = "9788550801483"

    enriquecedor = Enriquecedor()
    repositorio = LivrosRepository()

    resultado = enriquecedor.consultar(isbn)

    if resultado is None:
        print("Livro não encontrado.")
        return

    fonte, livro = resultado

    print(f"Livro encontrado na fonte: {fonte}")
    print("Salvando no Supabase...")

    repositorio.salvar(livro)

    print("Livro salvo com sucesso!")


if __name__ == "__main__":
    main()