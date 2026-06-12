import os
from pdf2image import convert_from_path
from PIL import Image
from fpdf import FPDF

PASTA_ORIGEM = "/home/lucassantanadias2008/Downloads/Professores-20260611T200122Z-3-001/Professores"
PASTA_SAIDA = "/home/lucassantanadias2008/Github/Programas/Web/HTML-CSS-JS/TratamendoPDF/corrigidos"

os.makedirs(PASTA_SAIDA, exist_ok=True)

def processar_pdfs(pasta_origem, pasta_saida):
    total_pdfs = 0

    for raiz, _, arquivos in os.walk(pasta_origem):
        for arquivo in arquivos:
            if arquivo.lower().endswith(".pdf"):
                total_pdfs += 1
                caminho_pdf = os.path.join(raiz, arquivo)
                print(f"➡ Processando: {caminho_pdf}")

                pages = convert_from_path(caminho_pdf)
                output_pdf = FPDF(orientation="L")  # força modo Landscape (horizontal)

                for page in pages:
                    # Se a página estiver em pé, gira 90° para ficar horizontal
                    if page.height > page.width:
                        page = page.rotate(90, expand=True)

                    temp_img = "temp.jpg"
                    page.save(temp_img, "JPEG")
                    output_pdf.add_page()
                    # Ajusta para tamanho A4 horizontal
                    output_pdf.image(temp_img, x=0, y=0, w=297, h=210)

                # Mantém estrutura de pastas na saída
                subpasta_relativa = os.path.relpath(raiz, pasta_origem)
                pasta_destino = os.path.join(pasta_saida, subpasta_relativa)
                os.makedirs(pasta_destino, exist_ok=True)

                caminho_saida = os.path.join(pasta_destino, f"corrigido_{arquivo}")
                output_pdf.output(caminho_saida)
                print(f"✔ PDF corrigido salvo em: {caminho_saida}")

    print(f"📂 Total de PDFs processados: {total_pdfs}")
    print("✅ Todos os PDFs foram processados!")

if __name__ == "__main__":
    processar_pdfs(PASTA_ORIGEM, PASTA_SAIDA)
