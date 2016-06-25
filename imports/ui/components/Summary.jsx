import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ProgramItem from './ProgramItem.jsx';

export default class Feed extends Component {
  chosenPrograms() {
    let chosenPrograms = this.props.programs
    chosenPrograms = chosenPrograms.filter(program => {
      return program.like === 'Yes';
    })
    return chosenPrograms;
  }

  renderPrograms() {
    return this.chosenPrograms().map((program) => (
      <ProgramItem key={program._id} program={program} />
    ));
  }

  render() {
    return (
    <div>
      <div className="row">
        <h3 className="col s12">Chosen Programs: {this.chosenPrograms().length}</h3>
      </div>
      <ul className="program-list">
      { this.renderPrograms() }
      </ul>
    </div>
    );
  }
}



Feed.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  programs: PropTypes.array.isRequired,
};
