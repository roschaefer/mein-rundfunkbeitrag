/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Programs } from './programs';

if (Meteor.isServer) {
  describe('Programs', function () {
    beforeEach(function () {
      resetDatabase();
    });

    describe('isDecided', function () {
      it('true if not null', function () {
        const program = Factory.create('program', {'like': 'Yes'});
        expect(program.isDecided()).to.equal(true);
      });
    });

    describe('properties', function () {
      describe('createdAt', function () {
        it('must be Date', function () {
          expect(Factory.create.bind(Factory, 'program', {
            createdAt: 'Not a timestamp',
          })).to.throw('Created at must be a Date');
        });
      });
    });
  });
}
