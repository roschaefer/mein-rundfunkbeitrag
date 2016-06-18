import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Programs } from '../api/programs.js';



import ProgramItem from './ProgramItem.jsx';

// App component - represents the whole app
export default class App extends Component {

  renderPrograms() {
    let filteredPrograms = this.props.programs
    filteredPrograms = filteredPrograms.filter(program => {
      return program.like === null;
    })
    return filteredPrograms.map((program) => (
      <ProgramItem key={program._id} program={program} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Programs</h1>
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

