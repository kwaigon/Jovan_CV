var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');





gulp.task('copy-folder', function() {  
  gulp.src('./source/*.**')
    .pipe(gulp.dest('./www/'));
    

});

gulp.task('copy-folder-js', function() {  
  gulp.src('./source/js/*.**')
    .pipe(gulp.dest('./www/js/'));
    

});

gulp.task('copy-folder-img', function() {  
  gulp.src('./source/img/*.**')
    .pipe(gulp.dest('./www/img/'));
    

});

gulp.task('sass', function () {
  gulp.src('./source/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/css'))
    .pipe(browserSync.stream());
});

// gulp.task('default', ['serve']);

var reload  = browserSync.reload;

gulp.task('php', function() {
    php.server({ base: './www', port: 8010, keepalive: true});
});



// // Static Server + watching scss/html files
gulp.task('default', ['sass','copy-folder','copy-folder-js'], function() {

    browserSync.init({
        //server: "./www/"
        server: "./www/",
        notify: false
    });



    gulp.watch("./source/sass/*.scss", ['sass']);
    // gulp.watch("./source/*.html").on('change', browserSync.reload);
    gulp.watch("./source/js/*.js", ['copy-folder-js', browserSync.reload]);

    gulp.watch('./source/*.html', ['copy-folder','copy-folder-img',browserSync.reload]);

   
});