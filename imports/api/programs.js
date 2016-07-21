import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

import { Categories } from './categories';

export const Programs = new Mongo.Collection('Programs');

Programs.schema = new SimpleSchema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  categoryId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
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
  category: Factory.get('category'),
  createdAt: () => new Date(),
});


Programs.helpers({
    category() {
      return Categories.findOne(this.categoryId);
    },
});
