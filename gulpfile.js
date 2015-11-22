var gulp = require('gulp');
var clean = require('gulp-clean');
var template = require('gulp-template');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var pkg = require('./package.json');

gulp.task('clean', function () {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
});

gulp.task('build-css', ['clean'], function() {
  return gulp.src('bootstrap-toc.css')
    .pipe(template(pkg))
    .pipe(gulp.dest('dist'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-js', ['clean'], function() {
  return gulp.src('bootstrap-toc.js')
    .pipe(template(pkg))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function () {
  return gulp.src('test/index.html')
    .pipe(mochaPhantomJS());
});

gulp.task('watch', function() {
  gulp.watch('bootstrap-toc.css', ['build-css']);
  gulp.watch('bootstrap-toc.js', ['build-js']);
});

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md
gulp.task('default', ['build-css', 'build-js', 'test']);
