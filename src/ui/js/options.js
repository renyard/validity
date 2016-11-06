var validity = (function(validity) {
	"use strict";
	var options = {},
		$ = function(id) {
			return document.getElementById(id);
		},
		enableHostsElm,
		validateHostsElm,
		validateHost;

	function loadOptions() {
		var validateHosts,
			hostOpt,
			validator = $('validator'),
			legacy = $('legacy'),
			collapsed = $('collapse');

		//	Load options
		window.addEventListener('load', function() {
			var enableHosts = [],
				validateHosts = [],
				validatorURL = validity.opts.option('validator');

			//	TODO: abstract select box population into function
			if (validity.opts.option('enableHosts')) {
				enableHosts = validity.opts.option('enableHosts');
				for (var i = 0; i < enableHosts.length; i++) {
					hostOpt = document.createElement('option');
					hostOpt.textContent = enableHosts[i];
					enableHostsElm.appendChild(hostOpt);
				}
			}

			if (validity.opts.option('validateHosts') !== undefined) {
				validateHosts = validity.opts.option('validateHosts');
				//	Loop through hosts to populate select box
				for (var j = 0; j < validateHosts.length; j++) {
					hostOpt = document.createElement('option');
					hostOpt.textContent = validateHosts[j];
					validateHostsElm.appendChild(hostOpt);
				}
			}

			if (validatorURL === undefined || validatorURL.search(/^\s*$/) !== -1) {
				legacy.disabled = true;
			}
			else {
				validator.value = validity.opts.option('validator');
			}

			if (validity.opts.option('legacy') !== undefined) {
				legacy.checked = validity.opts.option('legacy');
			}

			if (validity.opts.option('collapseResults') !== undefined) {
				collapsed.checked = validity.opts.option('collapseResults');
			}
			else {
				//	Defaults to true
				collapsed.checked = true;
			}
		});
	}

	//	Save options
	function saveOptions() {
		var enableHosts = [],
			validateHosts = [];

		for (var i = 0; i < enableHostsElm.childNodes.length; i++) {
			enableHosts.push(enableHostsElm.childNodes[i].textContent);
		}

		for (var j = 0; j < validateHostsElm.childNodes.length; j++) {
			validateHosts.push(validateHostsElm.childNodes[j].textContent);
		}

		//	Sort hosts alphabetically
		enableHosts.sort();
		validateHosts.sort();

		validity.opts.option('enableHosts', enableHosts);
		validity.opts.option('validateHosts', validateHosts);
		validity.opts.option('legacy', legacy.disabled?false:legacy.checked);
		validity.opts.option('validator', validator.value);
		validity.opts.option('collapseResults', collapse.checked);
	}

	//	Edit hosts
	options.addOptionToSelect = function(optionText, select) {
		var option = document.createElement('option');

		option.textContent = optionText;
		select.appendChild(option);

		return option;
	};

	options.removeOptionsFromSelect = function(select) {
		var option;

		for (var i = 0; i < select.childNodes.length; i++) {
			option = select.childNodes[i];
			if (option.selected === true) {
				select.removeChild(option);
			}
		}
	};

	options.toBool = function(input) {
		if (typeof input === 'string') {
			return input.toLowerCase() === 'true';
		}
		return !!input;
	};

	options.init = function() {
		var validator = $('validator'),
			legacy = $('legacy');

		enableHostsElm = $('enableHosts');
		validateHostsElm = $('validateHosts');
		//validateHost = $('validateHost');

		//	Load option values into UI
		loadOptions();

		//	Attach add and remove events for select boxes
		$('enableAdd').addEventListener('click', function() {
			var textArea = $('enableHost');
			if (textArea.value !== '') {
				options.addOptionToSelect(textArea.value, enableHostsElm);
			}
			textArea.value = '';
		});

		$('enableRemove').addEventListener('click', function() {
			options.removeOptionsFromSelect(enableHostsElm);
		});

		//	Add host on enter keypress
		$('enableHost').addEventListener('keypress', function(e) {
			if (e.which === 13) {
				//	Cancel submit
				e.preventDefault();
				$('enableAdd').click();
			}
		});

		$('validateAdd').addEventListener('click', function() {
			var textArea = $('validateHost');
			if (textArea.value !== '') {
				options.addOptionToSelect(textArea.value, validateHostsElm);
			}
			textArea.value = '';
		});

		$('validateRemove').addEventListener('click', function() {
			options.removeOptionsFromSelect(validateHostsElm);
		});

		//	Add host on enter keypress
		$('validateHost').addEventListener('keypress', function(e) {
			if (e.which === 13) {
				//	Cancel submit
				e.preventDefault();
				$('validateAdd').click();
			}
		});

		validator.addEventListener('change', function() {
			var url = validator.value;

			if (url.search(/^\s*$/) !== -1) {
				legacy.disabled = true;
			}
			else {
				legacy.disabled = false;
			}
		});

		//	Attach save and apply events
		$('apply').addEventListener('click', function() {
			saveOptions();
		});

		$('optionsForm').addEventListener('submit', function(e) {
			saveOptions();
			window.close();
			return false;
		});
	};

	validity.options = options;

	//	Run init() if we're on the options page.
	if ($('validity-options')) {
		document.addEventListener('DOMContentLoaded', function() {
			validity.options.init();
		});
	}

	return validity;
})(validity || {});
