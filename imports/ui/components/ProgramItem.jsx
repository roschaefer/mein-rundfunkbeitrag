import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';


export class DecisionBox extends Component {
  render() {
    return (
      <div className="card-action decision-box">
      <ProgramDecision programId={this.props.programId} answer="No"/>
      <ProgramDecision programId={this.props.programId} answer="Yes"/>
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
    let classes = "selection-choose right btn-large col s5 m3 flow-text";
    classes += " choose-" + this.props.answer.toLowerCase();
    return classes;
  }

  render() {
    return (
      <a className={this.classes()} href="#" onClick={this.handleClick.bind(this)}>{this.props.answer}</a>
    )
  }
}

export default class ProgramItem extends Component {
  render() {
    return (
      <li>
      <div className="row">
      <div className="col s12 m6">
      <div className="card teal darken-1">
      <div className="card-content white-text">
      <span className="program-title card-title">{this.props.program.title}</span>
      <p>{this.props.program.description}</p>
        <DecisionBox programId={this.props.program._id}/>
      </div>
      </div>
      </div>
      </div>
      </li>
    );
  }
}

ProgramItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  program: PropTypes.object.isRequired,
};
