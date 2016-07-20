/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import FilterList from './FilterList.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Programs } from '../../api/programs.js';


if (Meteor.isClient) {
  describe('FilterList', function ()  {
    beforeEach(function () {
      StubCollections.stub(Programs);
      resetDatabase();
    });

    afterEach(function () {
      StubCollections.restore();
    });


    it('shows the total number of remaining programs', function () {
      const programs = [1,2,3].map((index) => {
        return Factory.build('program')
      });
      const item = mount(<FilterList programs={programs} categories={[]}/>);
      expect(item.text()).to.contain('3 programs match the criteria');
    });

    it.skip('relevant programs are new to the user', function () {
      // TODO: implement
    });

    context('with filters activated', function () {
      it('reduces program count', function () {
        const categoryIds= [1, 2, 1];
        const programs = categoryIds.map((categoryId) => {
          return Factory.build('program', {categoryId})
        });
        console.log(programs);
        const item = mount(<FilterList programs={programs} filters={[1]} categories={[]}/>);
        expect(item.text()).to.contain('2 programs match the criteria');
      });
    });

  });
}
