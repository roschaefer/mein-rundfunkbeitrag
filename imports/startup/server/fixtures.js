import { Meteor } from 'meteor/meteor';
import { Programs } from '../../api/programs.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Programs.find().count() === 0) {
    const data = [
      {
        title: 'Die Sendung mit der Maus', description: 'Lach- und Sachgeschichten',
      },
      {
        title: 'Loewenzahn', description: 'Fragen Forschen Wissen',
      },
      {
        title: 'Quarks&Co', description: 'Wissenschaftssendung',
      },
      {
        title: 'Tagesschau', description: 'Tägliche Nachrichtensendung',
      },
      {
        title: 'Heute-Show', description: 'Satire-Sendung',
      },
    ];

    const timestamp = (new Date()).getTime();

    data.forEach((program) => {
      Programs.insert({
        title: program.title,
        description: program.description,
        createdAt: timestamp,
      });
    });
  }
});
