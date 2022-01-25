var gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  sourcemaps = require('gulp-sourcemaps')

gulp.task('helpers', function() {
  return gulp
    .src('./app/assets/sass/helpers/helpers.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/assets/css/'))
})
