function copySheetsAndModifyCells() {
  // スプレッドシートのURL
  const spreadsheetUrl = "";

  // スプレッドシートを開く
  const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);

  // ベースとなるシート（01シート）の参照を取得
  const baseSheet = spreadsheet.getSheetByName("01");

  // Infoシートの参照を取得
  const infoSheet = spreadsheet.getSheetByName("Info");

  // 02から50までのシートを作成・変更
  for (let i = 1; i <= 50; i++) {
    const sheetName = ("00" + i).slice(-2);

    // 01シートをコピーして新しいシートを作成
    const newSheet = spreadsheet.insertSheet(sheetName, { template: baseSheet });

    // B2セルとC2セルを変更
    newSheet.getRange("B2").setFormula("='Info'!B" + (i + 8));
    newSheet.getRange("C2").setFormula("='Info'!C" + (i + 8));

    // InfoシートのB(i+8)セルにもとからある文字列を取得
    const linkText = infoSheet.getRange("B" + (i + 8)).getValue();

    // 新しいシートへのリンクを設定
    const sheetUrl = spreadsheet.getUrl() + "#gid=" + newSheet.getSheetId();
    infoSheet.getRange("B" + (i + 8)).setFormula('=HYPERLINK("' + sheetUrl + '", "' + linkText + '")');
  }
}