/**
 * @namespace
 * @name validity.xml
 */
var validity = (function(validity) {
	var xml = {};

	//	Public Methods

	/**
	 * @function
	 * @public
	 * @name parseResponse
	 */
	xml.parseResponse = function(xmlDom) {
		var response = {"url": undefined, "doctype": undefined, "errorCount": undefined, "messages": undefined, "source": {"encoding": undefined, "type": "text/html"}},
			messages = [],
			errorNodes;

		response.url = _getFirstTagName(xmlDom, 'uri').textContent;
		response.doctype = _getFirstTagName(xmlDom, 'doctype').textContent;
		response.source.encoding = _getFirstTagName(xmlDom, 'charset').textContent;
		response.errorCount = _getFirstTagName(xmlDom, 'errorcount').textContent;

		errorNodes = _getFirstTagName(xmlDom, 'errorlist').getElementsByTagName('error');
		//	Loop through errors
		for (var i = 0; i < errorNodes.length; i++) {
			//	Create object for error
			messages[i] = {};

			messages[i].lastLine = parseInt(_getFirstTagName(errorNodes[i], 'line').textContent, 10);
			messages[i].lastColumn = parseInt(_getFirstTagName(errorNodes[i], 'col').textContent, 10);
			messages[i].message = _getFirstTagName(errorNodes[i], 'message').textContent;
			messages[i].messageid = _getFirstTagName(errorNodes[i], 'messageid').textContent;
			messages[i].explanation = _getFirstTagName(errorNodes[i], 'explanation').textContent;
			//	TODO: Add error/warning/info
			messages[i].type = 'error';
		}

		response.messages = messages;

		return response;
	}

	//	Private Functions

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