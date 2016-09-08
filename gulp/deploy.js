'use strict';

var gulp = require('gulp');
var path = require('path');
var BuildControl = require('build-control').BuildControl;

gulp.task('deploy', ['build'], function(done){
  var options = {
    cwd: path.join(__dirname, '..', 'dist'),
    branch: 'master',
    versionBump: 'patch',
    remote: {
	    repo: 'git@github.com:juandjara/palomitas-angular',
      branch: 'gh-pages'
    },
    clean:{
      after: true,
    }
  };  
  var bc = new BuildControl(options);

  bc.prepublishCheck();
  bc.npm.bump();
  bc.run();

  done();
});
