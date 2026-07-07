from parser import extrair_livros
from excel import gerar_planilha

livros = extrair_livros("entrada/conversa.txt")

gerar_planilha(livros)