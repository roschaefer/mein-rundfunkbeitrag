import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import FilterItem from './FilterItem.jsx';

import { Programs } from '../../api/programs.js';
import { Categories } from '../../api/categories.js';


export default class FilterList extends Component {
  renderFilters() {
    let handleFilter = function(category) {
      console.log('You clicked: ' + category.name);
    }

    return this.props.categories.map((category) => (
      <FilterItem filterFunction={handleFilter.bind(this, category)} key={category._id} category={category} />
    ));
  }

  relevantPrograms() {
    let filteredPrograms = this.props.programs
    return filteredPrograms;
  }

  render() {
    return (
    <div>
      <div className='help-message'>
        <p> First, reduce the number of programs. </p>
        <p> Choose some filters. </p>
      </div>
      <h1>Choose Filters</h1>
      <div className="row">
        <p className="col s12">{this.relevantPrograms().length} programs match the criteria</p>
      </div>


      <form action="#">
        { this.renderFilters() }
      </form>
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
}, FilterList);
