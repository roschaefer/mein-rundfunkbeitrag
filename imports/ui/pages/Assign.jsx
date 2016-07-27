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
        <div className="help-card mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Summary</h2>
          </div>
          <div className="mdl-card__supporting-text help-message">
            <p> You're done! Very soon, you can say how much money should be spend on each program on this page. You will be able to spread money across multiple programs or specify the amount individually. </p>
            <p> For now, we distribute your budget of { Budget }€/month equally to your chosen programs. </p>
          </div>

          <div className="mdl-card__actions mdl-card--border filter-list">
            <a href='/' className='restart mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color-text--white mdl-button--accent'>
              Find even more programs
            </a>
          </div>
        </div>
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
