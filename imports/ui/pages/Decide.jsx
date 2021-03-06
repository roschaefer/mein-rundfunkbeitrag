import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Feed from '../components/Feed.jsx';
import { Link } from 'react-router';

import { Programs } from '../../api/programs.js';
import { Selections } from '../../api/selections.js';
import { Categories } from '../../api/categories.js';
import { FormattedMessage } from 'react-intl';


export default class Decide extends Component {
  getCategory() {
    const category_name = this.props.location.query.category;
    return Categories.findOne({name: category_name});
  }

  render() {
    return (
      <div>
        <Feed programs={this.props.programs} selections={this.props.selections} category={this.getCategory()} />
        <div className="mdl-card mdl-shadow--2dp mdl-cell--8-col continue-card">
          <Link to='/assign' className='continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color-text--white mdl-button--accent'>
            <FormattedMessage id='app.decide.continue-to-assign' />
          </Link>
        </div>
      </div>
    );
  }
}


export default createContainer(() => {
  Meteor.subscribe('programs');
  Meteor.subscribe('selections');
  Meteor.subscribe('categories');

  return {
    programs: Programs.find({}).fetch(),
    selections: Selections.find({}).fetch(),
  };
}, Decide);

