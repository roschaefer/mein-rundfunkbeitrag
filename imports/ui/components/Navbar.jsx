import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Navbar extends Component {
  render() {
    return(

    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo center">mein Rundfunkbeitrag</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
              <AccountsUIWrapper />
          </li>
        </ul>
      </div>
    </nav>
    );
  }
}
