import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import InvoiceItem from './InvoiceItem.jsx';
import { FormattedMessage } from 'react-intl';

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
    <div className="mdl-card mdl-cell--8-col invoice-card">
      <table className="invoice mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="program-counter mdl-data-table__cell--non-numeric">
              <FormattedMessage id='app.assign.invoice-table.programs' values={{selectionCounter: this.likedSelections().length}}/>
            </th>
            <th data-field="price">
              <FormattedMessage id='app.assign.invoice-table.amount' />
            </th>
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
