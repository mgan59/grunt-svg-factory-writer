/*
 * grunt-svg-factory-writer
 * 
 *
 * Copyright (c) 2014 morgan craft
 * Licensed under the MIT license.
 */

'use strict';

var svgFactory = require('svg-factory')();

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('svg_factory_writer', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    // TODO define my options here
    var options = this.options({
      // template, and? 
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      console.log('file: -- ',f);
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        grunt.log.writeln('Read file - '+filepath);
        return grunt.file.read(filepath);
      });

      console.log('have src? ',src);
      // GARBAGE [0] array access, adjust map phase to no invoke and just load file?
      svgFactory.parse(src[0], {factoryName:'bigBunny'}, function(err, jsSrc){
        console.log('parse attempt?');    
        if(err){
          console.log('the err? ',err);
        }
    
        // Write the destination file.
        grunt.file.write(f.dest, jsSrc);

        //console.log(jsSrc);

      });


      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
