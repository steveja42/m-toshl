const version = 20;
const TemplateSpreadsheetId = '1ekcaoWlal3tVLlTQRpgZJHaNGZPgDdAMq0Ikizo4vps';
//Document 1ekcaoWlal3tVLlTQRpgZJHaNGZPgDdAMq0Ikizo4vps is missing (perhaps it was d
// https://docs.google.com/spreadsheets/d/1ekcaoWlal3tVLlTQRpgZJHaNGZPgDdAMq0Ikizo4vps/edit?usp=sharing
const runAsAddon = true;
const mainSheetName = 'OptionsWhatIf';
const symbolCell = 'B3';
const putCallCell = 'D3';
const MaxOptionDates = 21;
const OptionDatesRow = 3;
const OptionDatesCol = 6;
const appTitle = 'OptionsWhatIf'

function test() {
  log('test called');
  //last('C');
  var activeSheet = SpreadsheetApp.getActive().getActiveSheet();
  //displayOptionDates(activeSheet, activeSheet.getRange(symbolCell).getValue())
  show();
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
  log(`on open version ${version}`);
  if (runAsAddon) {
    SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Initialize', 'initializeAddon')
      .addItem('TEST', 'test')
      .addToUi();
  }
  else {
    SpreadsheetApp.getUi()
      .createMenu('testOptionsWhatIf')
      .addItem('Initialize', 'initializeAddon')
      .addItem('TEST', 'test')
      .addToUi();
  }
}

function ExampleArray(){
  var tempArr = [['this', 'part', 'of', 'the', 'array', 'for', 'the', 'select'], []];
  return tempArr;
  }
  
/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle(appTitle);
      SpreadsheetApp.getUi().showSidebar(ui);
}


function show() {
  log(`show was called`);
  var sheet = SpreadsheetApp.getActive().getActiveSheet();
  let ranges = sheet.getActiveRangeList().getRanges();
  let optionDates = [];
  ranges.forEach(range => {
    if (range.getColumn() == OptionDatesCol && range.getRow() >= OptionDatesRow) {
      for (let i = 1; i <= range.getNumRows(); i++) {
        let value = range.getCell(i, 1).getValue();
        log(value); 
        if (value = formatDate(<Date>value))
          optionDates.push(value);
      }
    }
  });
  if (optionDates.length == 0) {
    alert(`Choose at least one option expiration date`)
    return
  }
  log(`${optionDates}`);
  let os = new OptionSheet((<string>sheet.getRange(symbolCell).getValue()).toUpperCase(), <optionType>sheet.getRange(putCallCell).getValue(), optionDates);
  // log(tdApi.getOptionChain(activeSheet.getRange(symbolCell).getValue(), activeSheet.getRange(putCallCell).getValue()));

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

/**
 * does init that requires full auth- Creates a trigger for when a spreadsheet is edited.
 */
function initializeAddon() {
  log(`initializing Addon version ${version}`);

  showSidebar();
  let ss = SpreadsheetApp.getActive();
  if (ss.getSheetByName(mainSheetName)) {
    alert(`There is already a sheet named ${mainSheetName}. Please rename or delete it and then try again if you want to make a new one.`)
    return
  }


  let source = SpreadsheetApp.openById(TemplateSpreadsheetId);
  let newSheet = source.getSheetByName(mainSheetName).copyTo(ss);
  newSheet.setName(mainSheetName);
  newSheet.activate();
  createOnEditTrigger('onEditByTrigger');

}

function createOnEditTrigger(fnName) {

  log('Current project has ' + ScriptApp.getProjectTriggers().length + ' triggers.');
  var ss = SpreadsheetApp.getActive();
  var triggers = ScriptApp.getUserTriggers(ss);
  var triggerExists = false;

  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === fnName) {
      triggerExists = true;
      log(`existing  onEdit trigger found`)
      break;
    }
  }

  if (!triggerExists) {
    ScriptApp.newTrigger(fnName)
      .forSpreadsheet(ss)
      .onEdit()
      .create();
    //ScriptApp.newTrigger(fnName).timebase().everyHours(1).create;
  }

}
function onEditByTrigger(e) {

  var activeSheet: GoogleAppsScript.Spreadsheet.Sheet = e.source.getActiveSheet();
  var range = e.range;
  //if (range.getA1Notation()  == "C1" sheet.getName() == "Send Auto     Emails")  
  log(`onEditTrigger: ${activeSheet.getName()} ${e.range.getA1Notation()} ${e.oldValue} -> ${e.value}`);
  if (activeSheet.getName() != mainSheetName)
    return;
  switch (e.range.getA1Notation()) {
    case symbolCell:
      displayOptionDates(activeSheet, e.value);
      break;
    case putCallCell:
      break;

  }
}

function displayOptionDates(activeSheet, symbol) {
  let dates = tdApi.getOptionDates(symbol.toUpperCase());
  if (dates) {
    var values = dates.map(date => [date]);
    activeSheet.getRange(OptionDatesRow, OptionDatesCol, dates.length).setValues(values);
  }
  else {
    activeSheet.getRange(OptionDatesRow, OptionDatesCol, MaxOptionDates).clearContent();
    alert(`Option Chain not found for symbol: ${symbol}`);
  }

}

/**
 *gets the last price, delayed, of the input symbol(s).
 *
 * @param {string} input The symbol to fetch.
 * @return The last price of the input symbol(s)
 * @customfunction
 */
function last(input) {
  log(input);
  if (!input.map) {
    //url = url+input.toUpperCase();
    var data = tdApi.last(input.toUpperCase());
    return data[input].lastPrice;
  }
  //input is array
  var symbols = [];
  var output = [];
  symbols = input.map(function (x: any) { return (x.map ? x[0].toUpperCase() : x.toUpperCase()) });
  //url = url + symbols.join();
  var data = tdApi.last(symbols.join());
  //output = Object.keys(data).map(function(x) { return data[x].lastPrice});
  output = symbols.map(function (x) { return (data[x] ? data[x].lastPrice : "error") });
  log(output);
  return output;
}



