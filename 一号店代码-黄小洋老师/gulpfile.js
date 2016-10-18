//npm install -g gulp gulp-cli
//npm install
//gulp

var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var cssminify = require('gulp-minify-css');

var browserSync = require('browser-sync').create();

gulp.task('default', ['style'], function(){
  browserSync.init({
    server:{
      baseDir:'www/'
    },
    open:false
  })
  watch('style/**/*.css' , function(){
    gulp.start('style');
  });
  watch('www/**/*.html' , function(){
    browserSync.reload();
  })
})

gulp.task('style', function(){
  return gulp.src('style/**/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream());
})

