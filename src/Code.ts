/* eslint-disable @typescript-eslint/no-unused-vars */
/** @OnlyCurrentDoc */

const version = 1;
const appTitle = 'm-toshl'

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

  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Start', 'showSidebar')
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
 * Called by the sidebar to add toshl data to a sheet
 *
 */
function addToSheet(bankId: string, cellAddress: string) {

  if (!bankId)
    throw new Error(`No Bank ID`)
  if (!cellAddress)
    throw new Error(`No Cell Address`)

  const [bankName, bankBalance] = toshl.getAccount(bankId)
  DataSheet.addData(bankId, cellAddress, bankName, bankBalance)
}

/**
 * Called by the sidebar to get the option expiration dates for a stock symbol
 *
 */
function getAccounts(token) {
  const accounts = toshl.getAccounts(token)
  if (!accounts) {
    throw new Error(`Accounts not found for token: ${token}`)
  }
  return accounts;
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
  onOpen(e);
}






