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
          category._id === program.categoryId;
        });
      });
    }
    return filteredPrograms;
  }

  render() {
    return (
    <div>
      <div className='help-message'>
        <p> First, reduce the number of programs. </p>
        <p> Choose some filters. </p>
      </div>
      <h1>Choose Filters</h1>
      <div className="row">
        <p className="col s12">
          <em id='program-counter'>{this.relevantPrograms().length}</em> programs match the criteria
        </p>
      </div>


      <p>
        <form action="#" className='filter-list'>
          { this.renderFilters() }
        </form>
      </p>

      <Link to={this.decisionUrl()}>
      <button className="btn waves-effect waves-light continue" type="submit" name="action">
        Continue
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
