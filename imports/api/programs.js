import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

import { Categories } from './categories';
import { Selections } from './selections';

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
  Meteor.publish('programs_without_selections', function withoutSelections() {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const selections_of_user = Selections.find({
      userId: this.userId,
    });
    const selected_program_ids = selections_of_user.map((s) => { return s.programId });
    return Programs.find( { _id: { $nin: selected_program_ids} });
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
