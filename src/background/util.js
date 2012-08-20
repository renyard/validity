/**
 * @namespace
 * @name validity.util
 */
var validity = (function(validity) {
	var util = {};

	//	Public Methods

	/*
	* @method
	* @name toBool
	*/
	util.toBool = function(input) {
		if (typeof input === 'string') {
			return input.toLowerCase() === 'true';
		}
		return !!input;
	};

	/**
	* @method
	* @name getHost
	*/
	util.getHost = function(url) {
		var host,
			backRefs = [],
			hostRegExp = new RegExp(/^https?\:\/\/([\.\-a-zA-Z0-9]+)/);

		//	Host is the first back reference
		backRefs = hostRegExp.exec(url);

		//	No matches for non-http URLs e.g. chrome://, file://
		if (backRefs !== null && backRefs.length > 1) {
			host = backRefs[1];
		}
		//	Return empty string if no matches
		else {
			host = '';
		}

		return host;
	};

	/**
	* @method
	* @name validProtocol
	*/
	util.validProtocol = function(url) {
		var valid,
			backRefs = [],
			protocolRegExp = new RegExp(/^(https?)/);

		valid = protocolRegExp.test(url);

		return valid;
	};

	/**
	* @method
	* @name containsHost
	*/
	util.containsHost = function(host, validHosts) {
		var hosts;

		//	Will be undefined if it's never been set
		if (typeof validHosts !== 'string') {
			return false;
		}
		/*else if (validHosts === '') {
			return true;
		}*/

		//	Split hosts into array
		hosts = validHosts.split(' ');

		/*!debug*/
		console.info(hosts.indexOf(host));
		/*gubed!*/

		// For each host in our validHosts string...
		for (var i = 0; i < hosts.length; i++) {
			// Lets build a regex to test if this host matches the test string:
			//  * Quote regex characters in the test string, so nothing crazy happens
			//  * Turn stars in the test string back to 'anything goes' (.*)
			//  * Wrap it with ^ and $ so the test string has to match the entire host
			//  * Make it a regex!
			var testRegex = new RegExp("^" + util.quoteRegex(hosts[i]).replace(/\\\*/g, ".*") + "$");

			if (testRegex.test(host)) { // If it matches, we've found our host.
				return true;
			}
		}

		// .. Huh. We've tried all the valid hosts. I guess the host isn't here.
		return false;

	};

	/**
	 * Makes a string safe for use in a regex by escaping special characters.
	 * Source: http://stackoverflow.com/questions/2593637/how-to-escape-regular-expression-in-javascript#answer-2593661
	 *
	 * @method
	 * @name quoteRegex
	 */
	util.quoteRegex = function (stringToQuote) {
		return (stringToQuote+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
	}

	validity.util = util;
	return validity;
})(validity || {});
