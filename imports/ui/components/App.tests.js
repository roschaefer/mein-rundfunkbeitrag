/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import App from './App.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';


if (Meteor.isClient) {
  describe('App', function ()  {
    beforeEach(function () {
      resetDatabase();
    });


    describe('layout', function () {
      it('shows title', function () {
        const item = mount(<App/>);
        expect(item.text()).to.contain('mein Rundfunkbeitrag');
      });
    });
  });
}
