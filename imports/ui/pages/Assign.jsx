import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Summary from '../components/Summary.jsx';

import { Programs } from '../../api/programs.js';



export default class Assign extends Component {

  render() {
    return (
    <div>
      <Summary programs={this.props.programs} />
    </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('programs');

  return {
    programs: Programs.find({}).fetch(),
  };
}, Assign);
