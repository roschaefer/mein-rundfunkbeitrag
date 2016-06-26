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


    context('after applying the filters', function () {
      it('shows the total number of remaining programs', function () {
        Factory.create('program', {'like': null});
        Factory.create('program', {'like': null});
        Factory.create('program', {'like': null});
        const item = mount(<FilterList/>);
        expect(item.text()).to.contain('3 programs match the criteria');
      });

      it('relevant programs are new to the user', function () {
        Factory.create('program', {'like': 'Yes'});
        Factory.create('program', {'like': 'No'});
        Factory.create('program', {'like': null});
        const item = mount(<FilterList/>);
        expect(item.text()).to.contain('1 programs match the criteria');
      });
    });

  });
}
