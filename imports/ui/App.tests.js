/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import App from './App.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';


if (Meteor.isClient) {
  describe('App', function ()  {
    beforeEach(function () {
      resetDatabase();
    });


    describe('first step', function () {
      it('shows filter', function () {
        const item = shallow(<App/>);
        expect(item.text()).to.contain('Choose Filters');
      });
    });
  });
}
