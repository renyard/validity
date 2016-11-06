module.exports = function(grunt) {
	"use strict";

	var merge = require('merge'),
		config = {},
		pkg = grunt.file.readJSON('package.json');

    require('load-grunt-tasks')(grunt);

	// Load the config file if one exists.
	try {
		config = grunt.file.readJSON('config.json');
	}
	catch(e) {

	}

	// Merge config defaults.
	config = merge({
		copyright: 'Copyright 2009 - ' + (new Date()).getFullYear() + ' Ian Renyard',
		gaid: process.env.GAID || ''
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
						src: '**/*',
						dest: 'dist/'
					},
					{
						expand: true,
						src: ['CHANGES'],
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
						src: [
                            '**/*.js',
                            '**/*.json',
                            '**/*.html',
                            '**/*.css'
                        ],
						dest: 'dist/'
					}
				]
			},
		},
		jshint: {
			all: ['src/**/*.js'],
			options: {
				globals: {
					document: true,
					window: true,
					XMLHttpRequest: true,
					console: true,
					localStorage: true,
					chrome: true
				},
                elision: true,
				esnext: true,
				evil: true
			},
		},
        karma: {
            all: {
                configFile: 'karma.conf.js'
            },
			watch: {
				configFile: 'karma.conf.js',
				// Disable preprocessors to preserve line numbers in errors.
				preprocessors: {},
				reporters: ['progress']
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
		webstore_upload: {
			accounts: {
				default: {
					publish: true,
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					refresh_token: process.env.REFRESH_TOKEN
				}
			},
			extensions: {
				validity: {
					appID: "bbicmjjbohdfglopkidebfccilipgeif",
					zip: "./"
				}
			}
		},
		watch: {
			src: {
				files: [
					'src/**/*',
                    'test/**/*',
                    '!test/coverage/**/*',
					'config.json',
					'Gruntfile.js',
					'package.json'
				],
				tasks: ['clean', 'copy', 'replace', 'jshint', 'karma:watch']
			}
		}
	});

	grunt.registerTask('build', ['clean', 'copy', 'replace']);
	grunt.registerTask('test', ['jshint', 'karma']);
	grunt.registerTask('default', ['clean', 'copy', 'replace', 'jshint', 'karma', 'compress']);
	grunt.registerTask('deploy', ['webstore_upload']);
};
