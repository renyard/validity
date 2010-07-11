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
	core.dispatch = function(sender) {
		switch(request['action']) {
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
		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			/*!debug*/console.info(request);
			console.info(sender);/*gubed!*/
			_validate(sender);
		});
	}/*!debug*/

	//	Expose private functions for testing
	core._validate = _validate;
	/*gubed!*/

	_init();
	validity.core = core;
	return validity;
})(validity || {});