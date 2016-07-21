import { Meteor } from 'meteor/meteor';
import { Categories } from '../../api/categories.js';
import { Programs } from '../../api/programs.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Categories.find().count() === 0) {
    const categories = [
      {
        name: 'News',
        programs: [
          { title: 'Tagesschau', description: 'Tägliche Nachrichtensendung'  } ,
          { title: 'Tagesthemen', description: 'Nachrichtensendung'          } ,
          { title: 'Morgenmagazin', description: 'Frühstücksfernsehen'       } ,
          { title: 'Heute-Journal', description: 'Nachrichtenmagazin'        } ,
          { title: 'Aktuelle Stunde', description: 'regionales Infotainment' } ,
        ],
      },
      {
        name: 'Sport',
        programs: [
          { title: 'Sportschau', description: 'aktuelle Sportberichte' } ,
          { title: 'Blickpunkt Sport', description: 'Sportsendung'     } ,
          { title: 'Motorsport', description: 'Sportsendung'           } ,
        ],
      },
      {
        name: 'Comedy',
        programs: [
          { title: 'Heute-Show', description: 'Satire-Sendung'         } ,
          { title: 'NEO MAGAZIN Royale', description: 'Satire-Sendung' } ,
        ],
      },
      {
        name: 'Education',
        programs: [
          { title: 'Die Sendung mit der Maus', description: 'Lach- und Sachgeschichten'     } ,
          { title: 'Loewenzahn', description: 'Fragen Forschen Wissen'                      } ,
          { title: 'Quarks&Co', description: 'Wissenschaftssendung'                         } ,
          { title: 'Planet-Wissen', description: 'Dokumentations- und Wissenschaftsmagazin' } ,
        ],
      },

    ];

    let timestamp = (new Date()).getTime();

    categories.forEach((category) => {
      const categoryId = Categories.insert({
        name: category.name,
        createdAt: timestamp,
      });

      category.programs.forEach((program) => {
        Programs.insert({
          title: program.title,
          description: program.description,
          categoryId,
          createdAt: timestamp,
        });

        timestamp += 1;
      });

    });
  }
});
