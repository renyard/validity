/* eslint-env node */

const fs = require('fs')
const pkg = require('./package.json')

const DIST = 'dist/'

const gulp = require('gulp')
const merge = require('merge-stream')
const rmdir = require('rmdir')
const karma = require('karma')
const eslint = require('gulp-eslint')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const zip = require('gulp-zip')

gulp.task('clean', (done) => {
  if (fs.existsSync(DIST)) {
    rmdir(DIST, done)
  } else {
    done()
  }
})

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('test', (done) => {
  new karma.Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done).start()
})

gulp.task('watch-tests', (done) => {
  new karma.Server({
    configFile: `${__dirname}/karma.conf.js`,
    autoWatch: true,
    singleRun: false
  }, done).start()
})

gulp.task('build', ['clean', 'lint', 'test'], () => {
  let js = gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DIST))

  let other = gulp.src(['src/**/*', '!src/**/*.js'])
    .pipe(gulp.dest(DIST))

  return merge(js, other)
})

gulp.task('package', ['build'], () => {
  gulp.src('dist/*')
    .pipe(zip(`validity-${pkg.version}.zip`))
    .pipe(gulp.dest(DIST))
})

gulp.task('default', ['build'])
