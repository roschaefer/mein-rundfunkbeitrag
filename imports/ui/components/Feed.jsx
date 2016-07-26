import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ProgramItem from './ProgramItem.jsx';

export default class Feed extends Component {

  filteredPrograms() {
    let filteredPrograms = this.props.programs;
    if (this.props.category) {
      filteredPrograms = filteredPrograms.filter((program) => {
        return (program.categoryId === this.props.category._id);
      });
    }
    return filteredPrograms;
  }

  visiblePrograms() {
    let selections = this.props.selections
    let visiblePrograms = this.filteredPrograms();
    visiblePrograms = visiblePrograms.filter(program => {
      return selections.every(selection => {
        return (selection.userId !== Meteor.userId()) || (selection.programId !== program._id)
      });
    })
    return visiblePrograms;
  }

  renderPrograms() {
    return this.visiblePrograms().map((program) => (
      <ProgramItem key={program._id} program={program} />
    ));
  }

  render() {
    return (
      <div className="program-list">
        <div className="help-card mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Remaining Programs: {this.visiblePrograms().length}</h2>
          </div>
          <div className="mdl-card__supporting-text help-message">
            <p> Now, you can decide whether you want to give money to a program. </p>
            <p> Simply click on <em>Yes</em> or <em>No</em>. If you are not sure, choose <em>No</em>. </p>
          </div>
        </div>
      { this.renderPrograms() }
      </div>
    );
  }
}



Feed.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  programs: PropTypes.array.isRequired,
  selections: PropTypes.array.isRequired,
  category: PropTypes.object,
};
