'use strict';

import * as BaseSoapClient from 'dbc-node-basesoap-client';

let wsdl = null;
let defaults = {};

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */

function sendSearchRequest(params) {
  let opensearch = BaseSoapClient.client(wsdl, defaults, '');
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
export function init(config) {
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
export function getSearchResult(query = []) {
  let requests = [];
  query.forEach((value) => {
    const params = {
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

export function getWorkResult(query = []) {
  let requests = [];
  query.forEach((value) => {
    const params = {
      query: value.query,
      start: 1,
      stepValue: 1,
      allObjects: true,
      objectFormat: ['dkabm', 'briefDisplay']
    };
    requests.push(sendSearchRequest(params));
  });

  return requests;
}

export const METHODS = {
  getSearchResult: getSearchResult,
  getWorkResult: getWorkResult
};
