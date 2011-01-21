(function() {
	var enableHosts = document.getElementById('enableHosts'),
		validateHostsElm = document.getElementById('validateHosts'),
		validateHosts,
		hostOpt,
		validator = document.getElementById('validator'),
		collapsed = document.getElementById('collapse');

	//	Load options
	window.addEventListener('load', function() {
		var validateHosts = [];

		if (localStorage['enableHosts']) {
			enableHosts.value = localStorage['enableHosts'];
		}
		if (localStorage['validateHosts'] !== undefined) {
			validateHosts = localStorage['validateHosts'].split(' ');
			for (var i = 0; i < validateHosts.length; i++) {
				hostOpt = document.createElement('option');
				hostOpt.textContent = validateHosts[i];
				validateHostsElm.appendChild(hostOpt);
			}
		}
		if (localStorage['validator'] !== undefined) {
			validator.value = localStorage['validator'];
		}
		if (localStorage['collapseResults'] !== undefined) {
			collapsed.checked = localStorage['collapseResults'];
		}
		else {
			//	Defaults to true
			collapsed.checked = true;
		}
	}, false);

	//	Save options
	function saveOptions() {
		var validateHostsElm = document.getElementById('validateHosts'),
			validateHosts = [];

		localStorage['enableHosts'] = enableHosts.value;

		for (var i = 0; i < validateHostsElm.childNodes.length; i++) {
			validateHosts.push(validateHostsElm.childNodes[i].textContent);
		}

		localStorage['validateHosts'] = validateHosts.join(' ');
		localStorage['validator'] = validator.value;
		localStorage['collapseResults'] = collapse.checked;
	}

	//	Attach save and apply events
	document.getElementById('apply').addEventListener('click', function() {
		saveOptions();
	});

	document.getElementById('optionsForm').addEventListener('submit', function() {
		saveOptions();
		window.close();
		return false;
	}, false);
})();