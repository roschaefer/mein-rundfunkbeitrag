import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import Feed from '../components/Feed.jsx';

import { Programs } from '../../api/programs.js';
import { Selections } from '../../api/selections.js';


export default class Decide extends Component {

  render() {
    return (
      <div>
        <Feed programs={this.props.programs} selections={this.props.selections} />
        <Link to="/assign">
        <button className="btn waves-effect waves-light" type="submit" name="action">
        Assign money
        </button>
        </Link>
      </div>
    );
  }
}


export default createContainer(() => {
  Meteor.subscribe('programs');
  Meteor.subscribe('selections');

  return {
    programs: Programs.find({}).fetch(),
    selections: Selections.find({}).fetch(),
  };
}, Decide);

