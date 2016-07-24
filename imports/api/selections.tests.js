/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';

import { Budget, Selections } from './selections';
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
        categoryId = Factory.create('category')._id;
        programId = Factory.create('program', { userId, categoryId })._id;
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



    context('given three programs and three selections', function () {
      const userId = Random.id();
      let program, programId;

      beforeEach(function () {
        const category = Factory.create('category');
        const categoryId = category._id;
        [1,2,3].forEach((number) => {
          program = Factory.create('program', { categoryId });
          programId = program._id;
          Factory.create('selection', { programId, program, userId });
        });
      });

      describe('selections.assign_initial_amounts', function () {
        let assign_initial_amounts, invocation;
        beforeEach(function() {
          assign_initial_amounts  = Meteor.server.method_handlers['selections.assign_initial_amounts'];
          invocation = { userId };
        });

        it('assigns an certain amount to every selected program', function () {
          assign_initial_amounts.apply(invocation);
          selections = Selections.find({}).fetch();
          selections.forEach((selection) => {
            expect(selection.amount).to.exist;
          });
        });

        it('does not assign amounts of no-selections', function () {
          let no_selection = Factory.create('selection', { programId, program, userId, selected: "No"});
          assign_initial_amounts.apply(invocation);
          no_selection = Selections.findOne({_id: no_selection._id});
          expect(no_selection.amount).not.to.exist;
        });

        it('does not assign amounts of selections of other users', function () {
          const otherUserId = Random.id();
          Factory.create('selection', { programId, program, userId: otherUserId});
          assign_initial_amounts.apply(invocation);
          user_selection = Selections.findOne({userId});
          other_selection = Selections.findOne({userId: otherUserId});
          expect(user_selection.amount).to.exist;
          expect(other_selection.amount).not.to.exist;
        });

        describe('total amount', function() {
          it('is at most the budget for public broadcasting per person', function () {
            assign_initial_amounts.apply(invocation);
            selections = Selections.find({}).fetch();
            let totalAmount = 0;
            selections.forEach((selection) => {
              totalAmount += selection.amount;
            });
            expect(totalAmount).to.be.at.most(Budget);
          });

          context('repeated calls', function () {
            beforeEach(function () {
              assign_initial_amounts.apply(invocation);
            });

            context('even after more selections are added to the list', function () {
              beforeEach(function () {
                const category = Factory.create('category');
                const categoryId = category._id;
                [1,2].forEach((number) => {
                  program = Factory.create('program', { categoryId });
                  programId = program._id;
                  Factory.create('selection', { programId, program, userId });
                });
              });

              it('never exceeds the budget for public broadcasting per person', function () {
                assign_initial_amounts.apply(invocation);
                selections = Selections.find({}).fetch();
                let totalAmount = 0;
                selections.forEach((selection) => {
                  totalAmount += selection.amount;
                });
                expect(totalAmount).to.be.at.most(Budget);
              });
            });
          });
        });
      });
    });

  });
}
