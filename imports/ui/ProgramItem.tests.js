import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import ProgramItem from './ProgramItem.jsx';

if (Meteor.isClient) {
  describe('ProgramItem', () => {
    it('contains title', () => {
      const program = Factory.build('program', { title: 'Heute-Show', like: null});
      const item = shallow(<ProgramItem program={program} />);
      expect(item.text()).to.contain('Heute-Show');
    });
  });
}
