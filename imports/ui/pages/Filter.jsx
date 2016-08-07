import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import FilterList from '../components/FilterList.jsx';

import { Programs } from '../../api/programs.js';
import { Categories } from '../../api/categories.js';

import { FormattedNumber, FormattedMessage } from 'react-intl';

export default class Filter extends Component {

  render() {
    return (
      <FilterList categories={this.props.categories} programs={this.props.programs}/>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('programs_without_selections');
  Meteor.subscribe('categories');
  return {
    programs: Programs.find({}).fetch(),
    categories: Categories.find({}).fetch(),
  };
}, Filter);
