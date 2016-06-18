import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';



import { Programs } from '../api/programs.js'

export default class DecisionBox extends Component {
  render() {
    return (
      <div className="card-action">
      <ProgramDecision programId={this.props.programId} answer="No"/>
      <ProgramDecision programId={this.props.programId} answer="Yes"/>
      </div>
    )
  }
}
export default class ProgramDecision extends Component {
  handleClick(event) {
    event.preventDefault();
    Programs.update( this.props.programId, {
      $set: { like: this.props.answer },
    });
  }

  render() {
    return (
      <a className="right" href="#" onClick={this.handleClick.bind(this)}>{this.props.answer}</a>
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
      <div>Like? {this.props.program.like}</div>
      <span className="card-title">{this.props.program.title}</span>
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
