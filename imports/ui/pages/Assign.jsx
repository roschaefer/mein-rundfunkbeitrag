import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Summary from '../components/Summary.jsx';
import { Link } from 'react-router';

import { Budget, Selections } from '../../api/selections.js';



export default class Assign extends Component {

  render() {
    return (
      <div>
        <div className='row'>
          <div className='help-message col s8 m8'>
            <p> You're done! Very soon, you can say how much money should be spend on each program on this page. You will be able to spread money across multiple programs or specify the amount individually. </p>
            <p> For now, we distribute your budget of { Budget }€/month equally to your chosen programs. </p>
          </div>
        </div>
        <p>
          <Link to="/">
          <button className="btn waves-effect waves-light restart" type="submit" name="action">
          Find even more programs
          </button>
          </Link>
        </p>
        <Summary selections={this.props.selections} />
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('selections');
  Meteor.subscribe('programs');
  Meteor.call('selections.assign_initial_amounts');

  return {
    selections: Selections.find({}).fetch(),
  };
}, Assign);
