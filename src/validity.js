/**
 * Validity
 */
(function() {
	var alt = false,
		shift = false;

	/**
	 * @private
	 * @function
	 * @name _init
	 */
	function _init() {
		_attachKeyboardShortcuts();
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
				shift = true;
			}
			else if (e.which === 18) {
				alt = true;
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
})();