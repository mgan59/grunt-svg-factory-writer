/*
 * grunt-svg-factory-writer
 * 
 *
 * Copyright (c) 2014 morgan craft
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  // TODO
  // * add task to cp the (accepted) test generated in tmp/ to the test/expected 
  // * add jshint checked on the test/expected or on tmp/
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    svg_factory_writer: {
      // test a default setting
      default_options: {
        options: {

        },
        files: [
          {
            expand:true, cwd:'test/fixtures/', src:'*.svg', dest:'tmp', 
          }
        ]
      }
      
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'svg_factory_writer', 'nodeunit']);


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
