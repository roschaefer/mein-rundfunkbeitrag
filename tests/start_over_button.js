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
    browser.url(base_url);
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

    context('given I have chosen 2 out of 3 programs already', function () {
      beforeEach(function () {
        const category = server.apply('createCategory');
        server.apply('createProgram', [{title: "Program A", categoryId: category._id}]);
        server.apply('createProgram', [{title: "Program B", categoryId: category._id}]);
        server.apply('createProgram', [{title: "Program C", categoryId: category._id}]);
        browser.url(base_url + '/decide');
        browser.waitForVisible('.choose-yes', 1000);
        browser.click('.choose-yes');
        browser.click('.choose-no');
        browser.click('.continue');
      });

      it('already chosen programs are taken out', function () {
        browser.waitForExist('.restart', 1000);
        browser.click('.restart');
        browser.waitForVisible('.filter-list');
        expect(browser.getText('.program-counter')).to.eq('1');
      });
    });
  });

});
