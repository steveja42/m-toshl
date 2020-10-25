/* eslint-disable @typescript-eslint/no-unused-vars */
/** @OnlyCurrentDoc */

const version = 31;
const appTitle = 'OptionsWhatIf'

function test3() {
  makeSheet("slv","PUT", "2020-10-23")
}

function test2() {
  log('test called');
  const ss = SpreadsheetApp.getActive();
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


/**
 * Creates a menu entry in the Google Spreadsheet UI when the sheet is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {

  let ssName = '';
  if (e.authMode !== ScriptApp.AuthMode.NONE)
    ssName = SpreadsheetApp.getActive().getName()
  // log(`on open version ${version} authmode ${e.authMode} : ${ssName}`);

  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Start', 'showSidebar')
    // .addItem('TEST', 'test')
    .addToUi();


  if (e.authMode === ScriptApp.AuthMode.NONE) // addon not enabled for this document   AuthMode.LIMITED
    return
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
function showSidebar() {
  const ui = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle(appTitle);

  SpreadsheetApp.getUi().showSidebar(ui);
}


/**
 * Called by the sidebar to make a new option sheet
 *
 */
function makeSheet(symbol, optionType, optionDates) {

  log(`makeSheet-start ${symbol} : ${optionType} : ${optionDates}`)

  if (!symbol)
    throw new Error(`Symbol not entered`)
  if (!optionDates || optionDates.length < 1)
    throw new Error(`Choose at least one option expiration date.`)
  const startTime = new Date();
  const os = new OptionSheet(symbol.toUpperCase() as string, optionType as optionType, optionDates);
  SpreadsheetApp.setActiveSheet(os.sheet)
  const userProperties = PropertiesService.getUserProperties()
  let sheetsMadeCount = Number(userProperties.getProperty('sheetsMadeCount'))
  if (sheetsMadeCount) {
    sheetsMadeCount = sheetsMadeCount + 1
  }
  else
    sheetsMadeCount = 1
  log(`-------- makesheet made sheet # ${sheetsMadeCount} (in ${(new Date()).getTime() - startTime.getTime()} secs) ${symbol} : ${optionType} : ${optionDates}`)
  userProperties.setProperty('sheetsMadeCount', sheetsMadeCount.toString())
}

/**
 * Called by the sidebar to get the option expiration dates for a stock symbol
 *
 */
function getOptionDates(symbol) {
  const dates = tdApi.getOptionDates(symbol.toUpperCase());
  if (!dates) {
    throw new Error(`Option Chain not found for symbol: ${symbol}`)
  }
  // log(dates);
  return dates;
}


/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  log(`on install version ${version}`);
  onOpen(e);
}






