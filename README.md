## loggerage-promisify

[![npm](https://img.shields.io/npm/v/loggerage-promisify.svg?style=flat-square)](https://www.npmjs.com/package/loggerage-promisify) [![Loggerage version](https://img.shields.io/badge/loggerage-%3E%3D2.0-blue.svg?style=flat-square)](https://github.com/lmfresneda/loggerage) ![Love](https://img.shields.io/badge/love-max-brightgreen.svg?style=flat-square) [![Travis](https://img.shields.io/travis/lmfresneda/loggerage-promisify.svg?style=flat-square)](https://travis-ci.org/lmfresneda/loggerage-promisify) [![Coveralls](https://img.shields.io/coveralls/lmfresneda/loggerage-promisify.svg?style=flat-square)](https://coveralls.io/github/lmfresneda/loggerage-promisify)

**Only work with loggerage verson >=2.0**

loggerage-promisify is a helper for promisify methods of [loggerage package](https://github.com/lmfresneda/loggerage)

### How to use

```
$ npm install --save loggerage-promisify
```
or

```
$ yarn add loggerage-promisify
```

```javascript
const { Loggerage } = require("loggerage");
const promisify = require('loggerage-promisify')

const logger = promisify(new Loggerage("MY-APP"));

logger.debug("Hello world!") // is a promise now!
  .then(() => {
    return logger.getLog();
  })
  .then((log) => {
    // handle log!
  })
  .catch(handleError);
```

Or, if you want promisify only the actual async method, you can specify:

```javascript
const { Loggerage } = require("loggerage");
const promisify = require('loggerage-promisify')

const logger = promisify(new Loggerage("MY-APP"), { onlyAsync: true });

logger.debug("Hello world!"); // is sync and NOT is a promise

logger.debugAsync("Hello again world!") // is async and promise!
  .then(() => {
    return logger.getLog();
  })
  .then((log) => {
    // handle log!
  })
  .catch(handleError);
```

### Understanding

When you **don't specify** the `onlyAsync` property to` true`, the methods with 'Async' suffix are promisificated as you expect, like `debugAsync`, `infoAsync`, and synchronous methods like `info`,` debug`, `getLog`, etc. are matched to the previous asynchronous methods. For this reason it will be the same to call `debug` as to` debugAsync`, etc.

When you (yes) specify the `onlyAsync` property to` true`, **only** the methods with 'Async' suffix are promisificated, like `debugAsync`, `infoAsync`, etc.

### Run test

```bash
$ npm install && npm test
```
or

```bash
$ yarn install && yarn run test
```

### License

* [MIT License](https://github.com/lmfresneda/loggerage-promisify/blob/master/LICENSE)




