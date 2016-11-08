/**
 * Created by user on 08.11.2016.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var clean = require('gulp-clean');

gulp.task('sass', function () {
    return gulp.src('./app/**/*.sass')
        .pipe(sass({}).on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('./'));
});


gulp.task('sass:watch', function () {
    gulp.watch('./app/**/*.sass', ['sass']);
});

gulp.task("clean", function(){
    gulp.src(['style.css'])
        .pipe(clean())
})
gulp.task('default', ['clean', 'sass','sass:watch'])