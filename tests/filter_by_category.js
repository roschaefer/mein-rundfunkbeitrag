/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */


describe('Filter by category @watch', function() {
  const base_url = 'http://localhost:3000';

  beforeEach(function () {
    browser.url('http://localhost:3000');
    server.call('resetDatabase');
    const news_id = server.apply('createCategory',[{name: "News"}]);
    const sport_id = server.apply('createCategory',[{name: "Sport"}]);
    server.apply('createProgram',[{title: "Tagesschau"   , category_id: news_id } ]);
    server.apply('createProgram',[{title: "Sportschau"   , category_id: sport_id } ]);
    server.apply('createProgram',[{title: "Heute-Journal", category_id: news_id } ]);
  });

  describe('Number of programs matching the criteria', function() {
    it('get reduced when filters are selected', function () {
      browser.url(base_url);
      browser.waitUntil(function () {
          return browser.getText('#program-counter').equals('3')
      }, 1000, 'expected 3 programs matching the criteria');
      browser.click("News");
      browser.waitUntil(function () {
          return browser.getText('#program-counter').equals('2')
      }, 1000, 'expected 2 programs matching the criteria');
    });
  });

  describe('List of programs to choose', function() {
    it('is subset of programs filtered by category', function () {
      const filters = '?category=News';
      browser.url(base_url + '/decide/' + filters);
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
