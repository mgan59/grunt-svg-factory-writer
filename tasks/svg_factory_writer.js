/*
 * grunt-svg-factory-writer
 * 
 *
 * Copyright (c) 2014 morgan craft
 * Licensed under the MIT license.
 */

'use strict';

var svgFactory = require('svg-factory')();
var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('svg_factory_writer', 'A file writer task for svg-factory', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        // template, and?
        // by default support globalWindow template
        template:'globalWindow'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      
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
        //grunt.log.writeln('Read file - '+filepath);
        return grunt.file.read(filepath);
      });
    
      // create factory name using file-name, should check that
      // it doesn't have - because that is an illegal js character
      // but valid for file names.  Also force CaseCaps?
      var factoryName = path.basename(f.dest).replace('.svg','');
      // replace any '-' with '_' because '-' is invalid js syntax
      // could be more strict on this checkin
      factoryName = factoryName.replace(/-/g,'_');

      // GARBAGE [0] array access, adjust map phase to 
      // no invoke and just load file?
      // Put in file defined template overrides if necessary
      var parseOpts = {factoryName:factoryName, template:options.template};
      
      svgFactory.parse(src[0], parseOpts, function(err, jsSrc){
        // if svgFactory parsing has an error log it
        if(err){
          console.log('SVG-Factory Parse Error ',err);
        }
    
        // Write the destination file.
        var jsDest = f.dest.replace('.svg','.js');
        
        grunt.file.write(jsDest, jsSrc);

      });


      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
