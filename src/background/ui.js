/**
 * @namespace
 * @name validity.ui
 */
var validity = (function(validity) {
	"use strict";
	var ui = {},
		icons = {
			'default': {
				'19': 'icons/19.png',
				'38': 'icons/38.png'
			},
			'connecting': {
				'19': 'img/connecting/19.png',
				'38': 'img/connecting/38.png'
			},
			'valid': {
				'19': 'img/valid/19.png',
				'38': 'img/valid/38.png'
			},
			'invalid': {
				'19': 'img/invalid/19.png',
				'38': 'img/invalid/38.png'
			},
			'error': {
				'19': 'img/error/19.png',
				'38': 'img/error/38.png'
			}
		};

	ui.init = function(tabId) {
		//	Set up page action on new tabs
		ui.setPageAction(tabId, 'default', 'Validate Document (Alt+Shift+V)');
	};

	ui.setPageAction = function(tabId, icon, text) {
		chrome.pageAction.show(tabId);
		chrome.pageAction.setIcon({'tabId': tabId, 'path': icons[icon]});
		if (typeof text === 'string') {
			chrome.pageAction.setTitle({'tabId': tabId, 'title': text});
		}
	};

	validity.ui = ui;
	return validity;
})(validity || {});
