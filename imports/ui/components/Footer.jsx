import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
export default class Footer extends Component {
  render() {
    return(
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Want to give us feedback?</h5>
                <p className="grey-text text-lighten-4">You can write us a user-story on GitHub or write a paragraph with your ideas via mail.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Contacts</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href='https://github.com/roschaefer/mein-rundfunkbeitrag' target='_blank'>           GitHub</a></li>
                  <li><a className="grey-text text-lighten-3" href='https://github.com/roschaefer/mein-rundfunkbeitrag/issues' target='_blank'>    Issues</a></li>
                  <li><a className="grey-text text-lighten-3" href='mailto:robert.schaefer@student.hpi.de?Subject=User%20Feedback' target='_top'>E-Mail</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
    );
  }
}
