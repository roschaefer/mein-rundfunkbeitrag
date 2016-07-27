import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import FilterItem from './FilterItem.jsx';

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
          <h2 className="mdl-card__title-text">Filters</h2>
        </div>
        <div className="mdl-card__supporting-text help-message">
          <p> There are so many programs available. In order to narrow down choices, click on the filter options below. </p>
        </div>
        <div className="mdl-card__actions mdl-card--border filter-list">
            <div className="mdl-card__supporting-text">
            by category
            </div>
              { this.renderFilters() }
            <div className="mdl-card__supporting-text">
            <em className='program-counter'>{this.relevantPrograms().length}</em> programs match the criteria
            </div>

            <Link to={this.decisionUrl()} className='continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color-text--white mdl-button--accent'>
              See relevant programs
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
