namespace toshl {

  export function getAccounts(newToken = null):[[string,string]] {
    const token = '6c0e06f8-3f67-4150-8043-539c549e1b9da6a1cf7c-7f88-4e67-9a7a-c2e864906151' //PropertiesService.getScriptProperties().getProperty("TOSHL_TOKEN");

    const url = "https://api.toshl.com/accounts";
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "get",
      headers: { "Authorization": "Basic " + Utilities.base64Encode(token + ":") }
    };
    const response = UrlFetchApp.fetch(url, options);
    const data = response.getContentText();
    const accounts = JSON.parse(data);

    return accounts.map(x => [x.name, x.id])
  }

  export function getAccount(bankId):[string,string] {
    const token = '6c0e06f8-3f67-4150-8043-539c549e1b9da6a1cf7c-7f88-4e67-9a7a-c2e864906151' //PropertiesService.getScriptProperties().getProperty("TOSHL_TOKEN");

    const url = `https://api.toshl.com/accounts/${bankId}`;
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "get",
      headers: { "Authorization": "Basic " + Utilities.base64Encode(token + ":") }
    };
    const response = UrlFetchApp.fetch(url, options);
    const data = response.getContentText();
    const account = JSON.parse(data);

    return [account.name, account.balance]
  }
}