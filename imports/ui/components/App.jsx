import React, { Component, PropTypes } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


// App component - represents the whole app

export default class App extends Component {

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Navbar/>
           <main className="mdl-layout__content">
              <div className="page-content">
                <AccountsUIWrapper />
                {this.props.children}
              </div>
            <Footer/>
          </main>
      </div>

    );
  }
}
