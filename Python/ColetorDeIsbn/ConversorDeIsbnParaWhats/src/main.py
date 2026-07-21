from pathlib import Path

from parser import Parser
from repositories.livros_repository import LivrosRepository
from exportador_json import ExportadorJson
from services.pipeline_enriquecimento import PipelineEnriquecimento
from services.reprocessador_json import ReprocessadorJson


def executar_pipeline_principal():
    print("=" * 60)
    print("CONVERSOR DE ISBN - PIPELINE PRINCIPAL")
    print("=" * 60)

    caminho = "entrada/conversa.txt"

    print("\nLendo arquivo...")
    parser = Parser()
    livros = parser.executar(caminho)

    print(f"{len(livros)} livros encontrados.\n")
    print("Enriquecendo informações...")

    pipeline = PipelineEnriquecimento()
    resultado = pipeline.executar(livros)

    print(f"{resultado.encontrados} livros enriquecidos.")
    print(f"{resultado.nao_encontrados} livros não enriquecidos.\n")

    print("Salvando livros no Supabase...")
    repositorio = LivrosRepository()
    repositorio.salvar_lote(resultado.livros)

    print("\nGerando JSON dos livros não enriquecidos...")
    exportador = ExportadorJson()
    exportador.salvar(
        resultado.livros_nao_enriquecidos,
        "saida/nao_enriquecidos.json"
    )

    print("\n" + "=" * 60)
    print("PROCESSAMENTO FINALIZADO")
    print("=" * 60)
    print(f"Processados.............: {resultado.processados}")
    print(f"Enriquecidos............: {resultado.encontrados}")
    print(f"Não enriquecidos........: {resultado.nao_encontrados}")
    print(f"Enviados ao Supabase....: {len(resultado.livros)}")
    print(f"Salvos no JSON..........: {len(resultado.livros_nao_enriquecidos)}")


def executar_reprocessamento():
    print("=" * 60)
    print("REPROCESSAMENTO DE LIVROS NÃO ENRIQUECIDOS")
    print("=" * 60)

    caminho_json = "saida/nao_enriquecidos.json"

    if not Path(caminho_json).exists():
        print(f"Arquivo '{caminho_json}' não encontrado para reprocessamento.")
        return

    reprocessador = ReprocessadorJson()
    reprocessador.executar(caminho_json)


def main():
    # Executa o reprocessamento dos 877 livros restantes do JSON
    executar_reprocessamento()


if __name__ == "__main__":
    main()