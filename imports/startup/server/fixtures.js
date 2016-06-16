import { Meteor } from 'meteor/meteor';
import { Programs } from '../../api/programs.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Programs.find().count() === 0) {
    const data = [
      {
        title: "Die Sendung mit der Maus", description: "Lach- und Sachgeschichten"
      },
      {
        title: "Loewenzahn", description: "Fragen Forschen Wissen"
      },
      {
        title: "Quarks&Co", description: "Wissenschaftssendung"
      },
      {
        title: "Tagesschau", description: "Tägliche Nachrichtensendung"
      },
      {
        title: "Heute-Show", description: "Satire-Sendung"
      },
    ];

    let timestamp = (new Date()).getTime();
    let id = 1;

    data.forEach((program) => {
      const programId = Programs.insert({
        id: id,
        title: program.title,
        description: program.description,
        like: null,
        createdAt: timestamp,
      });

    id+=1;
    });
  }
});
