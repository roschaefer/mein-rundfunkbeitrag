/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';

import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect } from 'meteor/practicalmeteor:chai';

import { Programs } from './programs.js';

import faker from 'faker';

Factory.define('program', Programs, {
    title: () => faker.lorem.sentence(),
    description: () => faker.lorem.sentence(),
      like: null,
      createdAt: () => new Date(),
});

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
