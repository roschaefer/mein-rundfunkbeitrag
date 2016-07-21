/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */


describe('Filter by category', function() {
  const base_url = 'http://localhost:3000';

  beforeEach(function () {
    browser.url('http://localhost:3000');
    server.call('resetDatabase');
    const news = server.apply('createCategory',[{name: "News"}]);
    const sport = server.apply('createCategory',[{name: "Sport"}]);
    server.apply('createProgram',[{title: "Tagesschau"   , categoryId: news._id } ]);
    server.apply('createProgram',[{title: "Sportschau"   , categoryId: sport._id } ]);
    server.apply('createProgram',[{title: "Heute-Journal", categoryId: news._id } ]);
  });

  describe('Number of programs matching the criteria', function() {
    it('get reduced when filters are selected', function () {
      browser.url(base_url);
      browser.waitUntil(function () {
          return browser.getText('#program-counter') === '3'
      }, 1000, 'expected 3 programs matching the criteria');
      browser.click('label[for="News"]');
      browser.waitUntil(function () {
          return browser.getText('#program-counter') === '2'
      }, 1000, 'expected 2 programs matching the criteria');
    });
  });

  describe('List of programs to choose', function() {
    it('is subset of programs filtered by category @watch', function () {
      browser.url(base_url);
      browser.waitForVisible('.filter-list');
      browser.click('label[for="News"]');
      browser.click('.continue');
      browser.waitForVisible('.program-list', 1000);
      expect(
        browser.getText('.program-title')[0]
      ).to.equal('Tagesschau');
      expect(
        browser.getText('.program-title')[1]
      ).to.equal('Heute-Journal');

      expect(
        browser.getText('.program-list')
      ).not.to.contain('Sportschau');

    });
  });

});
