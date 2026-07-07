from dataclasses import dataclass, field

@dataclass
class Relatorio:
    total_livros: int = 0
    isbn_validos: int = 0
    isbn_invalidos: int = 0
    isbn_duplicados: int = 0

    lista_invalidos: list[str] = field(default_factory=list)
    lista_duplicados: list[str] = field(default_factory=list)

    @property
    def exportados(self) -> int:
        return self.isbn_validos - self.isbn_duplicados

    def resumo(self) -> str:
        linhas = [
            "=" * 40,
            "RELATÓRIO DE PROCESSAMENTO",
            "=" * 40,
            f"Livros encontrados : {self.total_livros}",
            f"ISBN válidos       : {self.isbn_validos}",
            f"ISBN inválidos     : {self.isbn_invalidos}",
            f"Duplicados         : {self.isbn_duplicados}",
            f"Exportados         : {self.exportados}",
        ]

        if self.lista_invalidos:
            linhas.append("\nISBN inválidos:")
            linhas.extend(f" - {isbn}" for isbn in self.lista_invalidos)

        if self.lista_duplicados:
            linhas.append("\nISBN duplicados:")
            linhas.extend(f" - {isbn}" for isbn in self.lista_duplicados)

        return "\n".join(linhas)