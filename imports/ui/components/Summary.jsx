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

  renderInvoiceItems() {
    return this.likedSelections().map((selection) => (
      <InvoiceItem key={selection._id} selection={selection} />
    ));
  }

  render() {
    return (
    <div>
      <table className="invoice mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric"><strong className='program-counter'>{this.likedSelections().length}</strong> Programs</th>
            <th data-field="price">Amount</th>
          </tr>
        </thead>
        <tbody>
        { this.renderInvoiceItems() }
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
