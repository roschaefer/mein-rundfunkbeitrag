import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import FilterList from '../components/FilterList.jsx';

import { Programs } from '../../api/programs.js';
import { Categories } from '../../api/categories.js';

export default class Filter extends Component {

  render() {
    return (
      <div>
      <div className='row'>
        <div className='help-message col s8 m8'>
          <p>
            Did you know that Germany spends 8 <em>billion</em> Euros every year on public broadcasting?  Financed by monthly contributions of the German public.
          </p>
          <p>
            However, nobody has a say in the programme design. We want to change that: with our tool, you can make your voice heard and propose on which shows your money should be spent.
          </p>
        </div>
      </div>
      <FilterList categories={this.props.categories} programs={this.props.programs}/>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('programs_without_selections');
  Meteor.subscribe('categories');
  return {
    programs: Programs.find({}).fetch(),
    categories: Categories.find({}).fetch(),
  };
}, Filter);
