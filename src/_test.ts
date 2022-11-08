let ssTest 

function test3() {
  // have to add "https://www.googleapis.com/auth/spreadsheets" to oauthScopes in appscript.json for openById to work
  ssTest = SpreadsheetApp.openById("1U8D9MFSIXTnD8Q_H8Xrj3OBkt5dkT_JhSB9-Da39DBM")
  SpreadsheetApp.setActiveSpreadsheet(ssTest)
  const foo = SpreadsheetApp.getActive();
  const sym = "UNG"
  const optDate = "2022-12-23"
  makeSheet(sym,"PUT",[optDate],1) 
  makeSheet(sym,"PUT",[optDate],5) 
  refreshPrices() 
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/** @OnlyCurrentDoc */

function test2() {
  log('test called');
  ssTest = SpreadsheetApp.getActive();
  let label = 'insert'
  console.time(label)

  const sheet = ss.insertSheet()
  console.timeEnd(label)
  label = 'copy'
  console.time(label)

  sheet.copyTo(ss)
  console.timeEnd(label)

  return
  const namedRanges = SpreadsheetApp.getActiveSpreadsheet().getNamedRanges();
  for (const nr of namedRanges) {
    log(`${nr.getName()} - ${nr.getRange().getA1Notation()}`)
  }
}
function test() {
  const label = 'makeputTemplate'
  const sheetName = 'test'
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(sheetName);
  if (sheet)
    ss.deleteSheet(sheet)
  console.time(label)
  sheet = makeTemplate(optionType.put, 'test');
  console.timeEnd(label)
}

