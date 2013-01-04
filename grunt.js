/*jshint node:true*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration
  grunt.initConfig({
    lint: {
      files: [
        'tasks/hang.js',
        'grunt.js'
      ]
    },

    test: {
      tasks: ['test/*_test.js']
    },

    jshint: {
      options: {
        node: true,
        white: false,
        smarttabs: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        undef: true
      }
    },

    clean: {
      test: ['test/project/.grunthang']
    }
  });

  // Default task
  grunt.registerTask('default', 'lint test');

};