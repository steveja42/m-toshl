var td = {

	tdClientId: 'SIRSNEEZ2@AMER.OAUTHAP',

	/**
	 * makes a call to the API represented by url, with no oauth2 authorization.
	 *
	 * @param {string} url the url for the api.
	 * @return response in JSON
	 */
	callTDAPI(url) {
		var options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
			method: 'get',
			muteHttpExceptions: true,
		};
		url += `&apikey=${encodeURIComponent(td.tdClientId)}`;

		try {
			var response = UrlFetchApp.fetch(url, options);
			if (!responseOK(response)) {
				log(`request failed with code:${response.getResponseCode()} ${response.getContentText()}`);
				return null;
			}
		}
		catch (e) {
			log(e);
			return null;
		}
		return JSON.parse(response.getContentText());

	}

}

function responseOK(response) {
	var code = response.getResponseCode();
	return (code >= 200 && code <= 299);
}