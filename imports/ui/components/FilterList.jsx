import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Programs } from '../../api/programs.js';


export default class FilterList extends Component {
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
    </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('programs');
  return {
    programs: Programs.find({}).fetch(),
  };
}, FilterList);
