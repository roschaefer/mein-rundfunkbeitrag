import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

export const Programs = new Mongo.Collection('Programs');

Programs.schema = new SimpleSchema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});
Programs.attachSchema(Programs.schema);

Meteor.methods({
});



if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('programs', function programsPublication() {
    return Programs.find();
  });
}




Factory.define('program', Programs, {
  title: faker.lorem.word(),
  description: faker.lorem.text(),
  createdAt: () => new Date(),
});


Programs.helpers({
});
