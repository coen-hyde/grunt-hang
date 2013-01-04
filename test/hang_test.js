var fs = require('fs')
  , path = require('path');

var request = require('request')
  , forever = require('forever-monitor')
  , async = require('async');

/*
 * Setup test server 
 */
var testProjectDir = path.resolve(__dirname +'/project');
var testServer = new (forever.Monitor)(testProjectDir + '/server.js', {
  silent: false,
  max: 1,
  killTree: true,
  uid: 'grunt-hang-test-server',
  cwd: testProjectDir,
  env: { NODE_ENV: 'test' }
});

var startTestServer = function(cb) {
  testServer.on('stdout', function(output) {
    if (output.toString().match(/Listening on port (\d*)/)) {
      cb();
    }
  });

  testServer.start();
};

/*
 * Setup test grunt 
 */
var testGrunt = new (forever.Monitor)('default', {
  silent: false,
  max: 1,
  killTree: false,
  uid: 'grunt-hang-test-grunt',
  command: 'grunt',
  cwd: testProjectDir,
  env: { NODE_ENV: 'test' }
});

var startTestGrunt = function(cb) {
  testGrunt.on('stdout', function(output) {
    if (output.toString().match(/Running "hang" task/)) {
      cb();
    }
  });

  testGrunt.start();
};

exports.group = {
  setUp: function(cb) {
    startTestServer(cb);
  },

  tearDown: function(cb) {
    testServer.on('exit', function() {
      cb();
    });

    async.nextTick(function() {
      testServer.stop();
    });
  },

  test1: function(test) {
    'use strict';

    test.expect(6);

    async.series([
      function(done) {
        // make initial request to server to make sure it responds quickly without grunt running
        var beforeStart = new Date().getTime();
        request('http://127.0.0.1:8099/', function(err, res, body) {
          test.equal(res.statusCode, 200);
          test.equal(body, 'ok');

          // Did the request take less than a second
          var repsonseTime = new Date().getTime() - beforeStart
          test.ok(repsonseTime < 1000, 'request to '+repsonseTime+'milliseconds to respond. Too slow.');
          done();
        });
      }, 
      function(done) {
        startTestGrunt(done);
      },
      function(done) {
        var beforeStart = new Date().getTime();
        request('http://127.0.0.1:8099/', function(err, res, body) {
          test.equal(res.statusCode, 200);
          test.equal(body, 'ok');
          
          // Did the request take less than 3 seconds
          var repsonseTime = new Date().getTime() - beforeStart
          test.ok(repsonseTime > 3000, 'request to '+repsonseTime+'milliseconds to respond. Too fast.');
          done();
        });
      }
    ], test.done);
  }
}