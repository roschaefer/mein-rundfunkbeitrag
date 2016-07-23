import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';



export default class ProgramItem extends Component {
  render() {
    return (
      <tr className='invoice-item'>
        <td>{this.props.selection.program().title}</td>
        <td>{this.props.selection.amount}</td>
      </tr>
    );
  }
}

ProgramItem.propTypes = {
  program: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
};
