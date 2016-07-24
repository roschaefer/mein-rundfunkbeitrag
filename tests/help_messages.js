/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */


describe('Help messages', function() {
  const base_url = 'http://localhost:3000';

  describe('Welcome Page', function() {
    it('explains the purpose', function () {
      browser.url(base_url);

      const message = browser.getText('.help-message');
      expect(message).to.match(/make your voice heard/i);
      expect(message).to.match(/propose on which shows your money should be spent/i);
    });
  });

  describe('/filter', function() {
    it('explains the filters', function () {
      browser.url(base_url + '/filter');
      const message = browser.getText('.help-message');
      expect(message).to.match(/narrow down choices/i);
      expect(message).to.match(/click on the filter options/i);
    });
  });

  describe('/decide', function() {
    it('tells me to click on Yes or No', function () {
      browser.url(base_url + '/decide');
      const message = browser.getText('.help-message');
      expect(message).to.match(/decide whether you want to give money to a program/i);
      expect(message).to.match(/click on yes or no/i);
    });
  });

  describe('/assign', function() {
    it('tells me to assign money to particular programs', function () {
      browser.url(base_url + '/assign');
      const message = browser.getText('.help-message');
      expect(message).to.match(/say how much money should be spend on each program/i);
    });
  });
});
