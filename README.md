# Weather By Location
## With Google Autocomplete, Maps and Forecast.io

## Build & development

prerequisite is that you have `node` and `bower` installed.

First run `npm install` then run `bower install` then `grunt serve` to preview. The grunt task will automatically open a browser window to the location of the app.

Note: The map will not work unless on http://localhost:9000 because the key used only allows for the `localhost` domain.

## Testing

To run the tests:

1. Install Protractor: `npm install -g protractor` 
2. Update the manager: `webdriver-manager update`
3. Start server: `webdriver-manager start`

Finally run `protractor test/conf.js` from the project directory and it will run the sequences through.

Straight from [Protractor Docs](http://www.protractortest.org/)
