/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import Feed from './Feed.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Programs } from '../api/programs.js';

if (Meteor.isClient) {
  describe('Feed', function ()  {
    beforeEach(function () {
      resetDatabase();
    });

    it('shows remaining programs', function () {
      const program = Factory.create('program');
      const programs = Programs.find({}).fetch();
      const item = shallow(<Feed programs={programs} />);
      expect(item.text()).to.contain('Remaining Programs: 1');
    });
  });
}
