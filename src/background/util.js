/**
 * @namespace
 * @name validity.util
 */
var validity = (function(validity) {
	"use strict";
	var util = {},
		readyQueue = [];

	//	Public Methods

	/*
	* @method
	* @name ready
	*/
	util.ready = function(func) {
		//	If document is ready, run the function immediatly.
		if (document.readyState === 'complete') {
			func();
		} else {
			readyQueue.push(func);
		}
	};

	/*
	* @method
	* @name _init
	*/
	util._init = function() {
		//	Loop over readyQueue, executing each function.
		for (var i = 0; i < readyQueue.length; i++) {
			readyQueue[i]();
		}
	};

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
		var match = validHosts.some(function(element) {
			//	Create a new regexp from valid host.
			var hostRegExp;

			//	Test if host should be treated as a RegExp
			if (!/^\/.*?\/$/.test(element)) {
				//	Not a RegExp, convert to one.
				element = util.escapeHostRegExp(element);
			}

			hostRegExp = new RegExp(element);

			return hostRegExp.test(host);
		});

		return match;
	};

	/**
	* @method
	* @name escapeHostRegExp
	*/
	util.escapeHostRegExp = function(string) {
		if (string === '') {
			//	Match an empty string.
			return (/^$/);
		}
		return string.replace(/[-.]/g, '\\$&');
	};

	util._init();

	validity.util = util;
	return validity;
})(validity || {});
