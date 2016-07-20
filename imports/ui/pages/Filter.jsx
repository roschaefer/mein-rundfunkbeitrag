import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import FilterList from '../components/FilterList.jsx';

export default class Filter extends Component {

  render() {
    return (
      <div>
      <div className='help-message'>
      <p> <em>mein-rundfunkbeitrag</em> is a voting tool for your Rundfunkbeitrag. </p>
      <p> You decide where your money should go to. </p>
      </div>
      <FilterList />
      <Link to="/decide">
      <button className="btn waves-effect waves-light" type="submit" name="action">
        Continue
      </button>
      </Link>
      </div>
    );
  }
}
