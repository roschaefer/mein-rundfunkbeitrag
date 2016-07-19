import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ProgramItem from './ProgramItem.jsx';

export default class Feed extends Component {
  visiblePrograms() {
    let selections = this.props.selections
    let visiblePrograms = this.props.programs
    visiblePrograms = visiblePrograms.filter(program => {
      return selections.every(selection => {
        return (selection.userId !== Meteor.userId()) || (selection.programId !== program._id)
      });
    })
    return visiblePrograms;
  }

  renderPrograms() {
    return this.visiblePrograms().map((program) => (
      <ProgramItem decisionbox={true} key={program._id} program={program} />
    ));
  }

  render() {
    return (
    <div>
      <div className='help-message'>
        <p> Now, you can decide whether you want to give money to a program. </p>
        <p> Simply click on <em>Yes</em> or <em>No.</em> </p>
      </div>
      <div className="row">
        <h3 className="col s12">Remaining Programs: {this.visiblePrograms().length}</h3>
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
  selections: PropTypes.array.isRequired,
};
