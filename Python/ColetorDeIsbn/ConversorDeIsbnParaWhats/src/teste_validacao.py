from isbn import validar_isbn

casos = [
    "9788550801483",
    "9788550801484",
    "8535914842",
    "8535914843",
]

for isbn in casos:
    print(isbn, "->", validar_isbn(isbn))