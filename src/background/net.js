/**
 * @namespace
 * @name validity.net
 */
var validity = (function(validity) {
	var net = {},
		validator = localStorage['validator'] || 'http://validator.w3.org/check',
		xhrSource = new XMLHttpRequest(),
		xhrValidator = new XMLHttpRequest();

	/**
	 * @function
	 * @public
	 * @name getSource
	 */
	net.getSource = function(url, callback) {
		xhrSource.onreadystatechange = function() {
			if (xhrSource.readyState === 4) {
				console.info(xhrSource);
				if (xhrSource.status === 200) {
					callback(xhrSource.responseText);
				}
				else if (xhrSource.status === 400) {
					//	TODO: Handle errors
				}
			}
		};

		xhrSource.open('GET', url);
		xhrSource.send();
	};

	/**
	 * @function
	 * @public
	 * @name submitValidation
	 */
	net.submitValidation = function(sender, source, callback) {
		xhrValidator.onreadystatechange = function() {
			var response;
			if (xhrValidator.readyState === 4) {
				if (xhrValidator.status === 200) {
					response = validity.xml.parseResponse(xhrValidator.responseXML);
					callback(sender, response);
				}
				else if (xhrValidator.status === 400) {
					//	TODO: Handle errors
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