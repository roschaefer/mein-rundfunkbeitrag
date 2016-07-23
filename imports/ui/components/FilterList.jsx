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
    <div>
      <h4>Filters</h4>
      <div className='row'>
        <div className='help-message col s8 m8'>
          <p> There are so many programs available. In order to narrow down choices, click on the filter options below. </p>
        </div>
      </div>

      <p>
        <form action="#" className='filter-list'>
        <p>
          <em>by category</em>
        </p>
          { this.renderFilters() }
        </form>
      </p>
      <div className="row">
        <h5 className="col s12">
          <em id='program-counter'>{this.relevantPrograms().length}</em> programs match the criteria
        </h5>
      </div>


      <Link to={this.decisionUrl()}>
      <button className="btn waves-effect waves-light continue" type="submit" name="action">
        See relevant programs
      </button>
      </Link>
    </div>
    );
  }
}

FilterList.propTypes = {
  programs: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  initialFilters: PropTypes.array,
}
