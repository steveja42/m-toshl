/* eslint-disable @typescript-eslint/no-unused-vars */
/** @OnlyCurrentDoc */

const version = 36;
const appTitle = 'OptionsWhatIf'

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
function makeSheet(symbol, optionType, optionDates,strikeCount) {

  //log(`makeSheet-start ${symbol} : ${optionType} : ${optionDates} ${strikeCount} foo ${strikeCount >0}`)

  if (!symbol)
    throw new Error(`Symbol not entered`)
  if (!optionDates || optionDates.length < 1)
    throw new Error(`Choose at least one option expiration date.`)
  const startTime = new Date();
  const os = new OptionSheet(symbol.toUpperCase() as string, optionType as optionType, optionDates,strikeCount);
  SpreadsheetApp.setActiveSheet(os.sheet)
  const userProperties = PropertiesService.getUserProperties()
  let sheetsMadeCount = Number(userProperties.getProperty('sheetsMadeCount'))
  if (sheetsMadeCount) {
    sheetsMadeCount = sheetsMadeCount + 1
  }
  else
    sheetsMadeCount = 1
  log(`---🚀 made sheet # ${sheetsMadeCount} (in ${(new Date()).getTime() - startTime.getTime()} msecs) ${symbol} : ${optionType} : ${optionDates} ${strikeCount}`)
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






