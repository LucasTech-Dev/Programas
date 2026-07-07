from models.resultado_pipeline import ResultadoPipeline
from services.enriquecedor import Enriquecedor


class PipelineEnriquecimento:

    def __init__(self):
        self.enriquecedor = Enriquecedor()

    def executar(self, livros):

        resultado = ResultadoPipeline()

        resultado.processados = len(livros)

        for livro in livros:

            resposta = self.enriquecedor.consultar(livro.isbn)

            if resposta is None:
                resultado.nao_encontrados += 1
                continue

            fonte, livro_enriquecido = resposta

            resultado.encontrados += 1

            resultado.livros.append(livro_enriquecido)

            resultado.fontes[fonte] = (
                resultado.fontes.get(fonte, 0) + 1
            )

        return resultado