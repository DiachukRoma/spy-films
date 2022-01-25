require('./task-scripts')

var gulp = require('gulp'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  usemin = require('gulp-usemin'),
  cssnano = require('gulp-cssnano'),
  autoprefixer = require('gulp-autoprefixer'),
  replace = require('gulp-replace'),
  rev = require('gulp-rev'),
  concat = require('gulp-concat'),
  purgecss = require('gulp-purgecss')

gulp.task('deleteDist', function() {
  return del('./dist')
})

// usemin
gulp.task('usemin', function() {
  return gulp
    .src('./app/*.html')
    .pipe(
      usemin(/* {
        css: [
          function() {
            return rev()
          },
        ],
      } */)
    )
    .pipe(gulp.dest('./dist'))
})

// copyGeneralFiles
gulp.task('copyGeneralFiles', function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/*.html',
    '!./app/images/**/*',
    '!./app/assets/css/**',
    '!./app/assets/js',
    '!./app/assets/js/**/*',
    '!./app/assets/sass',
    '!./app/assets/sass/**/*',
  ]

  return gulp.src(pathsToCopy).pipe(gulp.dest('./dist'))
})

// optImages
gulp.task('optImages', function() {
  return gulp
    .src('./app/images/**/*')
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true,
      })
    )
    .pipe(gulp.dest('./dist/images'))
})

// task webpack-mode-production - sets mode = production in config file
gulp.task('webpack-mode-production', function() {
  return gulp
    .src(['./webpack.config.js'])
    .pipe(replace('development', 'production'))
    .pipe(gulp.dest(''))
})

// task build-css
gulp.task('build-css', ['usemin'], function() {
  return gulp
    .src(['./app/assets/css/helpers.css', './app/assets/css/styles.css'])
    .pipe(concat('style.css'))
    .pipe(
      purgecss({
        content: ['./app/*.html'],
        safelist: {
          standard: [
            'visible',
            'op-0',
            'vi-hi',
            'active',
            'animate',
            'paused',
            'scrolled',
            'mixitup-control-active',
            /^slick/,
          ],
        },
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cssnano({
        zindex: false, // otherwise z-index is with wrong value
      })
    )
    .pipe(gulp.dest('./dist/assets/css'))
})

// task build scripts
gulp.task('build-scripts', ['webpack-mode-production'], function() {
  return gulp.start('scripts')
})

// copy js bundled file
gulp.task('copy-scripts', ['build-scripts'], function() {
  return gulp
    .src('./app/assets/js/scripts-bundled.js')
    .pipe(gulp.dest('./dist/assets/js/'))
})

// build
gulp.task('build', [
  'copy-scripts',
  'copyGeneralFiles',
  'optImages',
  'build-css',
])
