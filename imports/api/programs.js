import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
