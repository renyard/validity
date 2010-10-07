/**
 * @namespace
 * @name validity
 */

/**
 * @namespace
 * @name validity.core
 */
var validity = (function(validity) {
	/**
	 * @const
	 * @name CONTENT_SCRIPT
	 */
	const CONTENT_SCRIPT = '/validity.js';
	var core = {},
		net = validity.net,
		ui = validity.ui,
		util = validity.util;

	//	Public methods

	/**
	 * @method
	 * @public
	 * @name dispatch
	 */
	core.dispatch = function(request, sender, sendResponse) {
		switch(request['action']) {
			case 'validate':
				core.validate(sender.tab);
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
	core.validate = function(tab) {
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
	core._attachPageActions = function(tab) {
		var enableHosts = [],
		autoValidateHosts = [],
		tabHost,
		opts = localStorage;

		/*!debug*/
		console.info(tab.url);
		/*gubed!*/

		//	Split hosts to auto validate into an array
		/*if (opts['validateHosts'] !== undefined) {
			autoValidateHosts = localStorage['validateHosts'];
		}
		else {
			autoValidateHosts = '';
		}*/

		tabHost = validity.util.getHost(tab.url);

		//	Auto validate if host is set in options
		if (util.containsHost(tabHost, autoValidateHosts)) {

		}
		if (autoValidateHosts.indexOf(tabHost) > -1) {
			//	Set up Page Action
			validity.ui.init(tab.id);

			chrome.tabs.executeScript(tab.id, {
				file: CONTENT_SCRIPT
			}, function() {
				core.validate(tab);
			});
		}
		//	Inject content script if host is set in options
		//	...or if enableHosts is empty
		else if (enableHosts.indexOf(tabHost) > 0 || enableHosts.length === 0) {
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
	core._init = function() {
		//	Listen for requests from content script
		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			/*!debug*/
			console.info(request);
			console.info(sender);
			/*gubed!*/

			//	Pass request to the dispatch method
			core.dispatch(request, sender, sendResponse);
		});

		//	Set up page action events
		chrome.pageAction.onClicked.addListener(function(tab) {
			core.validate(tab);
		});

		//	Set up new tab event
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
			/*!debug*/
			console.info(changeInfo);
			/*gubed*/

			if (changeInfo.status === 'loading') {
				chrome.tabs.get(tabId, function(tab) {
					core._attachPageActions(tab);
				});
			}
		});
	}

	validity.core = core;
	return validity;
})(validity || {});