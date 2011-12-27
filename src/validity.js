/**
 * Validity @version@
 * Copyright 2009 - 2011 Ian Renyard
 * http://github.com/renyard/validity
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
			line,
			errorCount = response.errorCount,
			toEval = '';

		messages = response.messages;

		if (messages === undefined) {
			/*!debug*/
			console.info('No messages returned from validator.');
			/*gubed!*/
			return;
		}

		if (errorCount > 0) {
			//	Collapse results based on option
			if (console.groupCollapsed && localStorage['collapseResults'] !== 'false') {
				toEval += 'console.groupCollapsed';
			}
			else {
				toEval += 'console.group';
			}

			toEval += '(\'' + errorCount + ' validation error' +
				//	Add s for plural
				(errorCount > 1?'s':'') +
				'\');';

			for(var i in messages) {
				message = messages[i];
				line = message.lastLine;

				toEval += 'console.' +
					message.type + '(\'' +
					//	Write line number if available
					(line > 0?'line ' + line + ': ':'') +
					//	Remove line breaks from message
					message.message.replace(/\r\n|\n|\r/g, '') +
					'\');';
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
		chrome.extension.sendRequest({'action': 'init'}, function(response) {
			if (response.attatchActions === true) {
				_attachKeyboardShortcuts();
				chrome.extension.onRequest.addListener(function(results) {
					_logMessages(results);
				});	
			}
		});
	}

	_init();

})();
