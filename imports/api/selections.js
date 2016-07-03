import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

import { Programs } from './programs';

export const Selections = new Mongo.Collection('Selections');

Selections.schema = new SimpleSchema({
  programId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  selected: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: function(){
      if (this.isInsert) {
        return new Date();
      }
    },
  },
});
Selections.attachSchema(Selections.schema);

Meteor.methods({
  'selections.choose'(pid, answer) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(pid, String);
    check(answer, String);

    Selections.insert( {
      userId: this.userId,
      programId: pid,
      selected: answer,
    });
  },
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('selections', function selectionsPublication() {
    return Selections.find();
  });
}




Factory.define('selection', Selections, {
  program: Factory.get('program'),
  selected: 'Yes',
  createdAt: () => new Date(),
});

Selections.helpers({
    user: function () {
      return Meteor.users.findOne(this.userId);
    },
    program: function () {
      return Programs.findOne(this.programId);
    },
});
