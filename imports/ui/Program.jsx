import React, { Component, PropTypes } from 'react';

export default class Program extends Component {
  render() {
    return (
      <li>{this.props.program.title}</li>
    );
  }
}

Program.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  program: PropTypes.object.isRequired,
};
