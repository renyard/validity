const fs = require('fs')
const pkg = require('./package.json')

const DIST = 'dist/'

const gulp = require('gulp')
const es = require('event-stream')
const git = require('git-rev-sync')
const jsoneditor = require('gulp-json-editor')
const merge = require('merge-stream')
const rename = require('gulp-rename')
const rmdir = require('rmdir')
const webpack = require('webpack-stream')
const zip = require('gulp-zip')

const filterDirs = () => {
  return es.map((file, cb) => file.stat.isFile() ? cb(null, file) : cb())
}

gulp.task('clean', (done) => {
  if (fs.existsSync(DIST)) {
    rmdir(DIST, done)
  } else {
    done()
  }
})

gulp.task('build', ['clean'], () => {
  let js = gulp.src('src/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(DIST))

  let manifest = gulp.src(['manifest/chrome.json'])
    .pipe(rename('manifest.json'))
    .pipe(jsoneditor({
      version: pkg.version
    }))
    .pipe(gulp.dest(DIST))

  let other = gulp.src(['src/**/*', '!src/**/*.js'])
    .pipe(filterDirs())
    .pipe(gulp.dest(DIST))

  return merge(js, manifest, other)
})

gulp.task('package', ['build'], () => {
  const commit = git.short()
  gulp.src('dist/*')
    .pipe(zip(`validity-${pkg.version}-${commit}.zip`))
    .pipe(gulp.dest(DIST))
})

gulp.task('default', ['build'])
