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

_gaq.push(['_setAccount', 'UA-XXXXX-X']);
_gaq.push(['_trackPageview']);

var stats = (function(validity) {

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = 'https://ssl.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

	return validity;
})(validity || {});
