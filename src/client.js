'use strict';

import * as BaseSoapClient from 'dbc-node-basesoap-client';

let wsdl = null;
let defaults = {};
let Logger = null;

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */

function sendSearchRequest(params) {
  let opensearch = BaseSoapClient.client(wsdl, defaults, Logger);
  return opensearch.request('search', params, null, true);
}

/**
 * Constructs the object of parameters for search result request.
 *
 * @param {Object} value Object with parameters for getting a search result
 * @return {Promise}
 */
export function getSearchResult(values) {
  const params = {
    query: values.query,
    stepValue: values.stepValue,
    start: values.start,
    sort: values.sort,
    objectFormat: 'briefDisplay',
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
export function getWorkResult(values) {
  const params = {
    query: values.query,
    start: 1,
    stepValue: 1,
    allObjects: true,
    objectFormat: ['dkabm', 'briefDisplay'],
    relationData: 'full'
  };
  return sendSearchRequest(params);
}

export const METHODS = {
  getSearchResult: getSearchResult,
  getWorkResult: getWorkResult
};

/**
 * Setting the necessary paramerters for the client to be usable.
 * The wsdl is only set if wsdl is null to allow setting it through
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

  if (config.logger && !Logger) {
    Logger = config.logger;
  }

  return METHODS;
}
