import os

from dotenv import load_dotenv
from google import genai


def main():
    # Carrega as variáveis do arquivo .env
    load_dotenv()

    # Obtém a API Key
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        print("ERRO: GEMINI_API_KEY não encontrada.")
        print("Verifique o arquivo .env")
        return

    # Cria o cliente Gemini
    client = genai.Client(api_key=api_key)

    print("=" * 50)
    print("             GEMINI CHAT")
    print("=" * 50)
    print("Digite 'sair' para encerrar.")
    print()

    while True:
        pergunta = input("Você: ")

        if pergunta.lower().strip() == "sair":
            print("\nEncerrando...")
            break

        if not pergunta.strip():
            continue

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=pergunta
            )

            print("\nGemini:")
            # Dependendo da versão do SDK, a forma de acessar o texto pode variar
            # Em muitas versões, response.text funciona; se não, imprima o objeto inteiro
            try:
                print(response.text)
            except Exception:
                print(response)
            print()

        except Exception as erro:
            print(f"\nErro: {erro}\n")


if __name__ == "__main__":
    main()
