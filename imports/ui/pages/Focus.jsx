import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import FilterList from '../components/FilterList.jsx';

export default class Focus extends Component {

  render() {
    return (
      <div>
      <FilterList />
      <Link to="/decide">
      <button class="btn waves-effect waves-light" type="submit" name="action">
        Continue
      </button>
      </Link>
      </div>
    );
  }
}
