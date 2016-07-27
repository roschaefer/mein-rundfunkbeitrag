import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';



export default class FilterItem extends Component {

  render() {
    return (
      <label className="filter-option mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={this.props.category.name}>
        <span className="mdl-radio__label">{this.props.category.name}</span>
        <input onClick={this.props.filterFunction} type="radio" name="filter-list" className="mdl-radio__button" id={this.props.category.name} ></input>
      </label>

    );
  }
}

FilterItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  category: PropTypes.object.isRequired,
  filterFunction: PropTypes.func
};
