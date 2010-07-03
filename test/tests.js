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