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
	config = merge({
		copyright: 'Copyright 2009 - ' + (new Date()).getFullYear() + ' Ian Renyard',
		gaid: 'UA-XXXXXX-X'
	}, config);

	grunt.initConfig({
		pkg: pkg,
		clean: {
			dist: {
				files: {
					src: ['dist/']
				}
			}
		},
		copy: {
			src: {
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
							match: /\/\*!debug\*\/[\s\S]*?\/\*gubed!\*\/[\s\n]*/g,
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
		connect: {
			tests: {
				options: {
					port: 0,
					base: '.'
				}
			},
			server: {
				options: {
					port: 8080,
					base: '.',
					keepalive: true
				}
			}
		},
		qunit: {
			all: {
				options: {
					urls: [
						'http://<%= connect.tests.options.hostname %>:<%= connect.tests.options.port %>/test/testrunner.html'
					]
				}
			}
		},
		compress: {
			dist: {
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
		},
		watch: {
			src: {
				files: [
					'src/**/*',
					'config.json',
					'Gruntfile.js',
					'package.json'
				],
				tasks: ['clean', 'copy', 'replace', 'jshint', 'connect', 'qunit', 'notify_hooks']
			}
		},
		notify_hooks: {
			options: {
				enabled: true,
				max_js_hint_notifications: 5
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('build', ['clean', 'copy', 'replace']);
	grunt.registerTask('test', ['clean', 'copy', 'replace', 'jshint', 'connect', 'qunit']);
	grunt.registerTask('server', ['clean', 'copy', 'replace', 'connect:server']);
	grunt.registerTask('default', ['clean', 'copy', 'replace', 'jshint', 'connect', 'qunit', 'compress']);
}
