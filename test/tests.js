var _controller,
	_net,
	_xml,
	_ui,
	_util,
	_options;

//	Store real modules while mocks are in use.
(function() {
	_controller = validity.controller;
	_net = validity.net;
	_xml = validity.xml;
	_ui = validity.ui;
	_xml = validity.xml;
	_options = validity.options;
})();

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
		};

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
			tabs: {
				'0': {}
			},
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
		};
	}

	module('ui', lifecycle);

	test('setPageAction', function() {
		expect(2);

		validity.ui.setPageAction('0', 'default', 'Validity');
		equal(chrome.pageAction.tabs['0'].title, 'Validity', 'Title was set correctly');
		equal(chrome.pageAction.tabs['0'].icon, 'img/html_valid.png', 'Icon was set correctly');
	});
})();

/**
* Net Tests
*/

(function() {
	var _XMLHttpRequest,
		_ui,
		lifecycle = {
			setup: function() {
				_XMLHttpRequest = window.XMLHttpRequest;
				
				//	Mock XMLHttpRequest
				window.XMLHttpRequest = function() {
					var self = this;

					this.readyState = 0;
					this.onreadystatechange = function() {
						
					};
					this.open = function() {
						
					};
					this.send = function() {
						
					};
					this.setRequestHeader = function() {
						
					};

					window.setTimeout(function() {
						self.readyState = 4;
						self.status = 200;
						self.responseText = '<!doctype html><html><head><title></title></head><body></body></html>';
						self.responseXML = document.createDocumentFragment('<uri>http://not.used</uri>');
						self.responseXML.getElementsByTagName = function(tagName) {
							var mockNode = {};
							
							switch (tagName) {
								case 'uri':
									mockNode.textContent = 'http://not.used';
									break;
								case 'errorcount':
									mockNode.textContent = '0';
									break;
								case 'doctype' || 'charset':
									mockNode.textContent = '';
									break;
								case 'errorlist':
									mockNode.length = '0';
									mockNode[0] = {
										'getElementsByTagName': function() {
											return [];
										}
									};
									break;
								case 'warninglist':
									mockNode.length = '0';
									mockNode[0] = {
										'getElementsByTagName': function() {
											return [];
										}
									};
									break;
								default:
									break;
							}
							
							return mockNode;

						};
						self.onreadystatechange();
					}, 500);
				};
				
				_ui = window.validity.ui;
				//	Mock ui functionality
				window.validity.ui = {
					setPageAction: function() {
						
					}
				};
			},
			tearDown: function() {
				window.XMLHttpRequest = _XMLHttpRequest;
				window.validity.ui = _ui;
			}
		};

	module('net', lifecycle);

	asyncTest('getSource', function() {
		var mockTab = {
			id: '1',
			url: 'http://not.used'
		};
		
		expect(1);
		
		_net.getSource(mockTab, function(source) {
			equal(source, '<!doctype html><html><head><title></title></head><body></body></html>', 'Fetched source code for page');
			start();
		});
	});

	asyncTest('submitValidation', function() {
		var mockTab = {
			id: '2',
			'url': 'http://not.used'
		};
		
		expect(1);
		
		_net.submitValidation(mockTab, '', function() {
			ok(true, 'Submitted validation');
			start();
		});
		
	});
})();

/**
* Util Tests
*/

(function() {
	var lifecycle = {setup: function(){}, tearDown: function(){}};

	module('util', lifecycle);

	test('getHost', function() {
		expect(4);

		equal(validity.util.getHost('http://www.3doughnuts.com/'), 'www.3doughnuts.com', 'HTTP');
		equal(validity.util.getHost('http://www.hyphen-example.com/'), 'www.hyphen-example.com', 'hyphen');
		equal(validity.util.getHost('http://localhost/index'), 'localhost', 'localhost');
		equal(validity.util.getHost('chrome://extensions/'), '', 'chrome');
	});

	test('containsHost', function() {
		expect(6);

		equal(validity.util.containsHost('www.renyard.net', 'www.renyard.net'), true);
		equal(validity.util.containsHost('www.renyard.net', 'www.renyard.net www.bbc.co.uk'), true);
		equal(validity.util.containsHost('3doughnuts.com', 'www.renyard.net www.bbc.co.uk'), false);
		equal(validity.util.containsHost('3doughnuts.com', ''), false);
		equal(validity.util.containsHost('sub.domain.com', '*.domain.com'), true);
		equal(validity.util.containsHost('second.sub.domain.com', '*.domain.com'), true);
	});

	test('validProtocol', function() {
		expect(3);

		equal(validity.util.validProtocol('http://www.renyard.net/'), true, 'HTTP');
		equal(validity.util.validProtocol('https://www.bbc.co.uk/'), true, 'HTTPS');
		equal(validity.util.validProtocol('chrome://extensions'), false, 'chrome');
	});

	test('toBool', function() {
		expect(6);

		equal(validity.util.toBool(true), true);
		equal(validity.util.toBool(false), false);
		equal(validity.util.toBool('true'), true);
		equal(validity.util.toBool('false'), false);
		equal(validity.util.toBool('foo'), false);
		equal(validity.util.toBool(''), false);
	});

	test('createRegExp', function() {
		deepEqual(validity.util.createRegExp('/^www\\.renyard\\.net$/'), /^www\.renyard\.net$/);
		deepEqual(validity.util.createRegExp('/^www\\.foo\\-bar\\.com$/'), /^www\.foo\-bar\.com$/);
		deepEqual(validity.util.createRegExp('/^[\\w.]*\\.foo\\-bar\\.com$/'), /^[\w.]*\.foo\-bar\.com$/);
	});

	test('isRegExp', function() {
		expect(5);

		equal(validity.util.isRegExp('/^www.renyard.net$/'), true);
		equal(validity.util.isRegExp('/^[\\w.]*.renyard.net$/'), true);
		equal(validity.util.isRegExp('/^www.foo-bar.com$/'), true);
		equal(validity.util.isRegExp('www.renyard.net'), false);
		equal(validity.util.isRegExp('/^$/'), true);
	});

	test('escapeHostRegExp', function() {
		expect(7);

		equal(validity.util.escapeHostRegExp('www.renyard.net'), '/^www\\.renyard\\.net$/');
		equal(validity.util.escapeHostRegExp('www.foo-bar.com'), '/^www\\.foo\\-bar\\.com$/');
		equal(validity.util.escapeHostRegExp('localhost'), '/^localhost$/');
		equal(validity.util.escapeHostRegExp('*.renyard.net'), '/^[\\w\\.]*\\.renyard\\.net$/');
		equal(validity.util.escapeHostRegExp('*.foo-bar.*'), '/^[\\w\\.]*\\.foo\\-bar\\.[\\w\\.]*$/');
		equal(validity.util.escapeHostRegExp(' '), '/^ $/');
		equal(validity.util.escapeHostRegExp('  '), '/^  $/');
	});
})();

/**
* Options Tests
*/

(function() {
	var lifecycle = {setup: function(){}, tearDown: function(){}};

	module('options', lifecycle);

	test('addOptionToSelect/removeOptionsFromSelect', function() {
		var select = document.createElement('select'),
			body = document.body;

		//	Create select element with options.
		body.appendChild(select);
		validity.options.addOptionToSelect('foo', select);
		validity.options.addOptionToSelect('bar', select);

		expect(5);

		equal(select.length, 2);
		equal(select.getElementsByTagName('option')[0].innerText, 'foo');
		equal(select.getElementsByTagName('option')[1].innerText, 'bar');

		//	Select & remove first element.
		select.getElementsByTagName('option')[0].selected = true;
		validity.options.removeOptionsFromSelect(select);

		equal(select.length, 1);
		equal(select.getElementsByTagName('option')[0].innerText, 'bar');

		body.removeChild(select);
	});
})();
