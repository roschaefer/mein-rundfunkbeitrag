import React, { Component, PropTypes } from 'react';


// App component - represents the whole app

export default class App extends Component {

  render() {
    return (
      <div className="container">
      <h3>mein Rundfunkbeitrag</h3>
        {this.props.children}
      </div>
    );
  }
}





