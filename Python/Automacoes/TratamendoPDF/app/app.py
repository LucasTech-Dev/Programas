import os
import shutil
from pdf2image import convert_from_path
from PIL import Image
from fpdf import FPDF

PASTA_ORIGEM = "/home/lucassantanadias2008/Downloads/Professores-20260611T200122Z-3-001/Professores"
PASTA_SAIDA = "/home/lucassantanadias2008/Github/Programas/Python/Automacoes/TratamendoPDF/corrigidos"

os.makedirs(PASTA_SAIDA, exist_ok=True)

LIMITE_MB = 10
LIMITE_BYTES = LIMITE_MB * 1024 * 1024

def processar_pdfs(pasta_origem, pasta_saida):
    # Lista todos os PDFs e ordena alfabeticamente
    lista_pdfs = []
    for raiz, _, arquivos in os.walk(pasta_origem):
        for arquivo in arquivos:
            if arquivo.lower().endswith(".pdf"):
                lista_pdfs.append(os.path.join(raiz, arquivo))
    lista_pdfs = sorted(lista_pdfs)

    pasta_index = 1
    tamanho_atual = 0
    pasta_destino = os.path.join(pasta_saida, f"lote_{pasta_index}")
    os.makedirs(pasta_destino, exist_ok=True)

    for caminho_pdf in lista_pdfs:
        print(f"➡ Processando: {caminho_pdf}")
        pages = convert_from_path(caminho_pdf)
        output_pdf = FPDF(orientation="L")

        for page in pages:
            if page.height > page.width:
                page = page.rotate(90, expand=True)

            temp_img = "temp.jpg"
            page.save(temp_img, "JPEG")
            output_pdf.add_page()
            output_pdf.image(temp_img, x=0, y=0, w=297, h=210)

        nome_saida = f"corrigido_{os.path.basename(caminho_pdf)}"
        caminho_saida = os.path.join(pasta_destino, nome_saida)
        output_pdf.output(caminho_saida)

        tamanho_atual += os.path.getsize(caminho_saida)

        # Se passar de 10 MB, cria nova pasta
        if tamanho_atual >= LIMITE_BYTES:
            pasta_index += 1
            pasta_destino = os.path.join(pasta_saida, f"lote_{pasta_index}")
            os.makedirs(pasta_destino, exist_ok=True)
            tamanho_atual = 0

        print(f"✔ PDF corrigido salvo em: {caminho_saida}")

    print("✅ Todos os PDFs foram processados!")

if __name__ == "__main__":
    processar_pdfs(PASTA_ORIGEM, PASTA_SAIDA)
