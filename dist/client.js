'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;
exports.getSearchResult = getSearchResult;
exports.getWorkResult = getWorkResult;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeBasesoapClient = require('dbc-node-basesoap-client');

var BaseSoapClient = _interopRequireWildcard(_dbcNodeBasesoapClient);

var wsdl = null;
var defaults = {};

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */

function sendSearchRequest(params) {
  var opensearch = BaseSoapClient.client(wsdl, defaults, '');
  return opensearch.request('searchOperation', params, null, true);
}

/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */

function init(config) {
  if (!wsdl) {
    wsdl = config.wsdl;
  }
  defaults = {
    agency: config.agency,
    profile: config.profile
  };
}

/**
 * Constructs the objects of parameters for this type of request.
 * As the query is expected to be an array it is possible to make multiple
 * requests at once, each returned as a Promise.
 *
 * @param {Array} query Array of parameter-objects each representing a request
 * @return {Array} An array of promises is returned
 */

function getSearchResult() {
  var query = arguments[0] === undefined ? [] : arguments[0];

  var requests = [];
  query.forEach(function (value) {
    var params = {
      query: value.query,
      start: value.start,
      stepValue: value.stepValue,
      sort: value.sort,
      objectFormat: 'briefDisplay'
    };
    requests.push(sendSearchRequest(params));
  });

  return requests;
}

function getWorkResult() {
  var query = arguments[0] === undefined ? [] : arguments[0];

  var requests = [];
  query.forEach(function (value) {
    var params = {
      query: value.query,
      start: 1,
      stepValue: 1,
      allObjects: true
    };
    requests.push(sendSearchRequest(params));
  });

  return requests;
}

var METHODS = {
  getSearchResult: getSearchResult,
  getWorkResult: getWorkResult
};
exports.METHODS = METHODS;