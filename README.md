# dbc-node-opensearch-client

Node client for the DBC OpenSearch webservice https://opensource.dbc.dk/services/open-search-web-service.
Implements the searchOperation of the webservice for retrieving either a search result list or a work.

## OpenSearch.getSearchResult(values):Promise
Method for creating a search request with a query and a set of user provided and/or application specific
parameters.
This method returns a search result from the OpenSearch webservice as work collections, containing as many
works as specified by a 'stepValue' parameter, from the number in the 'start' parameter. The 'sort' parameter
decides the sorting of the search result.

Example
```
params = {
  query: 'harry potter',
  start: 1,
  stepValue: 10,
  sort: 'rank_frequency'
};

OpenSearch.getSearchResult(params);

```

## OpenSearch.getWorkResult(values):Promise
Method for creating a search request for a specific work given a specific identifier as a query. 
The method returns the first result from the OpenSearch webservice with all the manifestations in 
a work collection.

Example
```
params = {
  query: 'rec.id=870970-basis:21907960'
};

OpenSearch.getWorkResult(params);

```

## OpenSearch.init(config):METHODS
Init method for setting service wsdl (that has the service endpoint) and defaults through a config
object.
The method returns the methods available through this client.

Example
```
config = {
  wsdl: 'http://opensearch.addi.dk/3.2/opensearch.wsdl',
  agency: '000000',
  profile: 'test'
};

OpenSearch.init(config);

```