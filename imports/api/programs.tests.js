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

    describe('without_selections()', function () {
      const userId = Random.id();
      let cursor, program, programId;

      beforeEach(function () {
        const category = Factory.create('category');
        const categoryId = category._id;
        program = Factory.create('program', { title: 'ABC', categoryId });
        programId = program._id;
      });

      it('does not return programs with selections', function () {
        Factory.create('selection', { programId, program, userId });
        cursor = Meteor.server.publish_handlers.programs_without_selections.apply({userId});
        const returned_programs = cursor.fetch();
        expect(returned_programs).to.be.empty;
      });

      it('does not consider selections of other users', function () {
        Factory.create('selection', { programId, program, userId: Random.id() });
        cursor = Meteor.server.publish_handlers.programs_without_selections.apply({userId});
        const returned_programs = cursor.fetch();
        expect(returned_programs[0].title).to.eq('ABC');
      });

      it('returns programs without selections', function () {
        cursor = Meteor.server.publish_handlers.programs_without_selections.apply({userId});
        const returned_programs = cursor.fetch();
        expect(returned_programs[0].title).to.eq('ABC');
      });
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
