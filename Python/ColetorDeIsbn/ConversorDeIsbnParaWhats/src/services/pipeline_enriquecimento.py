from models.resultado_pipeline import ResultadoPipeline
from models.livro_enriquecido import LivroEnriquecido
from services.enriquecedor import Enriquecedor


class PipelineEnriquecimento:

    def __init__(self):
        self.enriquecedor = Enriquecedor()

    def executar(self, livros):

        resultado = ResultadoPipeline()

        resultado.processados = len(livros)

        for livro in livros:

            resposta = self.enriquecedor.consultar(livro.isbn)

            # Livro encontrado em alguma API
            if resposta is not None:

                fonte, livro_enriquecido = resposta

                resultado.encontrados += 1

                resultado.livros.append(livro_enriquecido)

                resultado.fontes[fonte] = (
                    resultado.fontes.get(fonte, 0) + 1
                )

            # Nenhuma API encontrou o livro
            else:

                resultado.nao_encontrados += 1

                livro_minimo = LivroEnriquecido(
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

                resultado.livros.append(livro_minimo)

                resultado.fontes["local"] = (
                    resultado.fontes.get("local", 0) + 1
                )

        return resultado