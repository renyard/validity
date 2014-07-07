/**
* @namespace
* @name validity
*/

/**
* @namespace
* @name validity.controller
*/
var validity = (function(validity) {
	"use strict";
	var controller = {},
		net = validity.net,
		ui = validity.ui,
		util = validity.util,
		enableHosts,
		autoValidateHosts,
		tabHost,
		tabUrls = {};

	//	Public methods

	/**
	* @method
	* @public
	* @name dispatch
	*/
	controller.dispatch = function(request, sender) {
		var tabHost,
			enabledForHost,
			autoValidateForHost,
			response = {},
			opts = {};

		switch(request.action) {
			case 'validate':
				controller.validate(sender.tab);
				break;
			case 'init':
				enableHosts = validity.opts.option('enableHosts');
				autoValidateHosts = validity.opts.option('validateHosts') || [];
				tabHost = validity.util.getHost(sender.tab.url);
				
				//	Enable if no hosts are set. (i.e. Not an array or with zero length.)
				if (Object.prototype.toString.call(enableHosts) !== '[object Array]' || enableHosts.length < 1) {
					enabledForHost = true;
				}
				else {
					enabledForHost = validity.util.containsHost(tabHost, enableHosts);
				}
				
				autoValidateForHost = validity.util.containsHost(tabHost, autoValidateHosts);
				
				if (enabledForHost || autoValidateForHost) {
					controller._attachPageActions(sender.tab);
					response.attatchActions = true;
				}
				
				if (autoValidateForHost) {
					controller.validate(sender.tab);
				}
				break;
			case 'options':
				if (validity.opts.option('collapseResults') !== undefined) {
					opts.collapseResults = validity.util.toBool(validity.opts.option('collapseResults'));
				}
				else {
					opts.collapseResults = true;
				}
				response = opts;
				break;
			default:
				throw 'Empty or invalid request.';
		}
		
		return response;
	};

	/**
	* @method
	* @public
	*/
	controller.validate = function(tab) {
		//	Fetch source
		validity.net.getSource(tab, function(source) {
			//	Submit source to validator
			validity.net.submitValidation(tab, source, function(tab, messages) {
				chrome.tabs.sendRequest(tab.id, messages);
			});
		});
	};

	//	Private Functions

	/**
	* @method
	* @private
	* @param Tab Tab object on which to attach actions.
	*/
	controller._attachPageActions = function(tab, validate) {
		//	Stop if we're not on an http or https URL
		if (!validity.util.validProtocol(tab.url)) {
			return;
		}

		//	Read options here in case they've been changed since last time
		enableHosts = validity.opts.option('enableHosts') || [];
		autoValidateHosts = validity.opts.option('validateHosts') || [];

		//	Extract host from URL
		tabHost = validity.util.getHost(tab.url);

		//	Set up Page Action
		validity.ui.init(tab.id);

		//	Auto validate if host is set in options
		/*if (validate) {
			controller.validate(tab);
		}*/
	};

	/**
	* @method
	* @private
	*/
	controller._init = function() {
		//	Listen for requests from content script
		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			var response;

			//	Pass request to the dispatch method
			response = controller.dispatch(request, sender);
			
			sendResponse(response);
		});

		//	Set up page action events
		chrome.pageAction.onClicked.addListener(function(tab) {
			controller.validate(tab);
		});
	};

	validity.controller = controller;
	return validity;
})(validity || {});

document.addEventListener('DOMContentLoaded', validity.controller._init, false);
