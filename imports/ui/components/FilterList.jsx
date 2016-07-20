import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import FilterItem from './FilterItem.jsx';

export default class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {filters: props.initialFilters};
  }

  updateFilters(category) {
    this.setState({filters: [category._id]});
  }

  renderFilters() {
    return this.props.categories.map((category) => (
      <FilterItem filterFunction={this.updateFilters.bind(this, category)} key={category._id} category={category} />
    ));
  }

  relevantPrograms() {
    let filteredPrograms = this.props.programs
    if (this.state.filters) {
      filteredPrograms = filteredPrograms.filter(program => {
        return (this.state.filters.indexOf(program.categoryId) >= 0) // includes?
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
        <p className="col s12">{this.relevantPrograms().length} programs match the criteria</p>
      </div>


      <p>
        <form action="#">
          { this.renderFilters() }
        </form>
      </p>
    </div>
    );
  }
}

FilterList.propTypes = {
  programs: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  initialFilters: PropTypes.array,
}
