import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Programs } from '../../api/programs.js';


export default class FilterList extends Component {
  relevantPrograms() {
    let filteredPrograms = this.props.programs
    filteredPrograms = filteredPrograms.filter(program => {
      return program.like === null;
    })
    return filteredPrograms;
  }

  render() {
    return (
    <div>
      <h1>Choose Filters</h1>
      <div className="row">
        <h3 className="col s12">Relevant Programs: {this.relevantPrograms().length}</h3>
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
