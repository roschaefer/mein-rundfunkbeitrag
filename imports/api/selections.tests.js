/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Selections } from './selections';

if (Meteor.isServer) {
  describe('Selections', function () {
    beforeEach(function () {
      resetDatabase();
    });

    describe('user', function () {
      it('must be present', function () {
        expect(Factory.create.bind(Factory, 'selection', {
          userId: null,
        })).to.throw('User id is required');
      });
    });

    describe('program', function () {
      it('must be present', function () {
        expect(Factory.create.bind(Factory, 'selection', {
          programId: null,
        })).to.throw('Program id is required');
      });
    });

  });
}
