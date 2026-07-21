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

    def salvar_lote(self, livros: list[LivroEnriquecido], tamanho_lote: int = 100):
        if not livros:
            return None

        print(f"\nLivros recebidos para salvamento: {len(livros)}")

        # Remove ISBNs duplicados
        livros_unicos = {}
        for livro in livros:
            if not livro.isbn:
                continue
            livros_unicos[livro.isbn] = livro

        total_unicos = len(livros_unicos)
        print(f"Livros únicos: {total_unicos}")
        print(f"Duplicados removidos: {len(livros) - total_unicos}")

        dados = [
            self._converter_para_dict(livro)
            for livro in livros_unicos.values()
        ]

        respostas = []

        # Envio em lotes para evitar estouro de timeout/payload
        for i in range(0, total_unicos, tamanho_lote):
            lote = dados[i:i + tamanho_lote]
            resposta = (
                supabase
                .table("livros")
                .upsert(
                    lote,
                    on_conflict="isbn"
                )
                .execute()
            )
            respostas.append(resposta)
            progresso = min(i + tamanho_lote, total_unicos)
            print(f"  -> Lote enviado: {len(lote)} livros ({progresso}/{total_unicos})")

        print("Todos os lotes foram enviados com sucesso ao Supabase.")
        return respostas