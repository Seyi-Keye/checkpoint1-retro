const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const testBrowserSync = require('browser-sync').create();
const karma = require('karma').Server;
const path = require('path');
const rename = require('gulp-rename');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');


const reload = browserSync.reload;

gulp.task('default', ['scripts', 'watch', 'browser-sync', 'browserTest']);

gulp.task('scripts', () => {
  browserify({ debug: true })
  .transform(babelify, {
        // Use all of the ES2015 spec
    presets: ['es2015'],
    sourceMaps: true })
  .require('./src/app.js', { entry: true })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./src'));
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
      baseDir: ['./src'],
      index: 'index.html',
    },
    port: process.env.PORT || 6001,
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
  gulp.watch('./src/index.html').on('change', reload);
  gulp.watch('./src/bundle.js', browserSync.reload);
  gulp.watch('./src/css/*.css', browserSync.reload);
  gulp.watch(['./src/inverted-index.js', './jasmine/spec/*.js'], ['scripts']);
  gulp.watch(['./src/inverted-index.js', './jasmine/spec/*.js'], testBrowserSync.reload);
});

gulp.task('test', ['scripts', 'karma']);
