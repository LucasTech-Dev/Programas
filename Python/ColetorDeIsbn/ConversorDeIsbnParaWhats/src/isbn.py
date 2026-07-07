import re


def limpar_isbn(texto: str) -> str:
    """
    Remove tudo que não for número ou X.
    """

    if not texto:
        return ""

    texto = texto.upper()

    return re.sub(r"[^0-9X]", "", texto)


def extrair_isbn(texto: str) -> str | None:
    """
    Procura um ISBN dentro de um texto.
    """

    padrao = r"(97[89][0-9\-\s]{10,20}|[0-9X\-\s]{10,20})"

    encontrados = re.findall(padrao, texto.upper())

    for encontrado in encontrados:

        isbn = limpar_isbn(encontrado)

        if len(isbn) in (10, 13):
            return isbn

    return None


def tipo_isbn(isbn: str) -> str:

    isbn = limpar_isbn(isbn)

    if len(isbn) == 10:
        return "ISBN-10"

    if len(isbn) == 13:
        return "ISBN-13"

    return "DESCONHECIDO"


def validar_isbn(isbn: str) -> bool:

    isbn = limpar_isbn(isbn)

    if len(isbn) == 10:
        return validar_isbn10(isbn)

    if len(isbn) == 13:
        return validar_isbn13(isbn)

    return False


def validar_isbn10(isbn: str) -> bool:

    if len(isbn) != 10:
        return False

    soma = 0

    for i in range(9):

        if not isbn[i].isdigit():
            return False

        soma += (10 - i) * int(isbn[i])

    ultimo = 10 if isbn[9] == "X" else int(isbn[9])

    soma += ultimo

    return soma % 11 == 0


def validar_isbn13(isbn: str) -> bool:

    if len(isbn) != 13 or not isbn.isdigit():
        return False

    soma = 0

    for i in range(12):

        numero = int(isbn[i])

        if i % 2 == 0:
            soma += numero
        else:
            soma += numero * 3

    digito = (10 - (soma % 10)) % 10

    return digito == int(isbn[12])