import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';


export class DecisionBox extends Component {
  render() {
    return (
      <div className="decision-box mdl-card__actions mdl-card--border filter-list">
      <ProgramDecision programId={this.props.programId} answer="Yes"/>
      <ProgramDecision programId={this.props.programId} answer="No"/>
      </div>
    )
  }
}
export class ProgramDecision extends Component {
  handleClick(event) {
    event.preventDefault();
    Meteor.call('selections.choose', this.props.programId, this.props.answer);
  }

  classes() {
    let classes = "selection-choose mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color-text--white mdl-button--accent";
    classes += " choose-" + this.props.answer.toLowerCase();
    return classes;
  }

  render() {
    return (
      <button className={this.classes()} href="#" onClick={this.handleClick.bind(this)}>
        {this.props.answer}
      </button>
    )
  }
}

export default class ProgramItem extends Component {
  render() {
    return (
      <div className="program-card mdl-card mdl-shadow--2dp mdl-cell--8-col">
        <div className="program-title mdl-card__title">
          <h2 className="mdl-card__title-text">{this.props.program.title}</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p>{this.props.program.description}</p>
        </div>
        <DecisionBox programId={this.props.program._id}/>
      </div>
    );
  }
}

ProgramItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  program: PropTypes.object.isRequired,
};
