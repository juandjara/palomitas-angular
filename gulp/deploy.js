'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var runSequence = require('run-sequence').use(gulp);
var surge = require('gulp-surge');
var conf = require('./conf');

gulp.task("bump", function () {
    return gulp.src(["../bower.json", "../package.json"])
        .pipe(bump({ type: "patch" }))
        .pipe(gulp.dest("./"));
});
gulp.task('surge', function(){
  return surge({
    project: conf.paths.dist,
    domain: 'palomitas'
  });
})

gulp.task('deploy', function(done){
  runSequence('build', 'bump', 'surge', done);
});
