from database.supabase_client import supabase
from models.livro_enriquecido import LivroEnriquecido


class LivrosRepository:

    def _converter_para_dict(self, livro: LivroEnriquecido):

        return {
            "fonte": livro.fonte,
            "isbn": livro.isbn,
            "titulo": livro.titulo,
            "subtitulo": livro.subtitulo,
            "autores": livro.autores,
            "editora": livro.editora,
            "publicacao": livro.data_publicacao,
            "paginas": livro.paginas,
            "idioma": livro.idioma,
            "categorias": livro.categorias,
            "descricao": livro.descricao,
            "capa": livro.capa,
        }

    def salvar(self, livro: LivroEnriquecido):

        return (
            supabase
            .table("livros")
            .upsert(
                self._converter_para_dict(livro),
                on_conflict="isbn"
            )
            .execute()
        )

    def salvar_lote(self, livros: list[LivroEnriquecido]):

        if not livros:
            return None

        print(f"\nLivros recebidos: {len(livros)}")

        # Remove ISBNs duplicados
        livros_unicos = {}

        for livro in livros:

            if not livro.isbn:
                continue

            livros_unicos[livro.isbn] = livro

        print(f"Livros únicos: {len(livros_unicos)}")
        print(f"Duplicados removidos: {len(livros) - len(livros_unicos)}")

        dados = [
            self._converter_para_dict(livro)
            for livro in livros_unicos.values()
        ]

        resposta = (
            supabase
            .table("livros")
            .upsert(
                dados,
                on_conflict="isbn"
            )
            .execute()
        )

        print(f"Livros enviados ao Supabase: {len(dados)}")

        return resposta