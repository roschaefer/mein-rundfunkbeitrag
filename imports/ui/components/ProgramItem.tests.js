/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import ProgramItem from './ProgramItem.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isClient) {
  describe('ProgramItem', function () {
    beforeEach(function () {
      resetDatabase();
    });

    it('contains title', function () {
      const program = Factory.build('program', { title: 'Heute-Show', like: null });
      const item = shallow(<ProgramItem program={program} />);
      expect(item.text()).to.contain('Heute-Show');
    });
  });
}
