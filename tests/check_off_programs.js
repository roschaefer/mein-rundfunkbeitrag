/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */


describe('Decide', function() {
  context('given a program', function () {
    const base_url = 'http://localhost:3000';

    beforeEach(function () {
      browser.url('http://localhost:3000');
      server.call('resetDatabase');
      const category = server.apply('createCategory');
      server.apply('createProgram', [{title: "Program XY", categoryId: category._id}]);
    });

    describe('/decide', function () {
      beforeEach(function () {
        browser.url(base_url + '/decide');
      });

      context('even as a guest user', function () {
        it('I can check off a program', function () {
          browser.waitForVisible('.choose-no');
          browser.click('.choose-no');
          browser.waitForVisible('.program-card', 1000, true);
        });
      });
    });
  });
});
