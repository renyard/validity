/**
 * @namespace
 * @name validity
 */

/**
 * @namespace
 * @name validity.controller
 */
var validity = (function(validity) {
	/**
	 * @const
	 * @name CONTENT_SCRIPT
	 */
	const CONTENT_SCRIPT = '/validity.js';
	var controller = {},
		net = validity.net,
		ui = validity.ui,
		util = validity.util;

	//	Public methods

	/**
	 * @method
	 * @public
	 * @name dispatch
	 */
	controller.dispatch = function(request, sender, sendResponse) {
		switch(request['action']) {
			case 'validate':
				controller.validate(sender.tab);
				break;
			default:
				/*!debug*/
				throw 'Empty or invalid request: ' + request['action'];
				/*gubed!*/
		}
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
	}

	//	Private Functions

	/**
	 * @method
	 * @private
	 */
	controller._attachPageActions = function(tab) {
		var enableHosts = localStorage['enableHosts'] || '',
		autoValidateHosts = localStorage['validateHosts'] || '',
		tabHost,
		opts = localStorage;

		//	Stop if we're not on an http or https URL
		if (!validity.util.validProtocol(tab.url)) {
			return;
		}

		/*!debug*/
		console.info(tab.url);
		/*gubed!*/

		//	Extract host from URL
		tabHost = validity.util.getHost(tab.url);

		//	Auto validate if host is set in options
		if (validity.util.containsHost(tabHost, autoValidateHosts)) {
			//	Set up Page Action
			//validity.ui.init(tab.id);

			chrome.tabs.executeScript(tab.id, {
				file: CONTENT_SCRIPT
			}, function() {
				controller.validate(tab);
			});
		}

		//	Inject content script if host is set in options
		//	...or if enableHosts is empty
		else if (validity.util.containsHost(tabHost, enableHosts) || enableHosts.length === 0) {
			//	Set up Page Action
			validity.ui.init(tab.id);

			chrome.tabs.executeScript(tab.id, {
				file: CONTENT_SCRIPT
			});
		}
	}

	/**
	 * @method
	 * @private
	 */
	controller._init = function() {
		//	Listen for requests from content script
		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			/*!debug*/
			console.info(request);
			console.info(sender);
			/*gubed!*/

			//	Pass request to the dispatch method
			controller.dispatch(request, sender, sendResponse);
		});

		//	Set up page action events
		chrome.pageAction.onClicked.addListener(function(tab) {
			controller.validate(tab);
		});

		//	Set up new tab event
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {

			chrome.tabs.get(tabId, function(tab) {
				var host,
					auto,
					validateHosts = localStorage['validateHosts'] || '';

				/*!debug*/
				console.info(changeInfo);
				/*gubed!*/

				host = validity.util.containsHost(tab.url);
				auto = validity.util.containsHost(host, validateHosts);

				if (changeInfo.status === 'loading' && auto === false) {
					chrome.tabs.get(tabId, function(tab) {
						controller._attachPageActions(tab);
					});
				}
			});


		});
	}

	validity.controller = controller;
	return validity;
})(validity || {});