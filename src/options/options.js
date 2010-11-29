(function() {
	var enableHosts = document.getElementById('enableHosts'),
		validateHosts = document.getElementById('validateHosts'),
		validator = document.getElementById('validator'),
		collapsed = document.getElementById('collapse');

	//	Load options
	window.addEventListener('load', function() {
		if (localStorage['enableHosts']) {
			enableHosts.value = localStorage['enableHosts'];
		}
		if (localStorage['validateHosts'] !== undefined) {
			validateHosts.value = localStorage['validateHosts'];
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
		localStorage['enableHosts'] = enableHosts.value;
		localStorage['validateHosts'] = validateHosts.value;
		localStorage['validator'] = validator.value;
		localStorage['collapseResults'] = collapse.checked;
	}

	//	Save options
	document.getElementById('optionsForm').addEventListener('submit', function(){
		saveOptions();
		window.close();
		return false;
	}, false);
})();