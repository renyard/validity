/**
 * @namespace
 * @name validity.xml
 */
var validity = (function(validity) {
	const XSL_URL = 'xslt/validator.xslt';
	var xml = {};

	//	Public Methods

	/**
	 * @function
	 * @public
	 * @name parseResponse
	 */
	xml.parseResponse = function(xmlDom) {
		var xsltProcessor = new XSLTProcessor(),
			xslDoc,
			jsonDoc;

		xslDoc = _getXsl(XSL_URL);

		xsltProcessor.importStylesheet(xslDoc);

		jsonDoc = xsltProcessor.transformToFragment(xmlDom, document);
		console.info(jsonDoc);

		return jsonDoc.textContent;
	}

	//	Private Functions

	/**
	 * @private
	 * @function
	 * @name _getXsl
	 */
	function _getXsl(url) {
		var request = new XMLHttpRequest();

		/*!debug*/
		console.info(url);
		/*gubed!*/

		//	Synchronous request
		request.open('GET', url, false);
		request.send();

		/*!debug*/
		console.info(request);
		/*gubed!*/

		return request.responseXML;
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