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
					core.validate(sender);
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
	core.validate = function(tab) {
		//	Fetch source
		validity.net.getSource(tab, function(source) {
			//	Submit source to validator
			validity.net.submitValidation(tab, source, function(tab, messages) {
				chrome.tabs.sendRequest(tab.id, messages);
			});
		});
	}

	function _init() {
		//	Listen for requests from content script
		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			/*!debug*/
			console.info(request);
			console.info(sender);
			/*gubed!*/
			core.validate(sender.tab);
		});
		//	Set up page action events
		chrome.pageAction.onClicked.addListener(function(tab) {
			core.validate(tab);
		});
	}

	_init();
	validity.core = core;
	return validity;
})(validity || {});