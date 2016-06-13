import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Programs } from '../api/programs.js';



import Program from './Program.jsx';

// App component - represents the whole app
export default class App extends Component {

  renderPrograms() {
    return this.props.programs.map((program) => (
      <Program key={program._id} program={program} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Program List</h1>
        </header>

        <ul>
          {this.renderPrograms()}
        </ul>
      </div>
    );
  }
}



App.propTypes = {
  programs: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    programs: Programs.find({}).fetch(),
  };
}, App);

