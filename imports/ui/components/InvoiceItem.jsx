import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { FormattedNumber, FormattedMessage } from 'react-intl';



export default class InvoiceItem extends Component {
  render() {
    return (
      <tr className='invoice-item'>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.selection.program().title}
        </td>
        <td>
          <FormattedNumber value={this.props.selection.amount} style="currency" currency="EUR" />
        </td>
      </tr>
    );
  }
}

InvoiceItem.propTypes = {
  selection: PropTypes.object.isRequired,
};
