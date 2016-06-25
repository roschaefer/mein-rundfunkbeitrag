/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import Summary from './Summary.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';


if (Meteor.isClient) {
  describe('Summary', function ()  {
    beforeEach(function () {
      resetDatabase();
    });

    context('when user decided', function () {
      it('shows all chosen programs', function () {
        const liked_program = Factory.build('program', {'like': 'Yes'});
        const another_liked_program = Factory.build('program', {'like': 'Yes'});
        const programs = [liked_program, another_liked_program];
        const item = shallow(<Summary programs={programs} />);
        expect(item.text()).to.contain('Chosen Programs: 2');
      });

      it('doesn not show disliked programs', function () {
        const liked_program = Factory.build('program', {'like': 'Yes'});
        const disliked_program = Factory.build('program', {'like': 'No'});
        const unchosen_program = Factory.build('program', {'like': null});
        const programs = [liked_program, disliked_program];
        const item = shallow(<Summary programs={programs} />);
        expect(item.text()).to.contain('Chosen Programs: 1');
      });
    });
  });
}
