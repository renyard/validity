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
				console.info('keydown: shift');/*gubed!*/
				return;
			}
			else if (e.which === 18) {
				alt = true;/*!debug*/
				console.info('keydown: alt');/*gubed!*/
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
		var messages = response.messages,
			toEval = '';
		if (messages !== undefined) {
			return;
		}
		toEval += 'console.group(\'validation errors\');';
		for(m in messages) {
			toEval += 'console.error(\'';
			toEval += 'line ' + m.lastLine + ': ' + m.message;
			toEval += '\');';
		}
		toEval += 'console.groupEnd();';
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