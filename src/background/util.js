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
		var hosts,
			regexp;

		//	Will be undefined if it's never been set
		if (typeof validHosts !== 'string') {
			return false;
		}

		//	Split hosts into array
		hosts = validHosts.split(' ');

		/*!debug*/
		console.info(hosts.indexOf(host));
		/*gubed!*/

		//	Loop through hosts and test against regexp.
		for (var i = hosts.length - 1; i >= 0; i--) {
			regexp = util.escapeHostRegExp(hosts[i]);
			regexp = util.createRegExp(regexp);
			if (regexp.test(host)) {
				return true;
			}
		}

		return false;

		/*if (hosts.indexOf(host) > -1) {
			return true;
		}
		else {
			return false;
		}*/
	};

	/**
	* @method
	* @name createRegExp
	*/
	util.createRegExp = function(string) {
		var regexp;

		//	Strip / from start and end of string.
		string = string.replace(/^\/|\/$/g, '');

		//	Create Regular Expression.
		regexp = new RegExp(string);

		return regexp;
	}

	/**
	* @method
	* @name isRegExp
	*/
	util.isRegExp = function(string) {
		//	If the string starts with a /, assume it's a regular expression.
		var regexp = /^\//;
		return regexp.test(string);
	}

	/**
	* @method
	* @name escapeHostRegExp
	*/
	util.escapeHostRegExp = function(string) {
		var regexp;

		//	If the string is a regular expression already, just return it.
		if (util.isRegExp(string)) {
			return string;
		}

		//	Shouldn't ever be an empty string, but just in case...
		if (string === '') {
			//	Match an empty string.
			return '/^$/';
		}

		//	Escape special characters.
		//regexp = string.replace(/[-.]/g, '\\$&');
		regexp = string.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

		//	Allow wildcards, replace with non-whitespace.
		regexp = regexp.replace(/\\\*/g, '[\\w\\.]*');

		//	Wrap in start and end.
		regexp = '/^' + regexp +'$/';
		return regexp;
	}

	validity.util = util;
	return validity;
})(validity || {});
