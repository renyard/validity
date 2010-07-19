/**
 * @namespace
 * @name validity.ui
 */
var validity = (function(validity) {
	var ui = {},
		icons = {
			'default': 'img/html_valid.png',
			'connecting': 'img/connect.png',
			'valid': 'img/accept.png',
			'invalid': 'img/html_delete.png',
			'error': 'img/exclamation.png'
		};

	ui.setPageAction = function(tabId, icon, text) {
		chrome.pageAction.show(tabId);
		chrome.pageAction.setIcon({'tabId': tabId, 'path': icons[icon]});
		chrome.pageAction.setTitle({'tabId': tabId, 'title': text});
	}

	function _init() {
		//	Set up page action on new tabs
		chrome.tabs.onUpdated.addListener(function(tabId, change) {
			if (change.status === 'complete') {
				ui.setPageAction(tabId, 'default', 'Validate Document (Alt+Shift+V)');
			}
		});
	}

	_init();
	validity.ui = ui;
	return validity;
})(validity || {});