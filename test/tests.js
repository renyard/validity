/**
 * Core Tests
 */

//	Mock Extension API
var chrome = {};

(function() {
	var lifecycle = {setup: mock, tearDown: function(){ok(true)}}

	function mock() {
		chrome = {extension: {onRequest: {addListener: function(){}}}}
	}

	module('core', lifecycle);

	test('dispatch', function() {
		expect(1);

		chrome.extension.onRequest.addListener = function(){
			ok(true);
		};

		validity.core.dispatch('init', {}, 'response');
	});
})();

(function() {
	var lifecycle = {setup: function() {}, tearDown: function(){}};

	module('xml', lifecycle);

	test('Valid Document', function() {
		var parser = new DOMParser(),
			response,
			xmlDoc = parser.parseFromString(xmlFixtures.valid, 'text/xml');
		expect(1);

		response = validity.xml.parseResponse(xmlDoc);
		same(response, {errorCount: 0, warningCount: 0});
	});
})();