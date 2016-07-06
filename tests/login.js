/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */


describe('Login', function() {
  context('given a user exists', function () {
    it('I can login as this user @watch', function () {
      browser.url('http://localhost:3000');
      browser.waitForExist('#login-sign-in-link');
      browser.click('#login-sign-in-link');
      browser.setValue('input[id="login-username"]', 'johndoe');
      browser.setValue('input[id="login-password"]', 'password');
      browser.click('#login-buttons-password');
      browser.waitForExist(".login-link-text");
      let username = browser.getText(".login-link-text");
      expect(username).to.equal("johndoe");
    });
  });
});
