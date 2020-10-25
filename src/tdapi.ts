const tdApi = {

	/**
	 * makes a call to the API represented by url, with no oauth2 authorization.
	 *
	 * @param {string} url the url for the api.
	 * @return response in JSON
	 */
	last(symbols) {
		const url = `https://api.tdameritrade.com/v1/marketdata/quotes?symbol=${symbols}`;
		// symbols = `&symbol=` + symbols;
		return td.callTDAPI(url);

	},

	getOptionChain(symbol, contractType) {
		const url = `https://api.tdameritrade.com/v1/marketdata/chains?symbol=${symbol}&contractType=${contractType}&includeQuotes=TRUE&strikeCount=40`
		return td.callTDAPI(url);
	},

	getOptionDates(symbol) {
		const url = `https://api.tdameritrade.com/v1/marketdata/chains?symbol=${symbol}&contractType=PUT&strikeCount=1`
		const result = td.callTDAPI(url);
		if (! result || result.status === 'FAILED')
			return null;
		let optionDates = Object.keys(result.putExpDateMap);
		optionDates = optionDates.map(key => key.slice(0, key.indexOf(':')));
		return optionDates;
	},

}