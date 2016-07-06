/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */


describe('Login', function() {
  context('given a user exists', function () {
    beforeEach(function () {
      browser.url('http://localhost:3000');
      server.call('generateFixtures');
    });

    it('I can login as this user @watch', function () {
      browser.waitForExist('#login-sign-in-link');
      browser.click('#login-sign-in-link');
      browser.setValue('input[id="login-username"]', 'johndoe');
      browser.setValue('input[id="login-password"]', 'password');
      browser.click('#login-buttons-password');
      browser.waitForVisible('.login-link-text');
      browser.waitUntil(function () {
          return browser.getText('.login-link-text').includes('johndoe')
      }, 5000, 'expected to include johndoe after 5s');
    });
  });
});
