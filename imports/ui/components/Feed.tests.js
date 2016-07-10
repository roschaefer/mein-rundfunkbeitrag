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
import { sinon } from 'meteor/practicalmeteor:sinon';


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

    context('user is logged in', function() {
        let uid;
        beforeEach(function () {
          uid = 'iELKYfyJvKKDK3AbnQ';
          sinon.stub(Meteor, 'userId', function() {
            return uid;
          });
        });

        afterEach(function () {
          Meteor.userId.restore();
        });

      context('user decided on a program', function () {
        let program, chosen_program, selection, selections, programs;
        beforeEach(function () {
          program = Programs._transform(Factory.build('program', {title: "Heute Show"}));
          chosen_program = Programs._transform(Factory.build('program', {title: "Neo Magazin Royale"}));
          programs = [program, chosen_program];
        });

        it('does not show programs with own selection', function () {
          selection = Selections._transform(Factory.build('selection', {userId: uid, programId: chosen_program._id}));
          selections = [selection];
          const item = mount(<Feed programs={programs} selections={selections} />);
          expect(item.text()).to.contain('Heute Show');
          expect(item.text()).not.to.contain('Neo Magazin Royale');
        });

        it('selections do not interfere with other users', function () {
          selection = Selections._transform(Factory.build('selection', {userId: null, programId: chosen_program._id}));
          selections = [selection];
          const item = mount(<Feed programs={programs} selections={selections} />);
          expect(item.text()).to.contain('Heute Show');
          expect(item.text()).to.contain('Neo Magazin Royale');
        });
      });
    });
  });
}
