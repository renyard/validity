/**
* @namespace
* @name validity.opts
*/

var validity = (function (validity) {
	"use strict";
	var opts = {},
		options = {},
		backend,
		storage;

	opts.option = function(opt, value) {
		var returnVal;

		if (value !== undefined) {
			//	Set option to value.
			opts._set(opt, value);
		}
		returnVal = opts._get(opt);

		return returnVal;
	};

	/**
	* @method
	* @name _get
	*/
	opts._get = function(key) {
		return options[key];
	};

	/**
	* @method
	* @name _set
	*/
	opts._set = function(key, value) {
		options[key] = value;
		opts._save();
		return value;
	};

	/**
	* @method
	* @name storage
	*/
	opts._init = function() {
		opts._load();
		// Load new options on change.
		chrome.storage.onChanged.addListener(opts._load);
	};

	/**
	* @method
	* @name backend
	*/
	opts.backend = function(storageObj) {
		if (storageObj) {
			backend = storageObj;
		}
		else if (backend === undefined) {
			backend = chrome.storage.sync;
		}
		return backend;
	};

	/**
	* @method
	* @name _localCache
	*/
	opts._localCache = {
		get: function() {
			options = JSON.parse(window.localStorage.getItem('options')) || {};
			return options;
		},
		set: function() {
			return window.localStorage.setItem('options', JSON.stringify(options));
		}
	};

	/**
	* @method
	* @name _load
	*/
	opts._load = function() {
		opts.backend().get('options', function(obj) {
			if (obj.options !== undefined) {
				options = JSON.parse(obj.options);
			}
		});
		return opts._localCache.get();
	};

	/**
	* @method
	* @name _save
	*/
	opts._save = function() {
		// Store as a single JSON object, so we can cache in memory.
		opts.backend().set({'options': JSON.stringify(options)});
		return opts._localCache.set();
	};

	opts._init();

	validity.opts = opts;
	return validity;
})(validity || {});
