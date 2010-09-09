/**
 * @namespace
 * @name validity.util
 */
var validity = (function(validity) {
	var util = {};

	//	Public Methods

	/**
	 * @function
	 * @name getHost
	 */
	util.getHost = function(url) {
		var host,
			backRefs = [],
			hostRegExp = new RegExp(/^https?\:\/\/([\.a-zA-Z0-9]+)/);

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
	}

	validity.util = util;
	return validity;
})(validity || {});