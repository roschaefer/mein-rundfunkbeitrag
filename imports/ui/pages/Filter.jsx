import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import FilterList from '../components/FilterList.jsx';

import { Programs } from '../../api/programs.js';
import { Categories } from '../../api/categories.js';

import { FormattedNumber, FormattedMessage } from 'react-intl';

export default class Filter extends Component {

  render() {
    return (
      <div className='mdl-grid'>


      <div className="help-card mdl-card mdl-shadow--2dp mdl-cell--8-col">
        <div className="mdl-card__supporting-text help-message">
          <p>
          <FormattedMessage id='app.welcome' values={{amount: <em>8</em>}} />
          </p>
          <p>
          <FormattedMessage id='app.purpose' />
          </p>
        </div>
      </div>




      <FilterList categories={this.props.categories} programs={this.props.programs}/>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('programs_without_selections');
  Meteor.subscribe('categories');
  return {
    programs: Programs.find({}).fetch(),
    categories: Categories.find({}).fetch(),
  };
}, Filter);
