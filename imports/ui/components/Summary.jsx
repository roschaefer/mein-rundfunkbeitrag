import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ProgramItem from './ProgramItem.jsx';

export default class Summary extends Component {
  chosenPrograms() {
    let liked_selections = this.props.selections
    liked_selections = liked_selections.filter(selection => {
      return (selection.userId === Meteor.userId()) && (selection.selected === 'Yes');
    });
    let chosenPrograms = liked_selections.map(selection => {
      return selection.program();
    });
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



Summary.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  selections: PropTypes.array.isRequired,
};
