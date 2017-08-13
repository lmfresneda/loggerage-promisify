import _Promise from 'promise';

const notAsyncMethods = [
  'log', 'info', 'debug', 'trace', 'success', 'error', 'warn', 'failure', 'clearLog', 'getLog', 'downloadFileLog'];
const suffixAsync = 'Async';

/**
 * @param  {Loggerage} logger
 * @param  {Object} options
 * @return {Loggerage}
 */
function loggeragePromisify(logger, options = {}){
  const thisOptions = Object.assign({
    onlyAsync: false
  }, options);

  notAsyncMethods.forEach((method) => {
    Object.defineProperty(logger, `${method}${suffixAsync}`, {
      value: _Promise.denodeify(logger[`${method}${suffixAsync}`])
    });
    if(!thisOptions.onlyAsync){
      Object.defineProperty(logger, method, {
        value: logger[`${method}${suffixAsync}`]
      });
    }
  });

  return logger;
}

module.exports = loggeragePromisify;
