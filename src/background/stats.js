var _gaq = _gaq || [];

var validity = (function(validity) {
	"use strict";
	var stats = {},
		ga_elm,
		purge_timeout,
		PURGE_INTERVAL = 60;

	_gaq.push(['_setAccount', '@gaid@']);
	_gaq.push(['_trackPageview', '/validity/@version@']);

	//	Load Google Analytics Script
	stats._init = function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = 'https://ssl.google-analytics.com/ga.js';

		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);

		ga_elm = ga;

		if (validity.opts.option('disableAnalytics')) {
			stats.disableAnalytics();
		}
	};

	stats.disableAnalytics = function() {
		window['ga-disable-@gaid@'] = true;

		//	Clear queue periodically.
		stats._purgeTrackingQueue();
		(function clearQueue() {
			purge_timeout = window.setTimeout(function() {
				stats._purgeTrackingQueue();
				clearQueue();
			}, 60 * 60 * 1000);
		})();
	};

	stats.enableAnalytics = function() {
		window.clearTimeout(purge_timeout);
		window['ag-disable-@gaid@'] = false;
	};

	stats._purgeTrackingQueue = function() {
		//	Remove only page and events, not _setAccount from queue.
		for (var i=0; i<=_gaq; i++) {
			if (/^\_track/.match(_gaq[i][0])) {
				_gaq.splice(i, 1);
			}
		}
	};

	stats.track = function(category, action, label, value) {
		var trackingEnabled = !validity.opts.option('disableAnalytics');

		//	Don't track if analytics are disabled.
		if (trackingEnabled) {
			_gaq.push(['_trackEvent', category, action, label, value]);
		}
	};

	document.addEventListener('DOMContentLoaded', stats._init, false);

	validity.stats = stats;
	return validity;
})(validity || {});
