import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';


export default class DecisionBox extends Component {
  render() {
    return (
      <div className="card-action decision-box">
      <ProgramDecision programId={this.props.programId} answer="No"/>
      <ProgramDecision programId={this.props.programId} answer="Yes"/>
      </div>
    )
  }
}
export default class ProgramDecision extends Component {
  handleClick(event) {
    event.preventDefault();
    Meteor.call('selections.choose', this.props.programId, this.props.answer);
  }

  render() {
    return (
      <a className="right" href="#" answer={this.props.answer} onClick={this.handleClick.bind(this)}>{this.props.answer}</a>
    )
  }
}

export default class ProgramItem extends Component {
  showDecisionBox() {
    if (this.props.program.isDecided()) {
      return null;
    } else {
      return (
        <DecisionBox programId={this.props.program._id}/>
      );
    }
  }

  render() {
    return (
      <li>
      <div className="row">
      <div className="col s12 m6">
      <div className="card teal darken-1">
      <div className="card-content white-text">
      <span className="card-title">{this.props.program.title}</span>
      <p>{this.props.program.description}</p>
      { this.showDecisionBox() }
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
