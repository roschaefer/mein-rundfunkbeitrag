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
//import StubCollections from 'meteor/hwillson:stub-collections';

if (Meteor.isClient) {
  describe('ProgramItem', function () {
    beforeEach(function () {
      //StubCollections.stub(Selections);
      //StubCollections.stub(Accounts);
      resetDatabase();
    });

    afterEach(function () {
      //StubCollections.restore();
    });

    it('contains title', function () {
      const program = Programs._transform(Factory.build('program', { title: 'Heute-Show', like: null }));
      const item = shallow(<ProgramItem program={program} />);
      expect(item.text()).to.contain('Heute-Show');
    });


    describe('click on yes', function () {

      it('creates new selection', function () {
        const uid = Accounts.createUser({
          username: 'pete',
          password: '1234',
        });
        const program = Programs._transform(Factory.build('program', { title: 'Heute-Show', like: null }));
        const item = mount(<ProgramItem program={program} />);
        Meteor.loginWithPassword('pete','1234', function () {
          expect(Meteor.userId()).to.exist;
        });
        item.find('[answer=\'Yes\']').simulate('click');
        expect(Selections.find().count()).to.equal(1);
      });
    });

  });
}
