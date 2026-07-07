from models.livro import Livro
from services.pipeline_enriquecimento import PipelineEnriquecimento


livros = [
    Livro(
        titulo="Pai Rico",
        isbn="9788550801483"
    ),
    Livro(
        titulo="Segredos da Mente Milionária",
        isbn="9788575422397"
    ),
    Livro(
        titulo="Harry Potter",
        isbn="9788532530783"
    ),
]

pipeline = PipelineEnriquecimento()

resultado = pipeline.executar(livros)

print("=" * 60)
print("ESTATÍSTICAS")
print("=" * 60)

print(f"Processados......: {resultado.processados}")
print(f"Encontrados......: {resultado.encontrados}")
print(f"Não encontrados..: {resultado.nao_encontrados}")

print("\nFontes:")

for fonte, quantidade in resultado.fontes.items():
    print(f"  {fonte}: {quantidade}")

print("\n" + "=" * 60)
print("LIVROS ENRIQUECIDOS")
print("=" * 60)

for livro in resultado.livros:
    print(f"- {livro.titulo}")