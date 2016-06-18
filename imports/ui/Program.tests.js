import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import Program from './Program.jsx';

if (Meteor.isClient) {
  describe('TodoItem', () => {
    it('contains title', () => {
      const program = Factory.build('program', { title: 'Heute-Show', like: null});
      const item = shallow(<Program program={program} />);
      expect(item.text()).to.contain('Heute-Show');
    });
  });
}
