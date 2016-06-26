import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Programs } from '../../api/programs.js';


export default class FilterList extends Component {

  render() {
    return (
    <div>
      <h1>Choose Filters</h1>
      <div className="row">
        <h3 className="col s12">Relevant Programs: {this.props.programs.length}</h3>
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
