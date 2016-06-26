import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

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
  like: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
  },
});
Selections.attachSchema(Selections.schema);


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('selections', function selectionsPublication() {
    return Selections.find();
  });
}




Factory.define('selection', Selections, {
  like: null,
  createdAt: () => new Date(),
});


