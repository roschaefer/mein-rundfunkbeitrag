/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';

import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import { Programs } from './programs.js';


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
