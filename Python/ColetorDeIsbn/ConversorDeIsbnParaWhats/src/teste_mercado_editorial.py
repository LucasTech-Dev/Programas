from apis.mercado_editorial import MercadoEditorialAPI

api = MercadoEditorialAPI()

isbn = "9788550801483"

print(f"Testando ISBN: {isbn}\n")

resultado = api.consultar_isbn(isbn)

print(resultado)