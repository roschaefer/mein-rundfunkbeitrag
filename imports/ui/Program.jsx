import React, { Component, PropTypes } from 'react';

export default class Program extends Component {
  render() {
    return (
      <li>
      <div className="row">
      <div className="col s12 m6">
      <div className="card blue-grey darken-1">
      <div className="card-content white-text">
      <span className="card-title">{this.props.program.title}</span>
      <p>{this.props.program.description}</p>
      </div>
      </div>
      </div>
      </div>
      </li>
    );
  }
}

Program.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  program: PropTypes.object.isRequired,
};
