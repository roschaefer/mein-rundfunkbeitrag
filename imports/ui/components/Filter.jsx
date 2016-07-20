import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';



export default class Filter extends Component {

  render() {
    return (
      <div>
        <input name="category" type="radio" id={this.props.category.name} />
        <label htmlFor={this.props.category.name}>{this.props.category.name}</label>
      </div>
    );
  }
}

Filter.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  category: PropTypes.object.isRequired,
};
