require('./task-styles')
require('./task-scripts')

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  replace = require('gulp-replace'),
  browserSync = require('browser-sync').create()

// watch
gulp.task('watch', ['dev'], function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app',
    },
  })

  // watch to html files changes
  gulp.watch('./app/*.html', function() {
    browserSync.reload()
  })

  // watch to helpers scss library changes
  gulp.watch('./app/assets/sass/helpers/**/*.scss', ['waitForHelpers'])

  // watch to other scss files changes
  gulp.watch(
    ['./app/assets/sass/**/*.scss', '!' + './app/assets/sass/helpers/**/*'],
    ['waitForStyles']
  )

  // watch to js files changes
  gulp.watch('./app/assets/js/*/*.js', ['waitForScripts'])
})

// waitForStyles
gulp.task('waitForStyles', ['styles'], function() {
  // return gulp.src('./app/assets/sass/styles.scss').pipe(browserSync.stream())
  return gulp.src('./app/assets/css/styles.css').pipe(browserSync.stream())
})

// waitForHelpers
gulp.task('waitForHelpers', ['helpers'], function() {
  return gulp.src('./app/assets/css/helpers.css').pipe(browserSync.stream())
})

// waitForScripts
gulp.task('waitForScripts', ['scripts'], function() {
  browserSync.reload()
})

// task dev - turns to development enviroment
gulp.task('dev', function() {
  gulp
    .src(['./webpack.config.js'])
    .pipe(replace('production', 'development'))
    .pipe(gulp.dest(''))
})
