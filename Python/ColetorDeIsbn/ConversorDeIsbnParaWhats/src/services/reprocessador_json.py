import json
from pathlib import Path

from models.livro import Livro
from models.livro_enriquecido import LivroEnriquecido
from repositories.livros_repository import LivrosRepository
from services.enriquecedor import Enriquecedor


class ReprocessadorJson:

    def __init__(self):

        self.enriquecedor = Enriquecedor()
        self.repositorio = LivrosRepository()

    def carregar(self, caminho: str) -> list[Livro]:

        caminho = Path(caminho)

        if not caminho.exists():
            return []

        with open(caminho, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)

        livros = []

        for item in dados:

            livros.append(
                Livro(
                    titulo=item["titulo"],
                    isbn=item["isbn"]
                )
            )

        return livros

    def executar(self, caminho: str):

        livros = self.carregar(caminho)

        print(f"{len(livros)} livros carregados.\n")

        livros_para_salvar = []
        fontes = {}

        for indice, livro in enumerate(livros, start=1):

            print(f"[{indice}/{len(livros)}] {livro.isbn}")

            resposta = self.enriquecedor.consultar(livro.isbn)

            # Encontrou em alguma API
            if resposta is not None:

                fonte, livro_enriquecido = resposta

                livros_para_salvar.append(livro_enriquecido)

                fontes[fonte] = (
                    fontes.get(fonte, 0) + 1
                )

            # Não encontrou em nenhuma API
            else:

                livros_para_salvar.append(
                    LivroEnriquecido(
                        isbn=livro.isbn,
                        titulo=livro.titulo,
                        subtitulo="",
                        autores=[],
                        editora="",
                        data_publicacao="",
                        paginas=None,
                        idioma="",
                        descricao="",
                        categorias=[],
                        capa="",
                        fonte="Local"
                    )
                )

                fontes["local"] = (
                    fontes.get("local", 0) + 1
                )

        print("\nEnviando livros para o Supabase...")

        self.repositorio.salvar_lote(livros_para_salvar)

        print("\nResumo")
        print("=" * 60)

        print(f"Processados........: {len(livros)}")
        print(f"Enviados..........: {len(livros_para_salvar)}")

        print("\nFontes utilizadas:")

        for fonte, quantidade in fontes.items():
            print(f"  {fonte}: {quantidade}")

        print("\nReprocessamento concluído.")