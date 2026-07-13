from parser import Parser
from repositories.livros_repository import LivrosRepository
from exportador_json import ExportadorJson
from services.pipeline_enriquecimento import PipelineEnriquecimento


def main():

    print("=" * 60)
    print("CONVERSOR DE ISBN")
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

    print("Salvando livros enriquecidos no Supabase...")

    repositorio = LivrosRepository()

    repositorio.salvar_lote(resultado.livros)

    print("Supabase atualizado com sucesso.")

    print("\nGerando JSON dos livros não enriquecidos...")

    exportador = ExportadorJson()

    exportador.salvar(
        resultado.livros_nao_enriquecidos,
        "saida/nao_enriquecidos.json"
    )

    print("JSON gerado com sucesso.")

    print("\n" + "=" * 60)
    print("PROCESSAMENTO FINALIZADO")
    print("=" * 60)

    print(f"Processados.............: {resultado.processados}")
    print(f"Enriquecidos............: {resultado.encontrados}")
    print(f"Não enriquecidos........: {resultado.nao_encontrados}")
    print(f"Enviados ao Supabase....: {len(resultado.livros)}")
    print(f"Salvos no JSON..........: {len(resultado.livros_nao_enriquecidos)}")

    print("\nFontes utilizadas:")

    for fonte, quantidade in resultado.fontes.items():
        print(f"  {fonte}: {quantidade}")

    print("\nProcesso concluído com sucesso!")


if __name__ == "__main__":
    main()