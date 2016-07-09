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

    context('given a program', function () {
      const userId = Random.id();
      let programId;

      beforeEach(function () {
        programId = Factory.create('program', { userId })._id;
      });

      describe('program', function () {
        it.skip('returns associated program', function () {
          const selection = Factory.create('selection', {userId, programId});
          // TODO: solve timing issues here
          expect(selection).to.exist;
          expect(selection.program()).to.exist;
          expect(selection.program()._id).to.equal(programid);
        });
      });

      describe('user', function () {
        it.skip('returns associated user', function () {
          // TODO: implement
        });
      });

      describe('validations', function () {
        it.skip('checks dangling user id', function () {
          // TODO: implement
        });

        it.skip('checks dangling program id', function () {
          // TODO: implement
        });
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
}
