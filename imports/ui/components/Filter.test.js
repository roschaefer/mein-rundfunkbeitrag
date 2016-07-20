/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import Filter from './Filter.jsx';
import { Categories } from '../../api/categories.js';


if (Meteor.isClient) {
  describe('Filter', function ()  {

    describe('click on radio button', function () {
      it('triggers callback', function () {
        const callback = sinon.spy();
        const item = shallow(<Filter filterFunction={callback} category={"Whatever"} />);
        item.find('input').simulate('click');
        sinon.assert.called(callback);
      });

    });

  });
}
