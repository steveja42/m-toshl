
const numColumns = 23

let templates = [
	{
		name: 'putTemplate',
		headers: [["Strike Price", "Expiration Date / Last Quote Time", "Last", "Chg", "Bid", "Ask", "Vol", "Open Interest", "Price", "Break Even", "If Price Drops →", "=LastPrice* (1-M1)", 0.1, "=LastPrice* (1-O1)", 0.33, "=LastPrice* (1-Q1)", 0.5, "=LastPrice* (1-S1)", 0.66, "=LastPrice* (1-U1)", 0.9, "=LastPrice* (1-W1)", 1], ["", "", 100, "", "", "", "", "", "", "", "", "Profit", "ROI", "Profit", "ROI", "Profit", "ROI", "Profit", "ROI", "Profit", "ROI", "Profit", "ROI"]]
		, datarow: ["", "", "", "", "", "", "", "", "=IF(AND(ISNUMBER(putTemplate!Bid),ISNUMBER(putTemplate!Ask)),(putTemplate!Ask-putTemplate!Bid)/2 +putTemplate!Bid, IF(ISNUMBER(putTemplate!Last), putTemplate!Last,\"\"))", "=IF(AND(ISNUMBER(putTemplate!Strike_Price),ISNUMBER(putTemplate!Price)),putTemplate!Strike_Price-putTemplate!Price,\"\")", "", "=IF(ISNUMBER(putTemplate!Break_Even),putTemplate!Break_Even-L$1,\"\")", "=IF(ISNUMBER(L3),L3/putTemplate!Price,\"\")", "=IF(ISNUMBER(putTemplate!Break_Even),putTemplate!Break_Even-N$1,\"\")", "=IF(ISNUMBER(N3),N3/putTemplate!Price,\"\")", "=IF(ISNUMBER(putTemplate!Break_Even),putTemplate!Break_Even-P$1,\"\")", "=IF(ISNUMBER(P3),P3/putTemplate!Price,\"\")", "=IF(ISNUMBER(putTemplate!Break_Even),putTemplate!Break_Even-R$1,\"\")", "=IF(ISNUMBER(R3),R3/putTemplate!Price,\"\")", "=IF(ISNUMBER(putTemplate!Break_Even),putTemplate!Break_Even-T$1,\"\")", "=IF(ISNUMBER(T3),T3/putTemplate!Price,\"\")", "=IF(ISNUMBER(putTemplate!Break_Even),putTemplate!Break_Even-V$1,\"\")", "=IF(ISNUMBER(V3),V3/putTemplate!Price,\"\")"]
		// , datarow: ["", "", "", "", "", "", "", "", "=IF(AND(ISNUMBER(Bid),ISNUMBER(Ask)),(Ask-Bid)/2 +Bid, IF(ISNUMBER(Last), Last,\"\"))", "=IF(AND(ISNUMBER(Strike_Price),ISNUMBER(Price)),Strike_Price-Price,\"\")", "", "=IF(ISNUMBER(Break_Even),Break_Even-L$1,\"\")", "=IF(ISNUMBER(L3),L3/Price,\"\")", "=IF(ISNUMBER(Break_Even),Break_Even-N$1,\"\")", "=IF(ISNUMBER(N3),N3/Price,\"\")", "=IF(ISNUMBER(Break_Even),Break_Even-P$1,\"\")", "=IF(ISNUMBER(P3),P3/Price,\"\")", "=IF(ISNUMBER(Break_Even),Break_Even-R$1,\"\")", "=IF(ISNUMBER(R3),R3/Price,\"\")", "=IF(ISNUMBER(Break_Even),Break_Even-T$1,\"\")", "=IF(ISNUMBER(T3),T3/Price,\"\")", "=IF(ISNUMBER(Break_Even),Break_Even-V$1,\"\")", "=IF(ISNUMBER(V3),V3/Price,\"\")"]
		, columnWidths: [50, 124, 51, 40, 40, 40, 28, 61, 54, 50, 55, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58]

	},
	{
		name: 'callTemplate',
		headers: [["Strike Price", "Expiration Date / Last Quote Time", "Last", "Chg", "Bid", "Ask", "Vol", "Open Interest", "Price", "Break Even", "If Price Goes Up →", "=LastPrice* (1+M1)", 0.1, "=LastPrice* (1+O1)", 0.33, "=LastPrice* (1+Q1)", 0.5, "=LastPrice* (1+S1)", 0.66, "=LastPrice* (1+U1)", 0.9, "=LastPrice* (1+W1)", 1], ["", "", 100, "", "", "", "", "", "", "", "", "Profit", "ROI", "Profit", "ROI", "Profit", "ROI", "Profit", "ROI", "Profit", "ROI", "Profit", "ROI"]]
		, datarow: ["", "", "", "", "", "", "", "", "=IF(AND(ISNUMBER(callTemplate!Bid),ISNUMBER(callTemplate!Ask)),(callTemplate!Ask-callTemplate!Bid)/2 +callTemplate!Bid, IF(ISNUMBER(callTemplate!Last), callTemplate!Last,\"\"))", "=IF(AND(ISNUMBER(callTemplate!Strike_Price),ISNUMBER(callTemplate!Price)),callTemplate!Price+callTemplate!Strike_Price,\"\")", "", "=IF(ISNUMBER(callTemplate!Break_Even),L$1-callTemplate!Break_Even,\"\")", "=IF(ISNUMBER(L3),L3/callTemplate!Price,\"\")", "=IF(ISNUMBER(callTemplate!Break_Even),N$1-callTemplate!Break_Even,\"\")", "=IF(ISNUMBER(N3),N3/callTemplate!Price,\"\")", "=IF(ISNUMBER(callTemplate!Break_Even),P$1-callTemplate!Break_Even,\"\")", "=IF(ISNUMBER(P3),P3/callTemplate!Price,\"\")", "=IF(ISNUMBER(callTemplate!Break_Even),R$1-callTemplate!Break_Even,\"\")", "=IF(ISNUMBER(R3),R3/callTemplate!Price,\"\")", "=IF(ISNUMBER(callTemplate!Break_Even),T$1-callTemplate!Break_Even,\"\")", "=IF(ISNUMBER(T3),T3/callTemplate!Price,\"\")", "=IF(ISNUMBER(callTemplate!Break_Even),V$1-callTemplate!Break_Even,\"\")", "=IF(ISNUMBER(V3),V3/callTemplate!Price,\"\")"]
		// , datarow: ["", "", "", "", "", "", "", "", "=IF(AND(ISNUMBER(Bid),ISNUMBER(Ask)),(Ask-Bid)/2 +Bid, IF(ISNUMBER(Last), Last,\"\"))", "=IF(AND(ISNUMBER(Strike_Price),ISNUMBER(Price)),Price-Strike_Price,\"\")", "", "=IF(ISNUMBER(Break_Even),L$1-Break_Even,\"\")", "=IF(ISNUMBER(L3),L3/Price,\"\")", "=IF(ISNUMBER(Break_Even),N$1-Break_Even,\"\")", "=IF(ISNUMBER(N3),N3/Price,\"\")", "=IF(ISNUMBER(Break_Even),P$1-Break_Even,\"\")", "=IF(ISNUMBER(P3),P3/Price,\"\")", "=IF(ISNUMBER(Break_Even),R$1-Break_Even,\"\")", "=IF(ISNUMBER(R3),R3/Price,\"\")", "=IF(ISNUMBER(Break_Even),T$1-Break_Even,\"\")", "=IF(ISNUMBER(T3),T3/Price,\"\")", "=IF(ISNUMBER(Break_Even),V$1-Break_Even,\"\")", "=IF(ISNUMBER(V3),V3/Price,\"\")"]
		, columnWidths: [50, 124, 51, 40, 40, 40, 28, 61, 54, 50, 55, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58]

	},
]


const columnsToName = ["Strike_Price", "", "Last", "Chg", "Bid", "Ask", "", "", "Price", "Break_Even"];
const colLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];


function makeTemplate(type: optionType, sheetName) {
	const index = (type === optionType.put) ? 0 : 1;
	return makeTemplateSheet(templates[index], sheetName)

}

function makeTemplateSheet(template, sheetName) {
	const ss = SpreadsheetApp.getActive();
	const sheet = ss.insertSheet()
	sheet.setName(sheetName);
	const regex1 = /[-()]/g;
	const namedRangePrefix = sheetName.replace(regex1, '_')
	// log(namedRangePrefix)
	ss.setNamedRange(`${namedRangePrefix}_LastPrice`, sheet.getRange('C2'));
	columnsToName.forEach((value, index) => {
		(value) ? ss.setNamedRange(`${namedRangePrefix}_${value}`, sheet.getRange(`${colLetters[index]}:${colLetters[index]}`)) : ""
	})

	for (let i = 1; i <= numColumns; i++) {
		sheet.setColumnWidth(i, Number(template.columnWidths[i - 1]))
	}

	const regex = new RegExp(`${template.name}!`, 'g')
	const dataRow = template.datarow.map(val => val.replace(regex, `${namedRangePrefix}_`))
	// log(dataRow)
	const values = Array(3) // 1000)
	values[0] = template.headers[0].map(val => val.replace ? val.replace(`LastPrice`, `${namedRangePrefix}_LastPrice`) : val)
	values[1] = template.headers[1]
	values[2] = dataRow
	/*
	for (let i = 2; i < 1000; i++) {
		values[i] = template.datarow; 	//putHeaderValues.push
	}
	*/
	sheet.getRange(1, 1, 3, 23).setValues(values)
	sheet.getRange('3:3').copyTo(sheet.getRange('4:1000'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false)  // PASTE_NORMAL PASTE_FORMULA
	// sheet.getRange(3, 1, 1, 23).copyValuesToRange(sheet, 1, 23, 4, 1000)
	format(ss, sheet)
	return sheet;
}


function format(spreadsheet, sheet) {
	sheet.setRowHeight(1, 52);
	sheet.setRowHeight(2, 30);

	spreadsheet.getRange('1:1').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
	spreadsheet.getRangeList(['A1:L1', 'N1', 'P1', 'R1', 'T1', 'V1', 'L2', 'N2', 'P2', 'R2', 'T2', 'V2', 'C2'])
		.setFontWeight('bold');
	/*
	spreadsheet.getRangeList(['L1', 'N1', 'P1', 'R1', 'T1', 'V1'])
		.setNumberFormat('#,##0.00');
	spreadsheet.getRangeList(['M1', 'O1', 'Q1', 'S1', 'U1', 'W1']) //(['M1', 'O1', 'Q1', 'S1', 'U1', 'W1']
		.setNumberFormat('0%');
*/
spreadsheet.getRangeList(['C:F', 'I:L', 'N:N', 'P:P', 'R:R', 'T:T', 'V:V'])
.setNumberFormat('#,##0.00');

	// light blue and gray columns
	spreadsheet.getRangeList(['L:L', 'N:N', 'P:P', 'R:R', 'T:T', 'V:V'])
		.setBackground('#d9d9d9')  // '#cccccc');
	spreadsheet.getRangeList(['M:M', 'O:O', 'Q:Q', 'S:S', 'U:U', 'W:W'])
		.setBackground('#deeaf6')
		.setNumberFormat('0%')

	// light gray top
	spreadsheet.getRangeList(['K1', 'L1:W2']).setBackground('#efefef');

	spreadsheet.getRangeList(['L:M', 'N:O', 'P:Q', 'R:S', 'T:U', 'V:W'])
		.setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);
	spreadsheet.getRange('K1:W1')
		.setBorder(true, null, null, null, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID_THICK);

	spreadsheet.getRange('K1')
		.setBorder(null, true, true, false, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);

	sheet.setFrozenRows(2);
};