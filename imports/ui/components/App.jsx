import React, { Component, PropTypes } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';


// App component - represents the whole app

export default class App extends Component {

  render() {
    return (
        <div className="container">
            <Navbar/>

              {this.props.children}

            <Footer/>
        </div>
    );
  }
}
