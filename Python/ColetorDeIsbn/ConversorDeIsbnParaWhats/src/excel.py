from pathlib import Path

import pandas as pd

from models.livro import Livro


def gerar_planilha(livros: list[Livro], caminho_saida: str = "saida/livros_iniciais.xlsx"):
    """
    Gera uma planilha Excel contendo os livros encontrados.
    """

    # Garante que a pasta exista
    Path(caminho_saida).parent.mkdir(parents=True, exist_ok=True)

    dados = []

    for livro in livros:
        dados.append(livro.to_dict())

    df = pd.DataFrame(dados)

    df.to_excel(
        caminho_saida,
        index=False
    )

    print(f"\nPlanilha criada com sucesso:")
    print(caminho_saida)