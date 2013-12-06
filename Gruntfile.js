module.exports = function(grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		/*replace: {
			
		},*/
		jshint: {
			all: ['dist/**/*.js']
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

	grunt.registerTask('default', ['copy', 'qunit', 'compress']);
}
