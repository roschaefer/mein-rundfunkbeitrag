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
      <div className='row'>
        <div className='help-message col s8 m8'>
          <p> Did you know that 8 <em>billions</em> of Euros are spent every year for public broadcasting in Germany? </p>
          <p> This tool allows you to tell the public where your money should go to.  </p>
        </div>
      </div>
      <FilterList categories={this.props.categories} programs={this.props.programs}/>
      </div>
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
