/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import App from './App.jsx';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import 'intl';
import { mountWrapIntl } from './helpers/intl.test';


if (Meteor.isClient) {
  describe('App', function ()  {
    beforeEach(function () {
      resetDatabase();
    });


    describe('layout', function () {
      it('shows title', function () {
        const item = mountWrapIntl(<App/>);
        expect(item.text()).to.contain('mein Rundfunkbeitrag');
      });
    });
  });
}
