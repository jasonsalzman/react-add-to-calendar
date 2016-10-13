var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var scssLint = require('gulp-scss-lint');
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');
var karma = require('gulp-karma');
var eslint = require('gulp-eslint');


gulp.task('sass', function () {
  return gulp
    .src('src/styles/ReactAddToCalendar.scss')
    .pipe(gulp.dest('dist/react-add-to-calendar.css'))
  ;
});

gulp.task('sass', function () { // WARNING: potential duplicate task
  return gulp
    .src('src/styles/ReactAddToCalendar.scss')
    .pipe(gulp.dest('dist/react-add-to-calendar.min.css'))
  ;
});

gulp.task('watch', function () {
  gulp.watch('{src,test,docs-site/src}/**/*.{js,jsx}', [ /* dependencies */ ]);
});

gulp.task('watch', function () {
  gulp.watch('*.js', [ /* dependencies */ ]);
});

gulp.task('watch', function () {
  gulp.watch('**/*.scss', [ /* dependencies */ ]);
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.jsx', [ /* dependencies */ ]);
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', [ /* dependencies */ ]);
});

gulp.task('watch', function () {
  gulp.watch('test/**/*.jsx', [ /* dependencies */ ]);
});

gulp.task('watch', function () {
  gulp.watch('test/**/*.js', [ /* dependencies */ ]);
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', [ /* dependencies */ ]);
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.jsx', [ /* dependencies */ ]);
});

gulp.task('scsslint', function () {
  return gulp
    .src('src/styles/*.scss,docs-site/src/*.scss')
  ;
});

gulp.task('test', function (done) {
  karma.start(

  , done);
});

gulp.task('eslint', function () {
  return gulp
    .src('{src,test,docs-site/src}/**/*.{js,jsx},*.js')
  ;
});

gulp.task('webpack', function () {
  return gulp
    .src('[object Object]')
    .pipe(gulp.dest('unmin'))
  ;
});

gulp.task('webpack', function () { // WARNING: potential duplicate task
  return gulp
    .src('[object Object]')
    .pipe(gulp.dest('min'))
  ;
});

gulp.task('webpack', function () { // WARNING: potential duplicate task
  return gulp
    .src('[object Object]')
    .pipe(gulp.dest('docs'))
  ;
});

gulp.task('default', ["watch","scsslint"]);

gulp.task('travis', ["eslint","karma","scsslint"]);

gulp.task('build', ["scsslint","babel","webpack","sass"]);

