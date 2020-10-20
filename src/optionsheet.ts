
enum optionType {
	put = "PUT",
	call = "CALL"
}


function refreshPrices() {

	let os = OptionSheet.fromExistingSheet(SpreadsheetApp.getActive().getActiveSheet());
	if (os) {
		os.sheet.getRange(OptionSheet.rowStartData, OptionSheet.columnStartData, os.sheet.getMaxRows(), OptionSheet.numColumns).clearContent()
		os.sheet.getRange(OptionSheet.rowStartData, OptionSheet.columnStartData, os.sheet.getMaxRows(), OptionSheet.numColumns).clearFormat()

		os.writeValues();
		var userProperties = PropertiesService.getUserProperties()
		let sheetsRefeshedCount = Number(userProperties.getProperty('sheetsRefeshedCount'))
		if (sheetsRefeshedCount) {
		  sheetsRefeshedCount = sheetsRefeshedCount + 1
		}
		else
		  sheetsRefeshedCount = 1
		log(`------ refreshPrices refresh # ${sheetsRefeshedCount}`)
		userProperties.setProperty('sheetsRefeshedCount', sheetsRefeshedCount.toString())
		//log(`refreshPrices: ${os.symbol} : ${this.type} : ${this.optionDates}`)

	}
	else {
		throw new Error(`Current tab is not an options sheet`)

	}
}

class OptionSheet {

	static readonly symbolCell = 'B2';
	static readonly underlyingLastCell = 'C2';
	static readonly rowStartData = 3;
	static readonly columnStartData = 1;
	static readonly numColumns = 8;
	static readonly metaDataKey = "42";

	constructor(private symbol: string, private type: optionType, private optionDates, public sheet?: GoogleAppsScript.Spreadsheet.Sheet) {

		if (sheet) //constructing from existing sheet
			return;
		var ss = SpreadsheetApp.getActive();
		let sheetName = `${symbol}-${type}(${Utilities.formatDate(new Date(), "GMT-8", "yyyy_MM_dd")})`;  //"GMT-8", "yyyy-MM-dd'T'HH:mm:ss"
		this.sheet = ss.getSheetByName(sheetName);
		if (!this.sheet) {
				
			this.sheet = makeTemplate(type, sheetName)

		}
		else {
			this.sheet.getRange(OptionSheet.rowStartData, OptionSheet.columnStartData, this.sheet.getMaxRows(), OptionSheet.numColumns).clearContent()
			this.sheet.getRange(OptionSheet.rowStartData, OptionSheet.columnStartData, this.sheet.getMaxRows(), OptionSheet.numColumns).clearFormat()
		}
		this.sheet.getRange(OptionSheet.symbolCell).setValue(symbol);
		this.sheet.addDeveloperMetadata(OptionSheet.metaDataKey, JSON.stringify({ symbol, type, optionDates }));
		this.writeValues();
	}

	static fromExistingSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet): OptionSheet {
		let metaData = sheet.getDeveloperMetadata().find(dmd => dmd.getKey() == this.metaDataKey);
		if (metaData) {
			let data = JSON.parse(metaData.getValue());
			return new OptionSheet(data.symbol, data.type, data.optionDates, sheet);
		}
		return null;
	}

	writeValues() {
		let startTime = new Date();

		let oChain = tdApi.getOptionChain(this.symbol, this.type);
		let expDates = (this.type == optionType.put) ? oChain.putExpDateMap : oChain.callExpDateMap;
		this.sheet.getRange(OptionSheet.underlyingLastCell).setValue(oChain.underlyingPrice);
		var values = [];
		let rowsToFormat = [];
		let iRow = OptionSheet.rowStartData;
		//Quote Time in Long last quote time in milliseconds since Epoch -The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT)
		//	Math.floor(new Date().getTime()/1000.0) getTime() returns time in milliseconds.
		for (let date of this.optionDates) {
			let dateKey = Object.keys(expDates).find(el => el.slice(0, 9).localeCompare(date.slice(0, 9)) == 0);  //should be slice(0,10)??
			if (!dateKey) {
				values.push(['', `expiration date ${date} not found`, '', '', '', '', '', '',]);
				rowsToFormat.push(iRow++);
			}
			else {
				values.push(['', date, '', '', '', '', '', '',]);
				rowsToFormat.push(iRow++);
				//var addedDate = sheet.getRange(1,1).getValue();
				  //var addedTime = Utilities.formatDate(addedDate, SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "hh:mm a");  "GMT-8"
				let tz = SpreadsheetApp.getActive().getSpreadsheetTimeZone()
				log(`------ writeValues timezone for ss ${SpreadsheetApp.getActive()} is  ${tz? tz:"null"}`)
				let data = Object.entries(expDates[dateKey]).map(([strike, value]) => [strike, Utilities.formatDate(new Date(value[0].quoteTimeInLong), tz, "MMM-dd' 'HH:mm:ss"), value[0].last, value[0].markChange, value[0].bid, value[0].ask, value[0].totalVolume, value[0].openInterest]);
				iRow += data.length;
				values = values.concat(data);
			}
		}
		this.sheet.getRange(OptionSheet.rowStartData, OptionSheet.columnStartData, values.length, OptionSheet.numColumns).setValues(values);
		for (let row of rowsToFormat) {
			this.sheet.getRange(row, 2)
				.setFontWeight("bold")
				.setFontSize(12);
		}
		log(`writeValues: (${(new Date()).getTime() - startTime.getTime()} secs) : ${this.symbol} ${this.type} : ${this.optionDates}`)

	}


}