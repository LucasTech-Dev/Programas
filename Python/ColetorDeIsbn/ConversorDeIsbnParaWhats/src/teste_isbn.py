from isbn import extrair_isbn, tipo_isbn

casos = [
    "9788550801483",
    "978-85-508-0148-3",
    "O Hobbit 9788595084742",
    "ISBN: 9788535914845"
]

for caso in casos:

    isbn = extrair_isbn(caso)

    print(caso)
    print("ISBN:", isbn)
    print("Tipo:", tipo_isbn(isbn))
    print("-" * 40)