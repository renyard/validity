/**
 * @namespace
 * @name validity.nu
 */
var validity = (function(validity) {
	"use strict";
	var nu = {};

	// Public Methods

	/**
	 * @function
	 * @public
	 * @name parseResponse
	 */
	nu.parseResponse = function(response) {
		var data = JSON.parse(response),
			errors = 0,
			warnings = 0,
			messages = [];

		data.messages.forEach(m => messages.push({
				explanation: '',
				lastColumn: m.lastColumn,
				lastLine: m.lastLine,
				message: m.message,
				messageid: '',
				type: m.subType === 'warning'?'warn':'error'
		}));

		// Count errors and warnings.
		messages.forEach((m) => {
			switch (m.type) {
				case 'error':
					errors++;
					break;
				case 'warn':
					warnings++;
					break;
			}
		});

		return {
			doctype: '',
			url: data.url,
			errorCount: errors,
			warningCount: warnings,
			messages: messages
		};
	};

	validity.nu = nu;
	return validity;
})(validity || {});
