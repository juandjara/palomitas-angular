'use strict';

var gulp = require('gulp');
var path = require('path');
var BuildControl = require('build-control').BuildControl;

gulp.task('deploy', function(done){
  var options = {
    cwd: path.join(__dirname, '..', 'dist'),
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

  bc.prepublishCheck();
  bc.run();

  done();
});
