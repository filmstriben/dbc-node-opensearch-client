'use strict';

import {expect, assert} from 'chai';
import * as OpenSearch from  '../src/client.js';
import * as prep from  '../src/response-preparation.js';

describe('Test Open Search List Display', () => {
	it('Assert list display', function(done) {
	    this.timeout(10000);
  		setTimeout(done, 10000);
		const config = {
			wsdl: "http://opensearch.addi.dk/3.2/opensearch.wsdl",
			agency: "150013",
			profile: "opac",
			objectFormat: "briefDisplay",
		}
		
		OpenSearch.init(config);
		let result = OpenSearch.getSearchResult([{
			query: "rec.id=870970-basis:2225285", 
			start: "1", 
			stepValue: "10", 
			sort: 'rank_frequency', 
			allObjects: 'false'
		}]);
		
		result[0].then(function (searchResult) {
			assert.equal(searchResult.result.collectionCount, "10", "collectionCount is 10");
			assert.equal(searchResult.result.sortUsed, "rank_main_title", "sort used is rank_main_title");
			assert.equal(searchResult.result.more, "true", "there is more");
			done();
		});
	});
});

describe('Test Open Search Work Display', () => {
	it('Assert work display', function(done) {
	    this.timeout(10000);
  		setTimeout(done, 10000);
		const config = {
			wsdl: "http://opensearch.addi.dk/3.2/opensearch.wsdl",
			agency: "150013",
			profile: "opac",
			objectFormat: "briefDisplay",
		}
		
		OpenSearch.init(config);
		let result = OpenSearch.getSearchResult([{
			query: "rec.id=870970-basis:22629344", 
			start: "1", 
			stepValue: "1", 
			sort: 'date_descending', 
			allObjects: 'true'
		}]);
		
		result[0].then(function (searchResult) {
			assert.equal(searchResult.result.collectionCount, "1", "collectionCount is 1");
			assert.equal(searchResult.result.more, "false", "there is not more");
			assert.isAbove(searchResult.result.searchResult.collection.numberOfObjects, 5, "work contains more than 5 manifestations");
			done();
		});
	});
});