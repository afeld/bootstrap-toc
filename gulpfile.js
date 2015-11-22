var gulp = require('gulp');
var template = require('gulp-template');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var pkg = require('./package.json');

gulp.task('default', function() {
  return gulp.src('bootstrap-toc.css')
    .pipe(template(pkg))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('dist'));
});
