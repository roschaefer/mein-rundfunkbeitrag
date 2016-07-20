// This file will be auto-imported in the app-test context,
// ensuring the method is always available

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { _ } from 'meteor/underscore';
import { Programs } from './programs';


// Remember to double check this is a test-only file before
// adding a method like this!
Meteor.methods({
  resetDatabase() {
    resetDatabase();
  },

  createAccount(name, password) {
    const uid = Accounts.createUser({
      username: name,
      password: password,
    });
    return uid;
  },

  createProgram(attributes) {
    return Factory.create('program', attributes);
  },

  createCategory(attributes) {
    return Factory.create('category', attributes);
  },

});

