import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Summary from '../components/Summary.jsx';

import { Selections } from '../../api/selections.js';



export default class Assign extends Component {

  render() {
    return (
    <div>
      <Summary selections={this.props.selections} />
    </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('selections');
  Meteor.subscribe('programs');

  return {
    selections: Selections.find({}).fetch(),
  };
}, Assign);
