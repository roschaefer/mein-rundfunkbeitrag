import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Summary from '../components/Summary.jsx';
import { Link } from 'react-router';

import { Budget, Selections } from '../../api/selections.js';
import { FormattedNumber, FormattedMessage } from 'react-intl';



export default class Assign extends Component {

  render() {
    return (
      <div className='mdl-grid'>
        <div className="help-card mdl-card mdl-shadow--2dp mdl-cell--8-col">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">
              <FormattedMessage id='app.assign.title'/>
            </h2>
          </div>
          <div className="mdl-card__supporting-text help-message">
            <p>
            <FormattedMessage id='app.assign.help-message.intention'/>
            </p>
            <p>
            <FormattedMessage
              id='app.assign.help-message.todo'
              values={{budget: <FormattedNumber value={Budget} style="currency" currency="EUR" />}}
            />
            </p>
          </div>
        </div>
        <Summary selections={this.props.selections} />

        <div className="mdl-card mdl-shadow--2dp mdl-cell--8-col continue-card">
          <Link to='/' className='restart mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color-text--white mdl-button--accent'>
          <FormattedMessage id='app.assign.restart'/>
          </Link>
        </div>
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
