import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import FilterList from '../components/FilterList.jsx';

import { Programs } from '../../api/programs.js';
import { Categories } from '../../api/categories.js';

export default class Filter extends Component {

  render() {
    return (
      <div>
      <div className='help-message'>
      <p> <em>mein-rundfunkbeitrag</em> is a voting tool for your Rundfunkbeitrag. </p>
      <p> You decide where your money should go to. </p>
      </div>
      <FilterList categories={this.props.categories} programs={this.props.programs}/>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('programs');
  Meteor.subscribe('categories');
  return {
    programs: Programs.find({}).fetch(),
    categories: Categories.find({}).fetch(),
  };
}, Filter);
