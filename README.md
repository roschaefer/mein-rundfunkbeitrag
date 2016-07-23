# mein Rundfunkbeitrag

[![Build Status](https://travis-ci.org/roschaefer/mein-rundfunkbeitrag.svg?branch=master)](https://travis-ci.org/roschaefer/mein-rundfunkbeitrag)

Since 2013, every household in Germany has to pay fees for public broadcasting without legal opt-out.
If we have to pay after all, it would be great to say where the money should go to.
``mein Rundfunkbeitrag`` is a voting tool to enable participation:
How much money should go to which tv or radio station or program respectively?

## Demo

Visit [mein-rundfunkbeitrag](https://mein-rundfunkbeitrag.herokuapp.com/) on heroku

## Installation

Install [Meteorjs](https://www.meteor.com/install).


Clone the repository:
```
git clone https://github.com/roschaefer/mein-rundfunkbeitrag.git
```

Install dependencies:
```
cd mein-rundfunkbeitrag
meteor npm install
```


## Usage

Start the server:
```
meteor
```

App is running on [localhost:3000](http://localhost:3000/)

## Testing

Currently, our [CI server](https://travis-ci.org/roschaefer/mein-rundfunkbeitrag) only runs unit tests.

### Unit

Run
```
meteor npm run test
```

### Acceptance

Install [chimp](https://chimp.readme.io/)
```
npm install -g chimp
```

Run
```
meteor npm run acceptance
```

In a different terminal run
```
chimp --ddp=http://localhost:3000 --mocha --path=tests
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :heart:


## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
