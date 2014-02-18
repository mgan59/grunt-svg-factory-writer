'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.svg_factory_writer = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);
    
    //
    // Test simple
    //
    var actual = grunt.file.read('tmp/simple.js');
    var expected = grunt.file.read('test/expected/simple.js');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    //
    // Test hypen conversion using bob-the-blob.svg 
    // The factory name should be window.bob_the_blob
    //
    var bobActual = grunt.file.read('tmp/bob-the-blob.js');
    var bobExpected = grunt.file.read('test/expected/bob-the-blob.js');
    test.equal(bobActual, bobExpected, 'should describe what the default behavior is.');


    test.done();
  }
  
};
