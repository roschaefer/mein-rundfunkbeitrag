import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import FilterItem from './FilterItem.jsx';
import { FormattedNumber, FormattedPlural, FormattedMessage } from 'react-intl';

export default class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {filters: (props.initialFilters || [])};
  }

  updateFilters(category) {
    this.setState({filters: [category]});
  }
  decisionUrl() {
    let result = "/decide?";
    this.state.filters.forEach((category) => {
      result += "category=" + category.name;
    });
    return result;
  }

  renderFilters() {
    return this.props.categories.map((category) => (
      <FilterItem filterFunction={this.updateFilters.bind(this, category)} key={category._id} category={category} />
    ));
  }

  relevantPrograms() {
    let filteredPrograms = this.props.programs
    if (this.state.filters.length) {
      filteredPrograms = filteredPrograms.filter(program => {
        return this.state.filters.some((category) => {
          return (category._id === program.categoryId);
        });
      });
    }
    return filteredPrograms;
  }

  render() {
    return (
      <div className="help-card mdl-card mdl-shadow--2dp mdl-cell--8-col">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">
          <FormattedMessage id='app.filter.select-filter.title' />
          </h2>
        </div>
        <div className="mdl-card__supporting-text help-message">
          <p>
          <FormattedMessage id='app.filter.select-filter' />
          </p>
        </div>
        <div className="mdl-card__actions mdl-card--border filter-list">
            <div className="mdl-card__supporting-text">
              <FormattedMessage id='app.filter.select-filter.label.category' />
            </div>
              { this.renderFilters() }
            <div className="mdl-card__supporting-text">
              <FormattedMessage id='app.filter.select-filter.result-set-size' values={{programCounter:  this.relevantPrograms().length }}/>
            </div>

            <Link to={this.decisionUrl()} className='continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color-text--white mdl-button--accent'>
              <FormattedMessage id='app.filter.continue-to-decide' />
            </Link>
        </div>
      </div>
    );
  }
}

FilterList.propTypes = {
  programs: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  initialFilters: PropTypes.array,
}
