import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Navbar extends Component {
  render() {
    return(
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title"> mein Rundfunkbeitrag </span>
        </div>
      </header>
    );
  }
}
