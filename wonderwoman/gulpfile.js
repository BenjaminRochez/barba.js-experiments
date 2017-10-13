var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require ('gulp-autoprefixer');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
    return gulp.src('views/*.pug')
        .pipe(pug(
            {pretty: true}
        ))
        .pipe(gulp.dest('./'));
});

gulp.task('server', ['sass', 'pug'], function() {
    browserSync.init({
        server: true
    });
    gulp.watch("assets/sass/**/*.scss", ['sass']);
    gulp.watch("views/*/**.pug", ['pug']);
    gulp.watch("views/*.pug", ['pug']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.css").on('change', browserSync.reload);
});


gulp.task('sass', function() {
    return gulp.src("assets/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', function(err) {
            notify({
                title: 'Wow a css bug'
            }).write(err.line + ': ' + err.message);
            return this.emit('end');
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(""))
        .pipe(browserSync.stream());
});


gulp.task('default', ['server']);
