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
        return browser.getText('.program-counter') === '3 programs match the criteria'
      }, 1000, 'expected 3 programs matching the criteria');
      browser.click('label[for="News"]');
      browser.waitUntil(function () {
        return browser.getText('.program-counter') === '2 programs match the criteria'
      }, 1000, 'expected 2 programs matching the criteria');
    });
  });

  describe('Redirect to /decide page', function() {
    beforeEach(function() {
      browser.url(base_url);
      browser.waitForVisible('.filter-list');
      browser.waitForExist('label[for="News"]');
      browser.click('label[for="News"]');
      browser.waitForExist('.continue');
      browser.click('.continue');
    });

    it('sets URL parameters', function () {
      expect(browser.getUrl()).to.contain("category=News");
    });

    it('filters effectively narrows down choices', function () {
      browser.waitForVisible('.program-list', 1000);
      const titles = browser.getText('.program-title').sort();
      expect(titles[0]).to.equal('Heute-Journal');
      expect(titles[1]).to.equal('Tagesschau');

      expect(browser.getText('.program-list')).not.to.contain('Sportschau');
      expect(browser.getText('.program-title')).not.to.contain('Sportschau');

    });
  });

});
