from services.reprocessador_json import ReprocessadorJson


def main():

    caminho = "saida/nao_enriquecidos.json"

    reprocessador = ReprocessadorJson()

    reprocessador.executar(caminho)


if __name__ == "__main__":
    main()