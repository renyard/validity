"use strict";

/*
	TODO:
	* Start up vs. Up-time.
	* New user.
	* Options:
		* Collapsed results.
		* Custom validator URL.
		* Restricted validation.
		* Auto validation.
*/

var _gaq = _gaq || [];

var validity = (function(validity) {
	_gaq.push(['_setAccount', '@gaid@']);
	_gaq.push(['_trackPageview']);

	//	Load Google Analytics Script
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = 'https://ssl.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

	var stats = {
		track: function(category, action, label, value) {
			//	Don't track if analytics are disabled.
			if (validity.opts.option('disableAnalytics') !== true) {
				_gaq.push(['_trackEvent', category, action, label, value]);
			}
		}
	};

	validity.stats = stats;
	return validity;
})(validity || {});
