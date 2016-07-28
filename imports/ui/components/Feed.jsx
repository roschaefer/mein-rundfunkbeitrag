import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import ProgramItem from './ProgramItem.jsx';
import { FormattedMessage } from 'react-intl';

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
      <div className="program-list mdl-grid">
        <div className="help-card mdl-card mdl-shadow--2dp mdl-cell--8-col">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">
              <FormattedMessage id='app.decide.remaining-programs' values={{programCounter:  this.visiblePrograms().length }}/>
            </h2>
          </div>
          <div className="mdl-card__supporting-text help-message">
            <p>
            <FormattedMessage id='app.decide.help-message.intention'/>
            </p>
            <p>
            <FormattedMessage id='app.decide.help-message.todo' values={{
              yes: <em><FormattedMessage id='app.decide.answer.yes'/></em>,
              no: <em><FormattedMessage id='app.decide.answer.no'/></em>}}
            />
            </p>
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
