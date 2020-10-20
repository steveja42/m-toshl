todo:
log spreadsheet name in makesheet
log only first time opened - less logging
get verified by google- ip
add feedback link-   https://resultify.live/optionswhatif/feedback


npm install -g @google/clasp
clasp clone <script id>
npm install --save @types/google-apps-script
make .claspignore
  	jsconfig.json
	**/node_modules/**
clasp push --watch

 style="width: 150px;"
issues:

	
solved
call/put tempates need more rows - 800
show needs to check input
wide auth

https://www.googleapis.com/auth/script.container.ui
https://www.googleapis.com/auth/script.external_request
https://www.googleapis.com/auth/spreadsheets.currentonly
https://www.googleapis.com/auth/userinfo.email

// The code below gets the values for the range C2:G8
// in the active spreadsheet.  Note that this is a JavaScript array.
var values = SpreadsheetApp.getActiveSheet().getRange(2, 3, 6, 4).getValues();
Logger.log(values[0][0]);



Addon 
{"scriptId":"1cK_5DahOhYaomdxQ_xn9WvWoD1noKykrQCa-x9IVgVwHgIvlN9FxHl27"}

Shows potential profits from stock options that you specify.

select menu  item Add-ons-> OptionsWhatIf->Initialize 



/**
 * @OnlyCurrentDoc Limits the script to only accessing the current sheet.
 */

,
  "oauthScopes": [
	  	 "https://www.googleapis.com/auth/spreadsheets.currentonly",
    "https://www.googleapis.com/auth/userinfo.email",
	 "https://www.googleapis.com/auth/script.external_request",
	 "https://www.googleapis.com/auth/script.scriptapp",
	     "https://www.googleapis.com/auth/spreadsheets"
  ]


 "oauthScopes": [
    "https://www.googleapis.com/auth/gmail.addons.execute",
    "https://www.googleapis.com/auth/gmail.addons.current.message.metadata",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/script.locale"
  ],

"oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
	 "https://www.googleapis.com/auth/script.external_request",
	 "https://www.googleapis.com/auth/script.scriptapp",
	 "https://www.googleapis.com/auth/spreadsheets.currentonly"
  ],


Connect to an external service	https://www.googleapis.com/auth/script.external_request
View your email address	https://www.googleapis.com/auth/userinfo.email
Display and run third-party web content in prompts and sidebars inside Google applications	https://www.googleapis.com/auth/script.container.ui
Allow this application to run when you are not present	https://www.googleapis.com/auth/script.scriptapp
View and manage spreadsheets that this application has been installed in	https://www.googleapis.com/auth/spreadsheets.currentonly

