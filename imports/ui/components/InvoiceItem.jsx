import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';



export default class InvoiceItem extends Component {
  render() {
    return (
      <tr className='invoice-item'>
        <td className="mdl-data-table__cell--non-numeric">{this.props.selection.program().title}</td>
        <td>{this.props.selection.amount.toFixed(2)}€</td>
      </tr>
    );
  }
}

InvoiceItem.propTypes = {
  selection: PropTypes.object.isRequired,
};
