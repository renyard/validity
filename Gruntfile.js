module.exports = function(grunt) {
	"use strict";

	var merge = require('merge'),
		config = {},
		pkg = grunt.file.readJSON('package.json');

	// Load the config file if one exists.
	try {
		config = grunt.file.readJSON('config.json');
	}
	catch(e) {

	}

	// Merge config defaults.
	merge(config, {
		version: '0.0.0',
		copyright: 'Copyright 2009 - ' + (new Date()).getFullYear() + ' Ian Renyard',
		gaid: 'UA-XXXXXX-X'
	});

	grunt.initConfig({
		pkg: pkg,
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['**'],
						dest: 'dist/'
					}
				]
			}
		},
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: '@version@',
							replacement: pkg.version
						},
						{
							match: '@copyright@',
							replacement: config.copyright
						},
						{
							match: '@gaid@',
							replacement: config.gaid
						},
						{
							match: /\/\*!debug\*\/.*?\/\*gubed!\*\//,
							replacement: ''
						}
					],
					prefix: ''
				},
				files: [
					{
						expand: true,
						cwd: 'dist/',
						src: ['**/*'],
						dest: 'dist/'
					}
				]
			},
		},
		jshint: {
			all: ['dist/**/*.js'],
			options: {
				globals: {
					document: true,
					window: true,
					XMLHttpRequest: true,
					console: true,
					localStorage: true,
					chrome: true
				},
				evil: true
			}
		},
		qunit: {
			all: ['test/*.html']
		},
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: 'validity-<%= pkg.version %>.zip'
				},
				files: [
					{
						expand: true,
						src: ['**/*'],
						cwd: 'dist/',
						dest: '/'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('default', ['copy', 'replace', 'jshint', 'qunit', 'compress']);
}
