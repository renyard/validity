/**
 * @namespace
 * @name validity.ui
 */
var validity = (function(validity) {
	"use strict";
	var ui = {},
		animationRunning = false,
		icons = {
			'default': {
				'19': 'icons/19.png',
				'38': 'icons/38.png'
			},
			'connecting': {
				'animate': true,
				'frames': 20,
				'fps': 20,
				'format': 'png',
				'19': 'img/connecting/19/',
				'38': 'img/connecting/38/'
			},
			'valid': {
				'19': 'img/valid/19.png',
				'38': 'img/valid/38.png'
			},
			'invalid': {
				'19': 'img/invalid/19.png',
				'38': 'img/invalid/38.png'
			},
			'error': {
				'19': 'img/error/19.png',
				'38': 'img/error/38.png'
			}
		};

	ui.init = function(tabId) {
		//	Set up page action on new tabs
		ui.setPageAction(tabId, 'default', 'Validate Document (Alt+Shift+V)');
	};

	ui._animate = function (tabId, obj, text) {
		var frames = {},
			interval = 1 / obj.fps * 1000;

		// Loop over properties in obj.
		for(var prop in obj) {
			// Match numbers (pixel sizes).
			if (prop.match(/^[0-9]+$/)) {
				frames[prop] = [];
				for (var i = 0; i < obj.frames; i++) {
					frames[prop][i] = obj[prop] + i + '.' + obj.format;
				}
			}
		}

		animationRunning = true;
		ui._renderFrame(tabId, text, frames, 0, interval);
	};

	ui._renderFrame = function(tabId, text, frames, currFrame, interval) {
		var frame = {};

		// Return early if the animation has been stopped.
		if (!animationRunning) {
			return;
		}

		// Increment frame for each size.
		for (var prop in frames) {
			// Loop animation if we are at the end.
			if (currFrame >= frames[prop].length) {
				currFrame = 0;
			}
			frame[prop] = frames[prop][currFrame];
		}

		chrome.pageAction.setIcon({'tabId': tabId, 'path': frame});

		currFrame++;
		window.setTimeout(function() {
			ui._renderFrame(tabId, text, frames, currFrame, interval);
		}, interval);
	};

	ui._stopAnimation = function() {
		animationRunning = false;
	};

	ui.setPageAction = function(tabId, icon, text) {
		var iconDict;

		chrome.pageAction.show(tabId);

		if (typeof text === 'string') {
			chrome.pageAction.setTitle({'tabId': tabId, 'title': text});
		}

		if (icons[icon] && icons[icon].animate) {
			iconDict = ui._animate(tabId, icons[icon], text);

			// Page Action will be set later, via. _renderFrame().
			return;
		}
		else {
			// Stop any running animations.
			ui._stopAnimation();
			iconDict = icons[icon];
		}

		chrome.pageAction.setIcon({'tabId': tabId, 'path': iconDict});
	};

	validity.ui = ui;
	return validity;
})(validity || {});
