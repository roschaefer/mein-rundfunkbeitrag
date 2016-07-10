/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import Summary from './Summary.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Programs } from '../../api/programs';
import { Selections } from '../../api/selections';
import StubCollections from 'meteor/hwillson:stub-collections';


if (Meteor.isClient) {
  describe('Summary', function ()  {
    beforeEach(function () {
      StubCollections.stub([Programs, Selections]);
      resetDatabase();
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
        StubCollections.restore();
      });

      context('user decided on one program', function () {
        let program, chosen_program, selection, programs;
        beforeEach(function () {
          program = Factory.create('program', {title: "Heute Show"});
          chosen_program = Factory.create('program', {title: "Neo Magazin Royale"});
          programs = [program, chosen_program];
          selection = Factory.create('selection', {
            userId: uid, programId: chosen_program._id, selected: "Yes"
          });
          selection.program = function () {
            // TODO: find out why we have to define this in test enviroment
            // stub-collections and collections helper don't like each other?
            return chosen_program;
          };
        });

        it('shows selected programs', function () {
          const selections = [selection];
          const item = shallow(<Summary selections={selections} />);
          expect(item.text()).to.contain('Chosen Programs: 1');
        });

        it('does not show selected programs of other users', function () {
          selection.userId = "whatever";
          const selections = [selection];
          const item = shallow(<Summary selections={selections} />);
          expect(item.text()).to.contain('Chosen Programs: 0');
        });

        it('does not show disliked programs', function () {
          const disliked_selection = Factory.create('selection', {
            userId: uid, programId: program._id, selected: "No"
          });
          disliked_selection.program = function () {
            // TODO: find out why we have to define this in test enviroment
            // stub-collections and collections helper don't like each other?
            return program;
          };
          const selections = [selection, disliked_selection];
          const item = shallow(<Summary selections={selections} />);
          expect(item.text()).to.contain('Chosen Programs: 1');
        });
      });
    });
  });
}
