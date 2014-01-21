var gulp = require('gulp')

var glob = require('glob')

var browserify = require('gulp-browserify')
var concat = require('gulp-concat')
var flatten = require('gulp-flatten')
var react = require('gulp-react')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

gulp.task('copy-js', function() {
  return gulp.src('./src/**/*.js')
    .pipe(flatten())
    .pipe(gulp.dest('./build/modules'))
})

gulp.task('compile-jsx', function() {
  return gulp.src('./src/**/*.jsx')
    .pipe(react())
    .pipe(flatten())
    .pipe(gulp.dest('./build/modules'))
})

gulp.task('browserify', ['copy-js', 'compile-jsx'], function(){
  return gulp.src(['./build/modules/app.js'])
    .pipe(browserify({
      debug: !gulp.env.production
    }))
    .on('prebundle', function(bundle) {
        // Setting cwd as gulp-browserify is forcing browserify's basedir to be
        // the dir containing the entry file.
        glob.sync('*.js', {cwd: './build/modules'}).forEach(function(module) {
          var expose = module.split('.').shift()
          if (expose == 'app') return
          bundle.require('./' + module, {expose: expose})
        })
      })
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build'))
})

gulp.task('build', ['browserify'], function() {
  return gulp.src('./build/app.js')
    .pipe(gulp.dest('./public/js'))
})

gulp.task('default', function() {
  gulp.run('build')

  gulp.watch(['./src/**/*.js', './src/**/*.jsx'], function() {
      gulp.run('build')
  })
})
