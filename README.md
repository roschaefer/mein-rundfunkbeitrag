# mein Rundfunkbeitrag

[![Build Status](https://travis-ci.org/roschaefer/mein-rundfunkbeitrag.svg?branch=master)](https://travis-ci.org/roschaefer/mein-rundfunkbeitrag)

Since 2013, every household in Germany has to pay fees for public broadcasting without legal opt-out.
If we have to pay after all, it would be great to say where the money should go to.
``mein Rundfunkbeitrag`` is a voting tool to enable participation:
How much money should go to which tv or radio station or program respectively?

## Project discontinued

We switched from [MeteorJS](https://www.meteor.com/) to
[EmberJS](http://emberjs.com/) + [Rails](http://rubyonrails.org/). See this
[repository](https://github.com/roschaefer/rundfunk-mitbestimmen),
including both projects as a submodule.

### Reasons for abandoning MeteorJS

* MeteorJS is slow in development: On my machine it takes about 2 minutes to
  boot and 10 seconds to reload the server after changes.
* Templating language: MeteorJS moved from Blaze as a templating engine to
  React. React is OK, but there is no clear separation of logic and template.
* Dependencies. Meteor's own dependency management is
  a good example of
  [NIH syndrome](https://en.wikipedia.org/wiki/Not_invented_here).  It is
  gradually moving over to npm. But why did they not use it in the first place?
* Community: Some meteor packages you just don't want to use as they were
  built for versions prior to Meteor 1.3. It seems you just can't leverage
  the full potential of the community.
* Tests: React Intl added dependencies to my components that broke my unit
  tests. Meteor's intended workflow for full stack testing is to provide a
  backdoor in order to setup data. I don't like this approach but worse than
  that, getting the test setup to work on a continuous integration server is
  just a pain in the ass.
* Database: MongoDB is not good for strong relational data, but we have
  strong relational data in our use case: The relational data between users
  and content (aka broadcasts).
* Publications: Out-of-the-box synchronization of view data is one of the
  killer features of Meteor. Unfortunately, in our use case every user
  has exclusive write access. So we can make no use of this
  feature at all.
* Backend language: I learned that using javascript in both backend and frontend
  is a disadvantage rather than the opposite. I love to write ruby in the
  backend and can use my own experience with Rails.
* Modularity: It makes so much sense to write the frontend totally
  seperated from the backend. The current setup is a SPA frontend consuming a
  JSON API as the backend. Both parts are replacable without affecting
  the other. Plus, we have our backend ready for any native mobile
  client that might come in the future.
* Git submodules: Having two git submodules and one meta repository
  containing both reflects the modularity idea. All full stack testing happens
  from inside the meta repository and the user requirements are collected there.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
