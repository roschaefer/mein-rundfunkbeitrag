/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isServer) {
  describe('Programs', () => {
    beforeEach(function () {
      resetDatabase();
    });

    describe('methods', () => {
      it('can decide on');
    });
  });
}
