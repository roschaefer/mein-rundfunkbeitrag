import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';



import { Programs } from '../api/programs.js'

export default class Program extends Component {
  handleYes(event) {

    event.preventDefault();
    const id = ReactDOM.findDOMNode(this.refs.programId).innerText.trim();
    Programs.upsert({
      _id: id
    }, {
      $set: {
        like: "Yes"
      }
    });

  }

  handleNo(event) {

    event.preventDefault();
    const id = ReactDOM.findDOMNode(this.refs.programId).innerText.trim();
    Programs.upsert({
      _id: id
    }, {
      $set: {
        like: "No"
      }
    });

  }


  render() {
    return (
      <li>
      <div className="row">
      <div className="col s12 m6">
      <div className="card teal darken-1">
      <div className="card-content white-text">
      <div ref="programId">{this.props.program._id}</div>
      <div>Like? {this.props.program.like}</div>
      <span className="card-title">{this.props.program.title}</span>
      <p>{this.props.program.description}</p>
      <div className="card-action">
              <a className="right" href="#" onClick={this.handleNo.bind(this)}>No</a>
              <a className="right" href="#" onClick={this.handleYes.bind(this)}>Yes</a>
      </div>
      </div>
      </div>
      </div>
      </div>
      </li>
    );
  }
}

Program.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  program: PropTypes.object.isRequired,
};
