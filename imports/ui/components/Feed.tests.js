/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import Feed from './Feed.jsx';
import { Programs } from '../../api/programs';
import { Selections } from '../../api/selections';
import { resetDatabase } from 'meteor/xolvio:cleaner';


if (Meteor.isClient) {
  describe('Feed', function ()  {
    beforeEach(function () {
      resetDatabase();
    });

    it('shows remaining programs', function () {
      const program = Factory.build('program');
      const programs = [program];
      const selections = [];
      const item = shallow(<Feed programs={programs} selections={selections} />);
      expect(item.text()).to.contain('Remaining Programs: 1');
    });

    context('given user decided on a program', function () {
      it('doesn\'t contain programs with a selection', function () {
      const program = Programs._transform(Factory.build('program', {title: "Heute Show"}));
      const chosen_program = Programs._transform(Factory.build('program', {title: "Neo Magazin Royale"}));
      const programs = [program, chosen_program];
      const selection = Selections._transform(Factory.build('selection', {programId: chosen_program._id}));
      const selections = [selection];
      const item = mount(<Feed programs={programs} selections={selections} />);
      expect(item.text()).to.contain('Heute Show');
      expect(item.text()).not.to.contain('Neo Magazin Royale');
      });
    });
  });
}
