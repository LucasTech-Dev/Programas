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
                    titulo=item.get("titulo", ""),
                    isbn=item.get("isbn", "")
                )
            )

        return livros

    def executar(self, caminho: str):
        livros = self.carregar(caminho)

        print(f"{len(livros)} livros carregados para reprocessamento.\n")

        livros_para_salvar = []
        fontes = {}

        for indice, livro in enumerate(livros, start=1):
            print(f"[{indice}/{len(livros)}] ISBN: {livro.isbn}")

            resposta = self.enriquecedor.consultar(livro.isbn)

            # Encontrou em alguma API
            if resposta is not None:
                fonte, livro_enriquecido = resposta

                # Garante que titulo e isbn originais nao sejam perdidos se a API retornar None/vazio
                livro_enriquecido.titulo = livro_enriquecido.titulo or livro.titulo
                livro_enriquecido.isbn = livro_enriquecido.isbn or livro.isbn

                livros_para_salvar.append(livro_enriquecido)
                fontes[fonte] = fontes.get(fonte, 0) + 1

            # Nao encontrou em nenhuma API (Fallback Local)
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
                fontes["local"] = fontes.get("local", 0) + 1

        print("\nEnviando livros ao Supabase em lotes...")
        self.repositorio.salvar_lote(livros_para_salvar)

        print("\n" + "=" * 60)
        print("RESUMO DO REPROCESSAMENTO")
        print("=" * 60)
        print(f"Processados........: {len(livros)}")
        print(f"Enviados..........: {len(livros_para_salvar)}")

        print("\nFontes utilizadas:")
        for fonte, quantidade in fontes.items():
            print(f"  {fonte}: {quantidade}")

        print("\nReprocessamento concluído com sucesso!")