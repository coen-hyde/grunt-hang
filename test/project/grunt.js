var grunt = require('grunt');

module.exports = function (grunt) {
  grunt.registerTask('hang', 'Hang the build process so we can test hanging middleware', function() {
    var done = this.async();

    setTimeout(done, 5000);
  });

  grunt.initConfig({
    lint: {
      files: [
        'tasks/hang.js',
        'grunt.js'
      ]
    },
  });

  grunt.loadTasks('../../tasks');

  grunt.registerTask("default", 'buildStart hang buildEnd');
}