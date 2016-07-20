/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import {Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Programs } from './programs';
import { Categories } from './categories';

if (Meteor.isServer) {
  describe('Programs', function () {
    beforeEach(function () {
      resetDatabase();
    });

    describe('properties', function () {
      describe('createdAt', function () {
        it('must be Date', function () {
          expect(Factory.create.bind(Factory, 'program', {
            createdAt: 'Not a timestamp',
            categoryId: Random.id(),
          })).to.throw('Created at must be a Date');
        });
      });

      describe('category', function () {
        it('returns associated category', function () {
          const categoryId = Factory.create('category', {name: "CoolCategory"})._id;
          const program = Factory.create('program', {categoryId});
          expect(program).to.exist;
          expect(program.category()).to.exist;
          expect(program.category().name).to.equal("CoolCategory");
        });
      });
    });
  });
}
