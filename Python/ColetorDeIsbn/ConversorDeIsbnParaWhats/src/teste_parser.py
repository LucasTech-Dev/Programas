from parser import extrair_livros

livros = extrair_livros("entrada/conversa.txt")

print(f"{len(livros)} livros encontrados\n")

for livro in livros:
    print(livro)