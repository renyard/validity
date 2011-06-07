/**
 * @namespace
 * @name validity
 */

/**
 * @namespace
 * @name validity.controller
 */
var validity = (function(validity) {
	var controller = {},
		net = validity.net,
		ui = validity.ui,
		util = validity.util,
		enableHosts,
		autoValidateHosts,
		tabHost,
		tabUrls = {};

	controller.dispatch = function() {};

	console.log(controller);

	//	Public methods

	/**
	 * @method
	 * @public
	 * @name dispatch
	 */
	controller.dispatch = function(request, sender) {
		var tabHost,
			response = {};
		
		switch(request['action']) {
			case 'validate':
				controller.validate(sender.tab);
				break;
			case 'init':
				enableHosts = localStorage['enableHosts'];
				tabHost = validity.util.getHost(sender.tab.url);
				
				if (validity.util.containsHost(tabHost, enableHosts)) {
					controller._attachPageActions(sender.tab);
					response.attatchActions = true;
				}
				break;
			default:
				/*!debug*/
				throw 'Empty or invalid request: ' + request['action'];
				/*gubed!*/
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
	 */
	controller._attachPageActions = function(tab, validate) {
		//	Stop if we're not on an http or https URL
		if (!validity.util.validProtocol(tab.url)) {
			return;
		}

		//	Read options here in case they've been changed since last time
		enableHosts = localStorage['enableHosts'] || '';
		autoValidateHosts = localStorage['validateHosts'] || '';

		/*!debug*/
		console.info(tab.url);
		/*gubed!*/

		//	Extract host from URL
		tabHost = validity.util.getHost(tab.url);

		//	Set up Page Action
		validity.ui.init(tab.id);

		//	Auto validate if host is set in options
		if (validate) {
			controller.validate(tab);
		}
	};

	/**
	 * @method
	 * @private
	 */
	controller._init = function() {
		//	Listen for requests from content script
		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			var response;
			
			/*!debug*/
			console.info(request);
			console.info(sender);
			/*gubed!*/

			//	Pass request to the dispatch method
			response = controller.dispatch(request, sender);
			
			sendResponse(response);
		});

		//	Set up page action events
		chrome.pageAction.onClicked.addListener(function(tab) {
			controller.validate(tab);
		});

		//	Set up new tab event
		/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {

			chrome.tabs.get(tabId, function(tab) {
				var host,
					auto,
					validateHosts = localStorage['validateHosts'] || '';

				host = validity.util.containsHost(tab.url);
				auto = validity.util.containsHost(host, validateHosts);

				if (changeInfo.status === 'loading' && auto === false) {
					chrome.tabs.get(tabId, function(tab) {
						controller._attachPageActions(tab);
					});
				}
			});

		});*/
	};

	validity.controller = controller;
	return validity;
})(validity || {});