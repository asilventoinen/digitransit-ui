function expectStopName(expected) {
  this.waitForElementVisible('@stopName', this.api.globals.itinerarySearchTimeout);
  return this.assert.containsText('@stopName', expected);
}

function waitForDepartureVisible() {
  return this.waitForElementVisible('@departure', this.api.globals.itinerarySearchTimeout);
}

module.exports = {
  commands: [{
    expectStopName,
    waitForDepartureVisible,
  }],
  elements: {
    stopName: {
      selector: '.stop-page.header > .h3',
    },
    stopPageHeader: {
      selector: '.stop-page.header',
    },
  },
};
