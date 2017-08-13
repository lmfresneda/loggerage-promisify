'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notAsyncMethods = ['log', 'info', 'debug', 'trace', 'success', 'error', 'warn', 'failure', 'clearLog', 'getLog', 'downloadFileLog'];
var suffixAsync = 'Async';

/**
 * @param  {Loggerage} logger
 * @param  {Object} options
 * @return {Loggerage}
 */
function loggeragePromisify(logger) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var thisOptions = _extends({
    onlyAsync: false
  }, options);

  notAsyncMethods.forEach(function (method) {
    Object.defineProperty(logger, '' + method + suffixAsync, {
      value: _promise2.default.denodeify(logger['' + method + suffixAsync])
    });
    if (!thisOptions.onlyAsync) {
      Object.defineProperty(logger, method, {
        value: logger['' + method + suffixAsync]
      });
    }
  });

  return logger;
}

module.exports = loggeragePromisify;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmVzNiJdLCJuYW1lcyI6WyJub3RBc3luY01ldGhvZHMiLCJzdWZmaXhBc3luYyIsImxvZ2dlcmFnZVByb21pc2lmeSIsImxvZ2dlciIsIm9wdGlvbnMiLCJ0aGlzT3B0aW9ucyIsIm9ubHlBc3luYyIsImZvckVhY2giLCJtZXRob2QiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiZGVub2RlaWZ5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxrQkFBa0IsQ0FDdEIsS0FEc0IsRUFDZixNQURlLEVBQ1AsT0FETyxFQUNFLE9BREYsRUFDVyxTQURYLEVBQ3NCLE9BRHRCLEVBQytCLE1BRC9CLEVBQ3VDLFNBRHZDLEVBQ2tELFVBRGxELEVBQzhELFFBRDlELEVBQ3dFLGlCQUR4RSxDQUF4QjtBQUVBLElBQU1DLGNBQWMsT0FBcEI7O0FBRUE7Ozs7O0FBS0EsU0FBU0Msa0JBQVQsQ0FBNEJDLE1BQTVCLEVBQWlEO0FBQUEsTUFBYkMsT0FBYSx1RUFBSCxFQUFHOztBQUMvQyxNQUFNQyxjQUFjLFNBQWM7QUFDaENDLGVBQVc7QUFEcUIsR0FBZCxFQUVqQkYsT0FGaUIsQ0FBcEI7O0FBSUFKLGtCQUFnQk8sT0FBaEIsQ0FBd0IsVUFBQ0MsTUFBRCxFQUFZO0FBQ2xDQyxXQUFPQyxjQUFQLENBQXNCUCxNQUF0QixPQUFpQ0ssTUFBakMsR0FBMENQLFdBQTFDLEVBQXlEO0FBQ3ZEVSxhQUFPLGtCQUFTQyxTQUFULENBQW1CVCxZQUFVSyxNQUFWLEdBQW1CUCxXQUFuQixDQUFuQjtBQURnRCxLQUF6RDtBQUdBLFFBQUcsQ0FBQ0ksWUFBWUMsU0FBaEIsRUFBMEI7QUFDeEJHLGFBQU9DLGNBQVAsQ0FBc0JQLE1BQXRCLEVBQThCSyxNQUE5QixFQUFzQztBQUNwQ0csZUFBT1IsWUFBVUssTUFBVixHQUFtQlAsV0FBbkI7QUFENkIsT0FBdEM7QUFHRDtBQUNGLEdBVEQ7O0FBV0EsU0FBT0UsTUFBUDtBQUNEOztBQUVEVSxPQUFPQyxPQUFQLEdBQWlCWixrQkFBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX1Byb21pc2UgZnJvbSAncHJvbWlzZSc7XG5cbmNvbnN0IG5vdEFzeW5jTWV0aG9kcyA9IFtcbiAgJ2xvZycsICdpbmZvJywgJ2RlYnVnJywgJ3RyYWNlJywgJ3N1Y2Nlc3MnLCAnZXJyb3InLCAnd2FybicsICdmYWlsdXJlJywgJ2NsZWFyTG9nJywgJ2dldExvZycsICdkb3dubG9hZEZpbGVMb2cnXTtcbmNvbnN0IHN1ZmZpeEFzeW5jID0gJ0FzeW5jJztcblxuLyoqXG4gKiBAcGFyYW0gIHtMb2dnZXJhZ2V9IGxvZ2dlclxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtMb2dnZXJhZ2V9XG4gKi9cbmZ1bmN0aW9uIGxvZ2dlcmFnZVByb21pc2lmeShsb2dnZXIsIG9wdGlvbnMgPSB7fSl7XG4gIGNvbnN0IHRoaXNPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgb25seUFzeW5jOiBmYWxzZVxuICB9LCBvcHRpb25zKTtcblxuICBub3RBc3luY01ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxvZ2dlciwgYCR7bWV0aG9kfSR7c3VmZml4QXN5bmN9YCwge1xuICAgICAgdmFsdWU6IF9Qcm9taXNlLmRlbm9kZWlmeShsb2dnZXJbYCR7bWV0aG9kfSR7c3VmZml4QXN5bmN9YF0pXG4gICAgfSk7XG4gICAgaWYoIXRoaXNPcHRpb25zLm9ubHlBc3luYyl7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobG9nZ2VyLCBtZXRob2QsIHtcbiAgICAgICAgdmFsdWU6IGxvZ2dlcltgJHttZXRob2R9JHtzdWZmaXhBc3luY31gXVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbG9nZ2VyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2dlcmFnZVByb21pc2lmeTtcbiJdfQ==