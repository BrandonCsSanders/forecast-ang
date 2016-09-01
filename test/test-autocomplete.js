describe('check if the page is loading and has a title', function () {
  it('should have a title', function () {

    browser.get('http://0.0.0.0:9000/');
    expect(browser.getTitle()).toEqual('Weather By Location');

  });

});

describe('check to see if forcast.io and google auto complete works', function() {
  // default location will auto load
  it('should have a list of items', function () {
    var list = element(by.exactRepeater('point in state.forecastData[state.weatherType.type].data'));
    //console.log(list);
    expect(list.isPresent()).toBe(true);

  });

  it('and should have 49 list items for the hourly data', function () {
    var list = element.all(by.repeater('point in state.forecastData[state.weatherType.type].data'));
    list.then(function (items) {
      expect(items.length).toBe(49);
    });
  });

  var autocompleteField = element(by.model('main.result'));

  it('and should return a list of options when "Portland" is typed', function() {
    autocompleteField.sendKeys('Portland, Or').sendKeys(protractor.Key.TAB).then(function(){
      setTimeout(function() {
        expect(autocompleteField.getAttribute('value')).toBe('Portland, OR, USA');
      }, 2000);
    });
  });

  var dropdown = element(by.css('.weather-dropdown-btn'));

  it('and should have Minutely, Hourly and Daily when clicking the drop-down', function(){
    //weatherType in props.weatherTypes
    expect(dropdown.isPresent()).toBe(true);

    var dropdownMenu = element(by.css('ul.dropdown-menu.full-width'));
    //console.log(dropdownMenu.getCssValue());
    expect(dropdownMenu.isDisplayed()).toBe(false);

    dropdown.click();

    expect(dropdownMenu.isDisplayed()).toBe(true);

    var list = element.all(by.repeater('weatherType in props.weatherTypes'));
    list.then(function(items) {
      expect(items.length).toBe(3);
    });

    var firstItem = element(by.repeater('weatherType in props.weatherTypes').row(0));
    expect(firstItem.getText()).toBe('Minutely');

    firstItem.click();

    var dropdownMenuLabel = element(by.binding('state.weatherType.label'));
    expect(dropdownMenuLabel.getText()).toBe('Minutely');

  });
});
