/**
 * Core Tests
 */

//	Mock Extension API
var chrome = chrome || {};

(function() {
	var lifecycle = {setup: mock, tearDown: function(){
				validity.net = _net;
			}
		},
		_net;

	function mock() {
		//	Mock chrome extension API
		chrome.extension = {onRequest: {addListener: function(){}}, tabs: {}};

		//	Create reference to net module
		_net = validity.net;

		//	Mock net module
		validity.net = {
			getSource: function(url, callback) {
				var source = '<!doctype html><html><head><title></title></head><body></body></html>';
				callback(source);
			},
			submitValidation: function(source, callback) {
				callback({});
			}
		};
	}

	module('core', lifecycle);

	test('dispatch', function() {
		expect(1);

		chrome.extension.onRequest.addListener = function(){
			ok(true, 'Fired onRequest.addListener');
		};

		validity.core.dispatch('init', {}, 'response');
	});

	test('_validate', function() {
		expect(1);

		chrome.tabs.sendRequest = function() {
			ok(true, 'Fired tabs.sendRequest');
		};

		validity.core._validate({tab:{id:1234, url:'http://www.3doughnuts.com/'}});
	});
})();

/**
 * XML Tests
 */

(function() {
	var lifecycle = {setup: function() {}, tearDown: function(){}};

	module('xml', lifecycle);

	test('Valid Document', function() {
		var parser = new DOMParser(),
			response,
			xmlDoc = parser.parseFromString(xmlFixtures.valid, 'text/xml');

		expect(1);

		response = validity.xml.parseResponse(xmlDoc);
		same(response, {"url": "http://www.bbc.co.uk/", "messages": [], "source": {"encoding": "utf-8", "type": "text/html"}});
	});

	test('Invalid Document', function() {
		var parser = new DOMParser(),
			response,
			xmlDoc = parser.parseFromString(xmlFixtures.invalid, 'text/xml');

		expect(1);

		response = validity.xml.parseResponse(xmlDoc);
		same(response, { "url": "http://www.renyard.net/", "messages": [ { "lastLine": 6, "lastColumn": 53, "message": "Bad value X-UA-Compatible for attribute http-equiv on element meta.", "messageid": "html5", "explanation": " <p class=\"helpwanted\"><a href=\"http://validator.w3.org/feedback.html?uri=http%3A%2F%2Fwww.renyard.net%2F;errmsg_id=html5#errormsg\" title=\"Suggest improvements on this error message through our feedback channels\">&#x2709;</a></p>", "type": "error" } ], "source": { "encoding": "utf-8", "type": "text/html" } });
	});
})();