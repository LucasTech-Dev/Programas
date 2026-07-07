from parser import Parser
from services.pipeline_enriquecimento import PipelineEnriquecimento
from repositories.livros_repository import LivrosRepository


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

    print(f"{resultado.encontrados} livros enriquecidos.\n")

    print("Salvando no Supabase...")

    repositorio = LivrosRepository()

    repositorio.salvar_lote(resultado.livros)

    print("\n" + "=" * 60)
    print("PROCESSAMENTO FINALIZADO")
    print("=" * 60)

    print(f"Processados......: {resultado.processados}")
    print(f"Encontrados......: {resultado.encontrados}")
    print(f"Não encontrados..: {resultado.nao_encontrados}")

    print("\nFontes utilizadas:")

    for fonte, quantidade in resultado.fontes.items():
        print(f"  {fonte}: {quantidade}")

    print("\nLivros enviados para o Supabase com sucesso!")


if __name__ == "__main__":
    main()