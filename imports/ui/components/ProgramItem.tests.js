/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import ProgramItem from './ProgramItem.jsx';
import DecisionBox from './ProgramItem.jsx';
import ProgramDecision from './ProgramItem.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Programs } from '../../api/programs';
import { Selections } from '../../api/selections';

if (Meteor.isClient) {
  describe('ProgramItem', function () {
    beforeEach(function () {
      resetDatabase();
    });

    it('contains title', function () {
      const program = Programs._transform(Factory.build('program', { title: 'Heute-Show'}));
      const item = shallow(<ProgramItem program={program} />);
      expect(item.text()).to.contain('Heute-Show');
    });


    describe('click on yes', function () {

      it.skip('should create a new selection', function () {
        // TODO: implement
        sinon.stub(choose, 'call');
        const program = Programs._transform(Factory.build('program', { title: 'Heute-Show'}));
        const item = mount(<ProgramItem program={program} />);
        item.find("[class='answer-yes']").simulate('click');
        sinon.assert.calledWith(choose.call, {
          programId: program._id,
          answer: 'Yes',
        });
      });
    });

  });
}
