/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Selections } from './selections';
import { Programs } from './programs';
import { Accounts } from 'meteor/accounts-base'

if (Meteor.isServer) {
  describe('Selections', function () {
    beforeEach(function () {
      resetDatabase();
    });

    describe('create', function () {
      context('with a connected user and program', function () {
        it('is valid', function () {
          const uid = Accounts.createUser({
            username: 'pete',
            password: '1234',
          });
          const pid = Factory.create('program')._id;
          const selection = Factory.create('selection', {userId: uid, programId: pid});
          expect(selection._id).not.to.equal(null);
        });
      });

      context('dangling user id', function () {
        it.skip('is invalid', function () {
          expect(Factory.create.bind(Factory, 'selection', {
            userId: 'iELKYfyJvKKDK3AbnQ',
          })).to.throw('User must be present');
        });
      });

      context('dangling program id', function () {
        it.skip('is invalid', function () {
          expect(Factory.create.bind(Factory, 'selection', {
            programId: 'iELKYfyJvKKDK3AbnQ',
          })).to.throw('Program must be present');
        });
      });

    });

  });
}
