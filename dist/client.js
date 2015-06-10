"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.getSearchResult = getSearchResult;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _basesoapClientJs = require("./basesoap.client.js");

var BaseSoapClient = _interopRequireWildcard(_basesoapClientJs);

var wsdl = null;
var defaults = {};

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */

function sendSearchRequest(params) {
  console.log("sendSearchRequest: ");
  console.log(params);
  return new Promise(function (resolve, reject) {
    var opensearch = BaseSoapClient.client(wsdl, defaults, "");
    opensearch.request("search", params, function (data, response) {
      resolve(data);
    });
  });
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
    profile: config.profile,
    objectFormat: config.objectFormat,
    outputType: config.outputType
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
  console.log("getSearchResult: ");
  console.log(query);
  query.forEach(function (value) {
    var params = {
      query: value.query,
      start: value.start,
      stepValue: value.stepValue,
      sort: value.sort,
      allObjects: value.allObjects
    };
    requests.push(sendSearchRequest(params));
  });

  console.log("getSearchResult result: ");
  console.log(requests);

  return requests;
}