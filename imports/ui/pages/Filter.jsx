import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';


export default class Filter extends Component {

  render() {
    return (
    <div>
      <h1>Choose Filters</h1>
      <Link to="/decide">Feed</Link>
    </div>
    );
  }
}
