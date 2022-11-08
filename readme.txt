Setup
1. pnpm add -g @google/clasp
2. clasp clone <script id>
3. pnpm add -d @types/google-apps-script
4. make .claspignore
  	jsconfig.json
	**/node_modules/**
5. clasp push --watch

Test
 1. go to script editor: https://script.google.com/home/projects/1cK_5DahOhYaomdxQ_xn9WvWoD1noKykrQCa-x9IVgVwHgIvlN9FxHl27/edit
 2. deploy-> test deployments-> execute
 
Publish
1. Create new deployment version deploy->new deployment
2. go to https://console.cloud.google.com/apis/api/appsmarket-component.googleapis.com/googleapps_sdk?project=project-id-7012436840793518902&authuser=0
3. update version number

Measure
1. go to logs explorer https://console.cloud.google.com/logs/query;query=severity%3DDEBUG;timeRange=2022-10-09T04:58:44.311Z%2F2022-11-07T05:58:44.311Z;cursorTimestamp=2022-11-07T01:27:30.763Z?project=project-id-7012436840793518902
https://console.cloud.google.com/logs/query;query=severity%20%3D%22debug%22%0D%0Atimestamp%20%3E%3D%20%222022-10-06%22%20timestamp%20%3C%3D%20%222022-11-08%22%20;timeRange=2022-10-07T04:58:44.311Z%2F2022-11-07T05:58:44.311Z;cursorTimestamp=2022-11-07T01:27:30.763Z?project=project-id-7012436840793518902
2. Download logs to csv and put in a google sheet
3. use pivot tables to measure users and sheets made

todo:
log spreadsheet name in makesheet
log only first time opened - less logging
get verified by google- ip
add feedback link-   https://resultify.live/optionswhatif/feedback



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

