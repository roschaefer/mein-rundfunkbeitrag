/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';

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
        it.skip('is valid', function () {
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


      context('given a program', function () {
        const userId = Random.id();
        let programId;

        beforeEach(function () {
          resetDatabase();
          programId = Factory.create('program', { userId })._id;
        });

        describe('selections.choose', function () {
          it('creates a new selection', function () {
            const chooseSelection  = Meteor.server.method_handlers['selections.choose'];
            const invocation = { userId };
            chooseSelection.apply(invocation, [programId, 'Yes'])
            expect(Selections.find().count()).to.equal(1);
          });

          it('rejects a new selection if not logged in', function () {
            const chooseSelection  = Meteor.server.method_handlers['selections.choose'];
            const invocation = { userId: null };
            expect(chooseSelection.apply.bind(chooseSelection, {
              userId: null
            }, [programId, 'Yes'])).to.throw('not-authorized');
            expect(Selections.find().count()).to.equal(0);
          });
        });
      });
    });
  });
}
