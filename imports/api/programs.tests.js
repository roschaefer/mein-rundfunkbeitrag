/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Programs } from './programs';

if (Meteor.isServer) {
  describe('Programs', function () {
    beforeEach(function () {
      resetDatabase();
    });

    describe('properties', function () {
      describe('createdAt', function () {
        it('must be Date', function () {
          const programData = {
            title: 'Heute-Show',
            description: 'Satire-Sendung',
            like: null,
            createdAt: 'Not a timestamp',
          }

          expect(Programs.insert.bind(Programs, programData)).to.throw("Created at must be a Date");
        });
      });
    });
  });
}
