'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _chai = require('chai');

var _clientJs = require('../client.js');

var OpenSearch = _interopRequireWildcard(_clientJs);

describe('Test Open Search List Display', function () {
  it('Assert list display', function (done) {
    var timeout = 10000;
    this.timeout(timeout);
    setTimeout(done, timeout);

    var config = {
      wsdl: 'http://opensearch.addi.dk/3.2/opensearch.wsdl',
      agency: '150013',
      profile: 'opac'
    };

    OpenSearch.init(config);
    var result = OpenSearch.getSearchResult({
      query: 'harry',
      start: '1',
      stepValue: '10',
      sort: 'rank_frequency'
    });

    result.then(function (searchResult) {
      _chai.assert.equal(searchResult.result.collectionCount, '10', 'collectionCount is 10');
      // assert.equal(searchResult.result.sortUsed, 'rank_main_title', 'sort used is rank_main_title');
      _chai.assert.equal(searchResult.result.more, 'true', 'there is more');
      done();
    });
  });
});

describe('Test Open Search Work Display', function () {
  it('Assert work display', function (done) {
    var timeout = 10000;
    this.timeout(timeout);
    setTimeout(done, timeout);

    var config = {
      wsdl: 'http://opensearch.addi.dk/3.2/opensearch.wsdl',
      agency: '150013',
      profile: 'opac'
    };

    OpenSearch.init(config);
    var result = OpenSearch.getWorkResult({
      query: 'rec.id=870970-basis:25245784',
      sort: 'date_descending'
    });

    result.then(function (searchResult) {
      _chai.assert.equal(searchResult.result.collectionCount, '1', 'collectionCount is 1');
      _chai.assert.equal(searchResult.result.more, 'false', 'there is not more');
      _chai.assert.isAbove(searchResult.result.searchResult.collection.numberOfObjects, 3, 'work contains more than 3 manifestations');
      done();
    });
  });
});