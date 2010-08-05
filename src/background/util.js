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
			hostRegExp = new RegExp(/^https?\:\/\/([\.a-zA-Z0-9]+)/);

		host = hostRegExp.exec(url)[1];

		return host;
	}

	validity.util = util;
	return validity;
})(validity || {});