/*
 * grunt-hang
 *
 * Copyright (c) 2013 Coen Hyde
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('buildStart', 'Touch a file to indicate a build is in progress', function() {
    grunt.file.write('.grunthang', '+');
  });

  grunt.registerTask('buildEnd', 'Delete the temp building file now that the build is complete', function() {
    grunt.file.write('.grunthang', '-');
  });
};