'use strict';

var gulp = require('gulp');
var BuildControl = require('build-control').BuildControl;

gulp.task('deploy', function(done){
  var options = {
    branch: 'master',
    versionBump: 'patch',
    remote: {
      repo: 'dokku@ssh.fuken.xyz:palomitas',
      branch: 'master'
    },
    clean:{
      after: true,
    }
  };  
  var bc = new BuildControl(options);

  bc.npm.bump();
  bc.prePublishCheck();
  bc.run();

  done();
});
