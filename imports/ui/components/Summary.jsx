import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import InvoiceItem from './InvoiceItem.jsx';

export default class Summary extends Component {
  likedSelections() {
    let liked_selections = this.props.selections
    liked_selections = liked_selections.filter(selection => {
      return (selection.userId === Meteor.userId()) && (selection.selected === 'Yes');
    });
    return liked_selections;
  }

  renderPrograms() {
    return this.likedSelections().map((selection) => (
      <InvoiceItem key={selection._id} selection={selection} />
    ));
  }

  render() {
    return (
    <div>
      <div className="row">
        <h3 className="col s12">Chosen Programs: {this.likedSelections().length}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th data-field="id">Program</th>
            <th data-field="price">Amount</th>
          </tr>
        </thead>
        <tbody>
        { this.renderPrograms() }
        </tbody>
      </table>
    </div>
    );
  }
}



Summary.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  selections: PropTypes.array.isRequired,
};
