var suite = require('./api/suite.js').suite;
var SLEEP_TIME = 1000;

suite('Search', function () {
  before(function (browser, done) {
    browser.setCurrentPosition(60.2, 24.95, 0, done);
  });

  describe('When Origin is manually set to "Kamppi"', function () {

    before(function (browser, done) {
      browser.origin.disableCurrentPosition();
      browser.origin.enableInput();
      browser.expect.element('#origin-autosuggest > div > input[type=text]').to.be.present.before(browser.ELEMENT_VISIBLE_TIMEOUT);
      browser.origin.enterText("kamppi");
      browser.pause(SLEEP_TIME);
      done();
    });

    it('should remain set to "Kamppi" when Origin input receives and loses focus', function (browser) {
      browser.origin.clickInput();
      browser.assert.value('#origin-autosuggest > div > input[type=text]', "Kamppi, Helsinki");
      browser.map.click();
      browser.assert.value('#origin-autosuggest > div > input[type=text]', "Kamppi, Helsinki");

    });

    it('should be possible to write Destination', function (browser) {
      browser.destination.enableInput();
      browser.expect.element('#destination-autosuggest > div > input[type=text]').to.be.visible.before(browser.ELEMENT_VISIBLE_TIMEOUT);
      browser.destination.enterText("Kluuvi");
      browser.pause(SLEEP_TIME);
      browser.assert.value('#destination-autosuggest > div > input[type=text]', "Kluuvi, Helsinki");
      browser.destination.enterText("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
      browser.pause(SLEEP_TIME);
    });

    it('should use "Sampsantie 40, Helsinki" address when Destination is written as "sampsantie 40"', function (browser, done) {
      browser.destination.enableInput();
      browser.expect.element('#destination-autosuggest > div > input[type=text]').to.be.visible.before(browser.ELEMENT_VISIBLE_TIMEOUT);
      browser.destination.enterText("samsantie 40");
      browser.pause(SLEEP_TIME);
      browser.assert.value('#destination-autosuggest > div > input[type=text]', "Sampsantie 40, Helsinki");
      browser.destination.enterText("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
      browser.pause(SLEEP_TIME);
    });

    it('should be possible to use current position', function (browser) {
      browser.map.click();
      browser.destination.enableCurrentPosition();
      browser.expect.element('#destination-geolocationbar').to.be.visible.before( browser.ELEMENT_VISIBLE_TIMEOUT);
    });
  });


  //TODO not implemented yet
//    it('should show special position marker because position is manually set', function (browser) {
  // blue marker
//      browser.end()
//    });

//TODO not implemented yet
//  describe('When Origin is "My position"', function () {
//    it('should show animated user position marker', function (browser) {
//      // user position
//      browser.end()
//    });
//  });

//TODO not implemented yet
//  describe('When Origin and Destination are set', function () {
//    it('should read values from session store during browser back', function (browser) {
//      browser.end()
//    });
//  });
});
