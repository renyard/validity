/**
 * Controller Tests
 */

//	Mock Extension API
chrome.tabs = {};
chrome.extension = {};
chrome.pageAction = {};

(function() {
	var lifecycle = {setup: mock, tearDown: function(){
				validity.net = _net;
			}
		},
		_net;

	function mock() {
		//	Mock chrome extension API
		chrome.tabs = {};
		chrome.extension = {onRequest: {addListener: function(){}}, tabs: {}};

		//	Create reference to net module
		_net = validity.net;

		//	Mock net module
		validity.net = {
			getSource: function(url, callback) {
				var source = '<!doctype html><html><head><title></title></head><body></body></html>';
				callback(source);
			},
			submitValidation: function(tab, source, callback) {
				callback(tab);
			}
		};
	}

	module('controller', lifecycle);

	test('dispatch', function() {
		var validate = validity.controller.validate;
		expect(1);

		validity.controller.validate = function() {
			ok(true, 'Fired controller.validate');
		}

		validity.controller.dispatch({action:'validate'}, {}, function() {});

		validity.controller.validate = validate;
	});

	test('validate', function() {
		expect(1);

		chrome.tabs.sendRequest = function() {
			ok(true, 'Fired tabs.sendRequest');
		};

		validity.controller.validate({tab:{id:1234, url:'http://www.3doughnuts.com/'}});
	});
})();

/**
 * Net Tests
 */

/*(function() {
	var _XMLHttpRequest,
		lifecycle = {
			setup: function() {
				_XMLHttpRequest = window.XMLHttpRequest;
				
				//	Mock XMLHttpRequest
				window.XMLHttpRequest = function() {
					var that = this;

					this.readyState = 0;
					this.onreadystatechange = function() {
						
					};

					window.setTimeout(this.onreadystatechange, 500);
				}
			},
			tearDown: function() {
				window.XMLHttpRequest = _XMLHttpRequest;
			}
		};

	module('net', lifecycle);

	asyncTest('', function() {
		
	});
})();*/

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
		same(response, {"url":"http://www.bbc.co.uk/","doctype":"-//W3C//DTD XHTML 1.0 Strict//EN","errorCount":"0","messages":[],"source":{"encoding":"utf-8","type":"text/html"}});
	});

	test('Invalid Document', function() {
		var parser = new DOMParser(),
			response,
			xmlDoc = parser.parseFromString(xmlFixtures.invalid, 'text/xml');

		expect(1);

		response = validity.xml.parseResponse(xmlDoc);
		same(response, {"url":"http://www.renyard.net/","doctype":"HTML5","errorCount":"1","messages":[{"lastLine":6,"lastColumn":53,"message":"Bad value X-UA-Compatible for attribute http-equiv on element meta.","messageid":"html5","explanation":"  <p class=\"helpwanted\"><a href=\"http://validator.w3.org/feedback.html?uri=http%3A%2F%2Fwww.renyard.net%2F;errmsg_id=html5#errormsg\" title=\"Suggest improvements on this error message through our feedback channels\">&#x2709;</a></p>","type":"error"}],"source":{"encoding":"utf-8","type":"text/html"}});
	});
})();

/**
 * UI Tests
 */

(function() {
	var lifecycle = {setup: mock, tearDown: function(){}};

	//	Mock pageAction API
	function mock(){
		chrome.pageAction = {
			tabs: {},
			show: function(tabId) {
				this.tabs[tabId] = this.tabs[tabId] || {};
				this.tabs[tabId].visible = true;
			},
			setIcon: function(opts){
				var tabId = opts.tabId;
				this.tabs[tabId] = this.tabs[tabId] || {};
				this.tabs[tabId].icon = opts.path;
			},
			setTitle: function(opts){
				var tabId = opts.tabId;
				this.tabs[tabId] = this.tabs[tabId] || {};
				this.tabs[tabId].title = opts.title;
			}
		}
	}

	module('ui', lifecycle);

	test('setPageAction', function() {
		expect(2);

		validity.ui.setPageAction('0', 'default', 'Validity');
		equal('Validity', chrome.pageAction.tabs['0'].title, 'Title was set correctly');
		equal('img/html_valid.png', chrome.pageAction.tabs['0'].icon, 'Icon was set correctly');
	});
})();

/**
 * Util Tests
 */

(function() {
	var lifecycle = {setup: function(){}, tearDown: function(){}};

	module('util', lifecycle);

	test('getHost (http url)', function() {
		expect(1);

		equal('www.3doughnuts.com', validity.util.getHost('http://www.3doughnuts.com/'));
	});

	test('getHost (chrome url)', function(){
		expect(1);

		equal('', validity.util.getHost('chrome://extensions/'));
	});

	test('containsHost (true)', function() {
		expect(1);

		equal(true, validity.util.containsHost('www.renyard.net', 'www.renyard.net www.bbc.co.uk'));
	});

	test('containsHost (false)', function() {
		expect(1);

		equal(false, validity.util.containsHost('3doughnuts.com', 'www.renyard.net www.bbc.co.uk'));
	});

	test('validProtocol (http)', function() {
		expect(1);

		equal(true, validity.util.validProtocol('http://www.renyard.net/'));
	});

	test('validProtocol (https)', function() {
		expect(1);

		equal(true, validity.util.validProtocol('https://www.bbc.co.uk/'));
	});

	test('validProtocol (chrome)', function() {
		expect(1);

		equal(false, validity.util.validProtocol('chrome://extensions'));
	});
})();