/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */


describe('Chimp Mocha', function() {
  describe('Page title', function () {
    it('is set', function () {
      browser.url('http://localhost:3000');
      expect(browser.getTitle()).to.equal('mein Rundfunkbeitrag');
    });
  });
});
