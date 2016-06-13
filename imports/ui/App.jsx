import React, { Component } from 'react';



import Program from './Program.jsx';

// App component - represents the whole app
export default class App extends Component {
  getPrograms() {
    return [
      { _id: 1, title: 'Die Sendung mit der Maus' },
    ];
  }

  renderPrograms() {
    return this.getPrograms().map((program) => (
      <Program key={program._id} program={program} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Program List</h1>
        </header>

        <ul>
          {this.renderPrograms()}
        </ul>
      </div>
    );
  }
}




