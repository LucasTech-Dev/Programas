import re


def limpar_texto(texto: str) -> str:
    """
    Remove espaços extras e caracteres invisíveis.
    """

    if not texto:
        return ""

    texto = texto.replace("\u200b", "")   # Zero Width Space
    texto = texto.replace("\ufeff", "")   # BOM
    texto = texto.replace("\t", " ")

    # Remove espaços duplicados
    texto = re.sub(r"\s+", " ", texto)

    return texto.strip()


def limpar_linha(linha: str) -> str:
    """
    Limpa uma única linha mantendo apenas o conteúdo útil.
    """

    linha = limpar_texto(linha)

    return linha


def remover_emojis(texto: str) -> str:
    """
    Remove a maioria dos emojis.
    """

    emoji = re.compile(
        "["
        "\U0001F600-\U0001F64F"
        "\U0001F300-\U0001F5FF"
        "\U0001F680-\U0001F6FF"
        "\U0001F700-\U0001F77F"
        "\U0001F780-\U0001F7FF"
        "\U0001F800-\U0001F8FF"
        "\U0001F900-\U0001F9FF"
        "\U0001FA00-\U0001FAFF"
        "\U00002700-\U000027BF"
        "]+",
        flags=re.UNICODE,
    )

    return emoji.sub("", texto)


def normalizar_linha(linha: str) -> str:
    """
    Aplica toda a limpeza necessária em uma linha.
    """

    linha = remover_emojis(linha)
    linha = limpar_linha(linha)

    return linha