/**
 * Validity @version@
 */
(function() {
	var alt = false,
		shift = false;

	/**
	 * @private
	 * @function
	 * @name _requestValidation
	 */
	function _requestValidation() {
		chrome.extension.sendRequest({'action': 'validate'});
	}

	/**
	 * @private
	 * @function
	 * @name _attachKeyboardShortcuts
	 */
	function _attachKeyboardShortcuts() {
		//	Set up keyboard shortcuts (Alt + Shift + V)
		document.addEventListener("keydown", function (e) {
			if (e.which === 16) {
				shift = true;/*!debug*/
				console.info('keydown: shift');
				/*gubed!*/
				return;
			}
			//	Alt is 18 on it's own or 91 with shift
			else if (e.which === 18 || e.which === 91) {
				alt = true;/*!debug*/
				console.info('keydown: alt');
				/*gubed!*/
				return;
			}
			else if (e.which === 86) {
				if (alt && shift) {
					_requestValidation();
				}
			}
		}, false);

		//	Track state of shift and alt keys
		document.addEventListener("keyup", function (e) {
			if (e.which === 16) {
				shift = false;
			}
			else if (e.which === 18) {
				alt = false;
			}
		});
	}

	/**
	 * @private
	 * @function
	 * @name _logMessages
	 */
	function _logMessages(response) {
		var messages,
			message,
			toEval = '';

		messages = response.messages;

		if (messages === undefined) {
			/*!debug*/
			console.info('No messages returned from validator.');
			/*gubed!*/
			return;
		}

		if (response.errorCount > 0) {
			//	Collapse results based on option
			if (console.groupCollapsed && localStorage['collapseResults'] !== false) {
				toEval += 'console.groupCollapsed';
			}
			else {
				toEval += 'console.group';
			}

			toEval += '(\'' + response.errorCount + ' validation errors\');';
			for(var i in messages) {
				message = messages[i];
				toEval += 'console.';
				toEval += message.type;
				toEval += '(\'line ' + message.lastLine + ': ' + message.message;
				toEval += '\');';
			}

			toEval += 'console.groupEnd();';
		}
		else {
			toEval += 'console.info(\'Document is valid ("' + response.doctype + '")\')';
		}

		eval(toEval);
	}

	/**
	 * @private
	 * @function
	 * @name _init
	 */
	function _init() {
		_attachKeyboardShortcuts();
		chrome.extension.onRequest.addListener(function(response) {
			_logMessages(response);
		});
	}

	_init();

})();