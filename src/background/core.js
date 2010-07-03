/**
 *
 */
(function(validity) {
	var core = {};

	//	Public methods

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

	//	Private Methods

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

	//	Create validity namespace if required
	validity = validity;
	validity.core = core;
})(validity || {});