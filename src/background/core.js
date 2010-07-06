/**
 * @namespace
 * @name validity
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
					_validate(sender);
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
	function _validate(sender) {
		//	Fetch source
		validity.net.getSource(sender.tab.url, function(source) {
			//	Submit source to validator
			validity.net.submitValidation(source, function(messages) {
				chrome.tabs.sendRequest(sender.tab.id, messages);
			});
		});
	}

	function _init() {
		//	Listen for requests from content script
		chrome.extension.onRequest.addListener();
	}

	/*!debug*/
	//	Expose private functions for testing
	core._validate = _validate;
	/*gubed!*/

	validity.core = core;
	return validity;
})(validity || {});