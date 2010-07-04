/**
 * Validity
 * Core Module
 */
var validity = (function(validity) {
	var core = {};

	//	Public methods

	/**
	 * @method
	 * @public
	 * @name dispatch
	 */
	core.dispatch = function(request, sender, sendResponse) {
		switch(request) {
			case 'init':
					_init();
				break;
			case 'validate':
					_validate();
				break;
			default:
				throw 'Empty or invalid request: '  + request;
		}
	};

	//	Private Functions

	/**
	* @function
	* @private
	*/
	function _validate() {
		//	Fetch source
		validity.net.getSource(sender.tab.url, function(source) {
			//	Submit source to validator
			validity.net.submitValidation(source, function(messages) {
				chrome.tabs.sendRequest(tabId, {});
			});
		});
	}

	function _init() {
		//	Listen for requests from content script
		chrome.extension.onRequest.addListener();
	}

	validity.core = core;
	return validity;
})(validity || {});