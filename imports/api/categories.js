import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

export const Categories = new Mongo.Collection('Categories');

Categories.schema = new SimpleSchema({
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});
Categories.attachSchema(Categories.schema);

Meteor.methods({
});



if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('categories', function categoriesPublication() {
    return Categories.find();
  });
}




Factory.define('category', Categories, {
  name: faker.lorem.word(),
  createdAt: () => new Date(),
});


Categories.helpers({
});
