/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import Feed from './Feed.jsx';

if (Meteor.isClient) {
  describe('Feed', () => {
    it('shows remaining programs', () => {
      const program = Factory.build('program');
      const programs = [programs];
      const item = shallow(<Feed programs={programs} />);
      expect(item.text()).to.contain('Remaining Programs: 1');
    });
  });
}
