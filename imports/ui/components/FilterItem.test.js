/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import FilterItem from './FilterItem.jsx';
import { Categories } from '../../api/categories.js';


if (Meteor.isClient) {
  describe('FilterItem', function ()  {

    describe('click on radio button', function () {
      it('triggers callback', function () {
        const callback = sinon.spy();
        const item = shallow(<FilterItem filterFunction={callback} category={"Whatever"} />);
        item.find('input').simulate('click');
        sinon.assert.called(callback);
      });

    });

  });
}
