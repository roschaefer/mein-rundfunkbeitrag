import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Programs } from '../api/programs.js'
import ProgramItem from './ProgramItem.jsx';

export default class Feed extends Component {
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

        <ul className="program-list">
          {this.renderPrograms()}
        </ul>
      </div>
    );
  }
}


Feed.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  programs: PropTypes.object.isRequired,
};
