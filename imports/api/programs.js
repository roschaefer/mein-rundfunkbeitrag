import { Mongo } from 'meteor/mongo';
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
  like: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
  },
});
Programs.attachSchema(Programs.schema);

Factory.define('program', Programs, {
  title: faker.lorem.word(),
  description: faker.lorem.text(),
  like: null,
  createdAt: () => new Date(),
});
