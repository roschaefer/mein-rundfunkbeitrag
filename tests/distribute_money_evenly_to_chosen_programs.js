/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */

// Feature: Distribute remaining budget evenly to chosen programs
// As a new user
// On first time, I want to have my budget distributed to all selected programs evenly
// So I don't have to do that on my own and giving each program the same is a fair guess

describe('Money distribution', function() {
  context('given there are three programs', function () {
    const base_url = 'http://localhost:3000';

    beforeEach(function () {
      browser.url('http://localhost:3000');
      server.call('resetDatabase');
      const category = server.apply('createCategory');
      server.apply('createProgram', [{title: "Program XY", categoryId: category._id}]);
      server.apply('createProgram', [{title: "Program YZ", categoryId: category._id}]);
      server.apply('createProgram', [{title: "Program XZ", categoryId: category._id}]);
    });

    context('when I choose three programs for the first time', function () {
      beforeEach(function () {
        browser.url(base_url + '/decide');
          browser.waitForVisible('.program-list');
          browser.click('.choose-yes');
          browser.click('.choose-no');
          browser.click('.choose-yes');
          browser.waitForVisible('li', 1000, true); // gone
          browser.click('.continue');
      });

      it('I can see that 17.50€ are distributed evenly on the two programs I have chosen', function () {
          browser.waitForVisible('.invoice-item');
          const items = browser.getText('.invoice-item');
          // first program
          expect(items[0]).to.include('8.75');
          expect(items[0]).to.include('Program XY');
          // second program
          expect(items[1]).to.include('8.75');
          expect(items[1]).to.include('Program XZ');
      });

    });
  });
});
