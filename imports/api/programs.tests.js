/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';

import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect } from 'meteor/practicalmeteor:chai';

import { Programs } from './programs.js';


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
