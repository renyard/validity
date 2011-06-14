/**
 * @namespace
 * @name validity.net
 */
var validity = (function(validity) {
	/**
	 * @const
	 * @name DEFAULT_VALIDATOR
	 */
	const DEFAULT_VALIDATOR = 'http://validator.w3.org/check';
	var net = {};

	/**
	 * @function
	 * @public
	 * @name getSource
	 */
	net.getSource = function(tab, callback) {
		var xhrSource = new XMLHttpRequest();
		//	Update page action icon
		validity.ui.setPageAction(tab.id, 'connecting', 'Contacting validator...');
		xhrSource.onreadystatechange = function() {
			if (xhrSource.readyState === 4) {
				console.info(xhrSource);
				if (xhrSource.status === 200) {
					callback(xhrSource.responseText);
				}
				else {
					validity.ui.setPageAction(tab.id, 'error', 'Could not retrieve source: ' + xhrValidator.statusText);
				}
			}
		};

		xhrSource.open('GET', tab.url);
		xhrSource.send();
	};

	/**
	 * @function
	 * @public
	 * @name submitValidation
	 */
	net.submitValidation = function(tab, source, callback) {
		var validator,
			xhrValidator = new XMLHttpRequest();

		//	Set validator URL
		validator = localStorage['validator'] || DEFAULT_VALIDATOR;

		xhrValidator.onreadystatechange = function() {
			var response;
			if (xhrValidator.readyState === 4) {
				if (xhrValidator.status === 200) {
					response = validity.xml.parseResponse(xhrValidator.responseXML);
					if (response.errorCount > 0) {
						validity.ui.setPageAction(tab.id, 'invalid', response.errorCount + ' validation errors.');
					}
					else {
						validity.ui.setPageAction(tab.id, 'valid', 'Page is valid.');
					}
					callback(tab, response);
				}
				else {
					validity.ui.setPageAction(tab.id, 'error', 'Could not contact validator: ' + xhrValidator.statusText);
				}
			}
		}

		//	Open the XHR connection and send data
		xhrValidator.open('POST', validator);
		xhrValidator.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhrValidator.send('output=soap12&fragment='+encodeURIComponent(source));
	};

	validity.net = net;
	return validity;
})(validity || {});