const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const testBrowserSync = require('browser-sync').create();
const karma = require('karma').Server;
const path = require('path');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');

const reload = browserSync.reload;

gulp.task('default', ['scripts', 'watch', 'browser-sync', 'browserTest']);

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build'));
});

gulp.task('browserTest', ['scripts'], () => {
  testBrowserSync.init({
    server: {
      baseDir: ['./src', './jasmine'],
      index: 'SpecRunner.html'
    },
    port: 6060,
    ui: false,
    ghostMode: false
  });
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: ['./src', './src/frontend'],
      index: 'index.html',
    },
    port: process.env.PORT || 6000,
    ui: false,
    ghostMode: false

  });
});

gulp.task('karma', ['scripts'], (done) => {
  karma.start({
    configFile: path.resolve('karma.conf.js'),
    singleRun: true
  }, () => {
    done();
  });
});

gulp.task('watch', ['browser-sync', 'browserTest'], () => {
  gulp.watch('./src/frontend/index.html').on('change', reload);
  gulp.watch('./src/frontend/js/*.js', browserSync.reload);
  gulp.watch('./src/frontend/css/*.css', browserSync.reload);
  gulp.watch(['./src/inverted-index.js', './jasmine/spec/*.js'], ['scripts']);
  gulp.watch(['./src/inverted-index.js', './jasmine/spec/*.js'], testBrowserSync.reload);
});

gulp.task('test', ['scripts', 'karma']);
