/**
 *
 */
var validity = (function() {
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
			if (xhrSource.readystate === 4) {
				if (xhrSource.status === 200) {
					callback(xhrSource.responseText);
				}
				else if (xhrSource.status === 400) {
					
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
	net.submitValidation = function(source, callback) {
		xhrValidator.onreadystatechange = function() {
			if (xhrValidator.readystate === 4) {
				if (xhrValidator.status === 200) {
					callback(xhrValidator.responseXML);
				}
				else if (xhrValidator.status === 400) {
					
				}
			}
		}

		//	Open the XHR connection and send data
		xhrValidator.open('POST', validator);
		xhrValidator.sendRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhrValidator.send('output=soap12&fragment='+encodeURIComponent(source));
	};

	validity.net = net;
	return validity;
})(validity || {});