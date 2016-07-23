/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */

// As a user
// I want to see a pie chart of all my expenses
// Because a visualization gives an more intuitive feeling than mere numbers


describe('Repeat process', function() {
  const base_url = 'http://localhost:3000';

  beforeEach(function () {
    browser.url('http://localhost:3000');
    server.call('resetDatabase');
  });

  describe('Start over button', function () {
    it('brings me back to the first page', function() {
      browser.url(base_url);
      const landing_page_url = browser.getUrl();
      browser.waitForExist('.continue', 1000);
      browser.click('.continue');
      browser.waitForExist('.continue', 1000);
      browser.click('.continue');
      browser.waitForExist('.restart', 1000);
      browser.click('.restart');
      expect(browser.getUrl()).to.eq(landing_page_url);
    });
  });

});
