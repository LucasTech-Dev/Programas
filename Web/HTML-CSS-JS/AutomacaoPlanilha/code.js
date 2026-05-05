function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const urlOrigem  = data.urlOrigem;
    const urlDestino = data.urlDestino;

    const ssOrigem  = SpreadsheetApp.openByUrl(urlOrigem);
    const abaOrigem = ssOrigem.getSheets()[0];

    const ssDestino  = SpreadsheetApp.openByUrl(urlDestino);
    const abaDestino = ssDestino.getSheets()[0];

    const dadosOrigem = abaOrigem.getDataRange().getValues();
    const headers = dadosOrigem[0].map(h => String(h).toLowerCase().trim());

    const idxPeca    = headers.indexOf("peça");
    const idxTamanho = headers.indexOf("tamanho");
    const idxRetirou = headers.indexOf("retirada");

    if ([idxPeca, idxTamanho, idxRetirou].includes(-1)) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, erro: "Colunas não encontradas. Encontradas: " + headers.join(", ") })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const contador = {};

    for (let i = 1; i < dadosOrigem.length; i++) {
      const linha   = dadosOrigem[i];
      const retirou = Number(linha[idxRetirou]);

      if (retirou === 1) continue; // já retirou → pula

      const peca    = String(linha[idxPeca]).trim().toLowerCase();
      const tamanho = String(linha[idxTamanho]).trim().toUpperCase();

      if (!peca || !tamanho) continue;

      const chave = tamanho + "|" + peca;
      contador[chave] = (contador[chave] || 0) + 1;
    }

    const ultimaLinha = abaDestino.getLastRow();
    const ultimaCol   = abaDestino.getLastColumn();

    const matrizDest   = abaDestino.getRange(1, 1, ultimaLinha, ultimaCol).getValues();
    const pecasDest    = matrizDest[0].slice(1).map(p => String(p).trim().toLowerCase());
    const tamanhosDest = matrizDest.slice(1).map(r => String(r[0]).trim().toUpperCase());

    for (let r = 0; r < tamanhosDest.length; r++) {
      if (!tamanhosDest[r]) continue;
      for (let c = 0; c < pecasDest.length; c++) {
        if (!pecasDest[c]) continue;
        const chave = tamanhosDest[r] + "|" + pecasDest[c];
        abaDestino.getRange(r + 2, c + 2).setValue(contador[chave] || 0);
      }
    }

    const total  = Object.values(contador).reduce((a, b) => a + b, 0);
    const grupos = Object.keys(contador).length;

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, total, grupos })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, erro: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}