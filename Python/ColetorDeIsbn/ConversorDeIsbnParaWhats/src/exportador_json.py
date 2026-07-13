import json
from pathlib import Path

from models.livro import Livro


class ExportadorJson:

    def salvar(self, livros: list[Livro], caminho: str):

        Path(caminho).parent.mkdir(parents=True, exist_ok=True)

        dados = []

        for livro in livros:

            dados.append(
                {
                    "titulo": livro.titulo,
                    "isbn": livro.isbn
                }
            )

        with open(caminho, "w", encoding="utf-8") as arquivo:

            json.dump(
                dados,
                arquivo,
                ensure_ascii=False,
                indent=4
            )

        print(f"{len(dados)} livros salvos em {caminho}") 