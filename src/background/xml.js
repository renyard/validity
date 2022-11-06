/**
 * @namespace
 * @name validity.xml
 */
var validity = (function(validity) {
	"use strict";
	var xml = {},
		suppressed = [
			// Deprecated in favour of nu validator.
			'obsolete-interface',
			// Direct input.
			'W28'
		];

	//	Public Methods

	/**
	 * @function
	 * @public
	 * @name parseResponse
	 */
	xml.parseResponse = function(xmlDom) {
		var response = {
				"url": undefined,
				"doctype": undefined,
				"errorCount": undefined,
				"warningCount": undefined,
				"infoCount": undefined,
				"messages": undefined,
				"source": {
					"encoding": undefined,
					"type": "text/html"
				}
			},
			errors = [],
			warnings = [],
			infos = [],
			messages = [],
			errorNodes,
			warningNodes;
			infoNodes;

		response.url = _getFirstTagName(xmlDom, 'uri').textContent;
		response.doctype = _getFirstTagName(xmlDom, 'doctype').textContent;
		response.source.encoding = _getFirstTagName(xmlDom, 'charset').textContent;

		errorNodes = _getFirstTagName(xmlDom, 'errorlist').getElementsByTagName('error');
		warningNodes = _getFirstTagName(xmlDom, 'warninglist').getElementsByTagName('warning');
		infoNodes = _getFirstTagName(xmlDom, 'infolist').getElementsByTagName('info');

		//	Loop through errors
		for (var i = 0; i < errorNodes.length; i++) {
			//	Create object for error
			errors[i] = {};

			errors[i].lastLine = parseInt(_getFirstTagName(errorNodes[i], 'line').textContent, 10);
			errors[i].lastColumn = parseInt(_getFirstTagName(errorNodes[i], 'col').textContent, 10);
			errors[i].message = _getFirstTagName(errorNodes[i], 'message').textContent;
			errors[i].messageid = _getFirstTagName(errorNodes[i], 'messageid').textContent;
			errors[i].explanation = _getFirstTagName(errorNodes[i], 'explanation').textContent;
			errors[i].type = 'error';
		}

		//	Loop through warnings
		for (var j = 0; j < warningNodes.length; j++) {
			//	Create object for warning
			warnings[j] = {};

			warnings[j].lastLine = parseInt(_getFirstTagName(warningNodes[j], 'line').textContent, 10);
			warnings[j].lastColumn = parseInt(_getFirstTagName(warningNodes[j], 'col').textContent, 10);
			warnings[j].message = _getFirstTagName(warningNodes[j], 'message').textContent;
			warnings[j].messageid = _getFirstTagName(warningNodes[j], 'messageid').textContent;
			warnings[j].explanation = '';
			warnings[j].type = 'warn';
		}

		//	Loop through infos
		for (var j = 0; j < infoNodes.length; j++) {
			//	Create object for info messages
			infos[j] = {};

			infos[j].lastLine = parseInt(_getFirstTagName(infoNodes[j], 'line').textContent, 10);
			infos[j].lastColumn = parseInt(_getFirstTagName(infoNodes[j], 'col').textContent, 10);
			infos[j].message = _getFirstTagName(infoNodes[j], 'message').textContent;
			infos[j].messageid = _getFirstTagName(infoNodes[j], 'messageid').textContent;
			infos[j].explanation = '';
			infos[j].type = 'info';
		}

		// Filter out suppressed messages.
		errors = errors.filter(_filterSuppressed);
		warnings = warnings.filter(_filterSuppressed);
		infos = infos.filter(_filterSuppressed);

		// Count errors, warnings and info messages.
		response.errorCount = errors.length;
		response.warningCount = warnings.length;
		response.infoCount = infos.length;

		//	Concatenate errors, warnings and info messages onto messages array
		messages = messages.concat(errors, warnings, infos);

		//	Sort messages by line
		messages.sort(function(a, b) {
			if (a.lastLine > b.lastLine) {
				return 1;
			}
			else if (a.lastLine < b.lastLine) {
				return -1;
			}
			//	Same line, look at column
			else if (a.lastColumn > b.lastColumn) {
				return 1;
			}
			else if (a.lastColumn < b.lastColumn) {
				return -1;
			}
			else {
				return 0;
			}
		});

		response.messages = messages;

		return response;
	};

	//	Private Functions

	/**
	 * @private
	 * @function
	 * @name _filterSuppressed
	 */
	function _filterSuppressed(message, index, array) {
		var id = message.messageid;

		return !suppressed.some(function(v, i, a) {
			return id === v;
		});

	}

	/**
	 * @private
	 * @function
	 * @name _getFirstTagName
	 */
	function _getFirstTagName(dom, tagName) {
		var result = dom.getElementsByTagName(tagName)[0];
		return result || '';
	}

	validity.xml = xml;
	return validity;
})(validity || {});
