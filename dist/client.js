'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getSearchResult = getSearchResult;
exports.getWorkResult = getWorkResult;
exports.init = init;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeBasesoapClient = require('dbc-node-basesoap-client');

var BaseSoapClient = _interopRequireWildcard(_dbcNodeBasesoapClient);

var wsdl = null;
var defaults = {};
var Logger = null;

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */

function sendSearchRequest(params) {
  var opensearch = BaseSoapClient.client(wsdl, defaults, Logger);
  return opensearch.request('search', params, null, true);
}

/**
 * Constructs the object of parameters for search result request.
 *
 * @param {Object} value Object with parameters for getting a search result
 * @return {Promise}
 */

function getSearchResult(values) {
  var params = {
    query: values.query,
    stepValue: values.stepValue,
    start: values.start,
    objectFormat: 'dkabm',
    facets: values.facets || {}
  };
  return sendSearchRequest(params);
}

/**
 * Constructs the object of parameters for work request.
 *
 * @param {Object} value Object with parameters for getting a work
 * @return {Promise}
 */

function getWorkResult(values) {
  var params = {
    query: values.query,
    start: 1,
    stepValue: 1,
    allObjects: true,
    objectFormat: 'dkabm',
    relationData: 'full'
  };
  return sendSearchRequest(params);
}

var METHODS = {
  getSearchResult: getSearchResult,
  getWorkResult: getWorkResult
};

exports.METHODS = METHODS;
/**
 * Setting the necessary paramerters for the client to be usable.
 * The wsdl is only set if wsdl is null to allow setting it through
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

  if (config.logger && !Logger) {
    Logger = config.logger;
  }

  return METHODS;
}
