import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Programs } from '../api/programs.js';



import Feed from './Feed.jsx';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <div className="container">
      <Feed programs={this.props.programs}/>
      </div>
    );
  }
}





export default createContainer(() => {
  return {
    programs: Programs.find({}).fetch(),
  };
}, App);
