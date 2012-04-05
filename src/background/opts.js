"use strict";

/**
* @namespace
* @name validity.opts
*/

var validity = (function (validity) {
	var opts = {},
		options = {},
		storage,
		bools = [
			"collapseResults"
		];

	opts.option = function(opt, value) {
		var bools = [
				"collapseResults"
			],
			storage = opts.storage();

		if (value === undefined) {
			//	Return option's value.
			value = storage[opt];

			for (var i = 0; i < bools.length; i++) {
				if (opt === bools[i]) {
					//	Cast to boolean.
					value = validity.util.toBool(value);
				}
			}
		}
		else {
			//	Set option to value.
			storage[opt] = value;

			value = storage[opt];
		}

		return value;
	};

	/**
	* @method
	* @name storage
	*/
	opts.storage = function(mock) {
		if (mock) {
			storage = mock;
		}
		else if (storage === undefined) {
			storage = window.localStorage;
		}

		return storage;
	};

	function _load() {
		options = JSON.parse(opts.storage()['options']);
	}

	function _save() {
		opts.storage()['options'] = JSON.stringify(options);
	}

	validity.opts = opts;
	return validity;
})(validity || {});
