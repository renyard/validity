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
			infos = 0,
			messages = [];

		data.messages.forEach(m => messages.push({
				explanation: '',
				lastColumn: m.lastColumn,
				lastLine: m.lastLine,
				message: m.message,
				messageid: '',
				type: m.type === 'info' && m.subType === 'warning' ? 'warn' : m.type === 'info' ? 'info' : 'error'
		}));

		// Count errors, warnings and info messages.
		messages.forEach((m) => {
			switch (m.type) {
				case 'error':
					errors++;
					break;
				case 'warn':
					warnings++;
					break;
				case 'info':
					infos++;
					break;
			}
		});

		return {
			doctype: '',
			url: data.url,
			errorCount: errors,
			warningCount: warnings,
			infoCount: infos,
			messages: messages
		};
	};

	validity.nu = nu;
	return validity;
})(validity || {});
