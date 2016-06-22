import React, { Component, PropTypes } from 'react';


// App component - represents the whole app

export default class App extends Component {

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}





