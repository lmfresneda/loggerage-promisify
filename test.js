const expect = require('expect.js');
global.localStorage = require('localStorage');
const _Promise = require('promise');
const Loggerage = require("loggerage").Loggerage;

const promisify = require('./');

const notAsyncSetLogMethods = ['log', 'info', 'debug', 'trace', 'success', 'error', 'warn', 'failure'];
const notAsyncNotSetLogMethods = ['clearLog', 'getLog', 'downloadFileLog'];
const suffixAsync = 'Async';
var logger;
var i = 0;

describe("By default", function() {

  beforeEach(function() {
    i += 1;
    logger = new Loggerage('MY-APP-' + i);
  });

  it("1# not async methods are promises", function () {

    logger = promisify(logger);
    notAsyncSetLogMethods.concat(notAsyncNotSetLogMethods).forEach((method) => {
      let promise;
      switch(method){
        case 'error':
        case 'failure':
          promise = logger[method]('one log', 'stacktrace');
          break;
        case 'log':
          promise = logger[method](null, 'one log', 'stacktrace');
          break;
        case 'clearLog':
        case 'getLog':
        case 'downloadFileLog':
          promise = logger[method]();
          break;
        default:
          promise = logger[method]('one log');
      }

      expect(promise).to.be.a(_Promise);
      expect(promise).to.have.property('then');
      expect(promise).to.have.property('catch');
      expect(promise.then).to.be.a(Function);
      expect(promise.catch).to.be.a(Function);
    });
  });

  it("2# async methods are promises", function () {

    logger = promisify(logger);
    notAsyncSetLogMethods.concat(notAsyncNotSetLogMethods).forEach((method) => {
      let promise;
      switch(method){
        case 'error':
        case 'failure':
          promise = logger[method + suffixAsync]('one log', 'stacktrace');
          break;
        case 'log':
          promise = logger[method + suffixAsync](null, 'one log', 'stacktrace');
          break;
        case 'clearLog':
        case 'getLog':
        case 'downloadFileLog':
          promise = logger[method + suffixAsync]();
          break;
        default:
          promise = logger[method + suffixAsync]('one log');
      }

      expect(promise).to.be.a(_Promise);
      expect(promise).to.have.property('then');
      expect(promise).to.have.property('catch');
      expect(promise.then).to.be.a(Function);
      expect(promise.catch).to.be.a(Function);
    });
  });

  it("3# async methods are promises and insert and get log", function (done) {

    logger = promisify(logger);
    const arrPromises = [];
    notAsyncSetLogMethods.forEach((method) => {
      let promise;
      switch(method){
        case 'error':
        case 'failure':
          promise = logger[method + suffixAsync]('one log', 'stacktrace');
          break;
        case 'log':
          promise = logger[method + suffixAsync](null, 'one log', 'stacktrace');
          break;
        default:
          promise = logger[method + suffixAsync]('one log');
      }

      arrPromises.push(promise);
    });

    _Promise.all(arrPromises).then(() => {

      logger.getLogAsync().then((logs) => {

        expect(logs).to.have.length(notAsyncSetLogMethods.length);
        done();

      }).catch(done);

    }).catch(done);
  });

  it("4# not async methods are promises and insert and get log", function (done) {

    logger = promisify(logger);
    const arrPromises = [];
    notAsyncSetLogMethods.forEach((method) => {
      let promise;
      switch(method){
        case 'error':
        case 'failure':
          promise = logger[method]('one log', 'stacktrace');
          break;
        case 'log':
          promise = logger[method](null, 'one log', 'stacktrace');
          break;
        default:
          promise = logger[method]('one log');
      }

      arrPromises.push(promise);
    });

    _Promise.all(arrPromises).then(() => {

      logger.getLogAsync().then((logs) => {

        expect(logs).to.have.length(notAsyncSetLogMethods.length);
        done();

      }).catch(done);

    }).catch(done);
  });

});

describe("Only Async", function() {
  beforeEach(function() {
    i += 1;
    logger = new Loggerage('MY-APP-' + i);
  });

  it("5# not async methods aren't promises", function () {

    logger = promisify(logger, { onlyAsync: true });
    notAsyncSetLogMethods.concat(notAsyncNotSetLogMethods).forEach((method) => {
      let promise;
      switch(method){
        case 'error':
        case 'failure':
          promise = logger[method]('one log', 'stacktrace');
          break;
        case 'log':
          promise = logger[method](null, 'one log', 'stacktrace');
          break;
        case 'getLog':
          promise = logger[method]();
          break;
        case 'clearLog':
          promise = logger[method]();
          break;
        case 'downloadFileLog':
          // TODO pending test
          promise = {};
          break;
        default:
          promise = logger[method]('one log');
      }

      switch(method){
        case 'getLog':
          expect(promise).to.be.a(Array);
          break;
        case 'downloadFileLog':
          break;
        default:
          expect(promise).to.be.a(Loggerage);
          expect(promise).not.to.have.property('then');
          expect(promise).not.to.have.property('catch');
      }

      expect(promise).not.to.be.a(_Promise);
    });
  });

  it("6# async methods are promises", function () {

    logger = promisify(logger, { onlyAsync: true });
    notAsyncSetLogMethods.concat(notAsyncNotSetLogMethods).forEach((method) => {
      let promise;
      switch(method){
        case 'error':
        case 'failure':
          promise = logger[method + suffixAsync]('one log', 'stacktrace');
          break;
        case 'log':
          promise = logger[method + suffixAsync](null, 'one log', 'stacktrace');
          break;
        case 'clearLog':
        case 'getLog':
        case 'downloadFileLog':
          promise = logger[method + suffixAsync]();
          break;
        default:
          promise = logger[method + suffixAsync]('one log');
      }

      expect(promise).to.be.a(_Promise);
      expect(promise).to.have.property('then');
      expect(promise).to.have.property('catch');
      expect(promise.then).to.be.a(Function);
      expect(promise.catch).to.be.a(Function);
    });
  });

  it("7# async methods are promises and insert and get log", function (done) {

    logger = promisify(logger, { onlyAsync: true });
    const arrPromises = [];
    notAsyncSetLogMethods.forEach((method) => {
      let promise;
      switch(method){
        case 'error':
        case 'failure':
          promise = logger[method + suffixAsync]('one log', 'stacktrace');
          break;
        case 'log':
          promise = logger[method + suffixAsync](null, 'one log', 'stacktrace');
          break;
        default:
          promise = logger[method + suffixAsync]('one log');
      }

      arrPromises.push(promise);
    });

    _Promise.all(arrPromises).then(() => {

      logger.getLogAsync().then((logs) => {

        expect(logs).to.be.a(Array);
        expect(logs).to.have.length(notAsyncSetLogMethods.length);
        done();

      }).catch(done);

    }).catch(done);
  });

  it("8# not async methods aren't promises and insert and get log", function () {

    logger = promisify(logger, { onlyAsync: true });
    notAsyncSetLogMethods.forEach((method) => {
      switch(method){
        case 'error':
        case 'failure':
          logger[method]('one log', 'stacktrace');
          break;
        case 'log':
          logger[method](null, 'one log', 'stacktrace');
          break;
        default:
          logger[method]('one log');
      }
    });
    const logs = logger.getLog();
    expect(logs).to.be.a(Array);
    expect(logs).to.have.length(notAsyncSetLogMethods.length);
  });
});
