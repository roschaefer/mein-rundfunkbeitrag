// This file will be auto-imported in the app-test context,
// ensuring the method is always available

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { _ } from 'meteor/underscore';

const createUser = (name, passwd) => {
  const uid = Accounts.createUser({
    username: name,
    password: passwd,
  });
  return uid;
};

// Remember to double check this is a test-only file before
// adding a method like this!
Meteor.methods({
  generateFixtures: function generateFixturesMethod() {
    resetDatabase();
    createUser('johndoe', 'password');
  },
});

