namespace DataSheet {
    type toshlEntry = {
        bankId: string;
        balanceCellAddress: string
    }

    const dataKey = "toshldata"
    function getDataSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        const ss = SpreadsheetApp.getActive()

        const sheetName = `${Utilities.formatDate(new Date(), "GMT-8", "yyyy-MM")}`;  // "GMT-8", "yyyy-MM-dd'T'HH:mm:ss"
        let sheet = ss.getSheetByName(sheetName);
        if (!sheet) {
            sheet = ss.insertSheet()
            sheet.setName(sheetName);
        }
        return sheet
    }
    function getToshlData(sheet: GoogleAppsScript.Spreadsheet.Sheet): toshlEntry[] {
        const allMetadata = sheet.getDeveloperMetadata()
        const toshlMetaData = allMetadata.find((md) => md.getKey() == dataKey)
        const val = toshlMetaData?.getValue()
        return val ? JSON.parse(val) : undefined
    }
    function setToshlData(sheet: GoogleAppsScript.Spreadsheet.Sheet, toshlData: toshlEntry[]) {
        const allMetadata = sheet.getDeveloperMetadata()
        const toshlMetaData = allMetadata.find((md) => md.getKey() == dataKey)
        if (toshlMetaData)
            toshlMetaData.setValue(JSON.stringify(toshlData))
        else
            sheet.addDeveloperMetadata(dataKey, JSON.stringify(toshlData))

    }
    export function addData(bankId: string, cellAddress: string, bankName: string, bankBalance: string): void {
        const sheet = getDataSheet()
        sheet.getRange(cellAddress).setValue(bankName)
        const balanceCellAddress = String.fromCharCode(cellAddress.charCodeAt(0) + 1) + cellAddress[1]
        sheet.getRange(balanceCellAddress).setValue(bankBalance)

        let toshlData = getToshlData(sheet)
        if (toshlData) {
            toshlData = toshlData.filter((entry=>entry.balanceCellAddress != balanceCellAddress))
            toshlData.push({ bankId, balanceCellAddress })
        }
        else {
            toshlData = [{ bankId, balanceCellAddress }]
        }
        setToshlData(sheet, toshlData)

    }
    export function syncData():void {
        const sheet = getDataSheet()
        const toshlData = getToshlData(sheet)
        for (const entry of toshlData) {
            const [bankName, bankBalance] = toshl.getAccount(entry.bankId)
            sheet.getRange(entry.balanceCellAddress).setValue(bankBalance)
        }
    }
}