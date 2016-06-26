import React, { Component, PropTypes } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


// App component - represents the whole app

export default class App extends Component {

  render() {
    return (
      <div className="container">
      <h3>mein Rundfunkbeitrag</h3>
        <AccountsUIWrapper />
        {this.props.children}
      </div>
    );
  }
}





