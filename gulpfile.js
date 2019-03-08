var gulp = require('gulp'),
   watch = require('gulp-watch'),
   sass = require('gulp-sass'),
   autoprefixer = require('autoprefixer'),
   browserSync = require('browser-sync'),
   cssnano = require('gulp-cssnano');

gulp.task('watch', function() {
   browserSync.init({
      server: {
         baseDir: "app"
      }
   });

   watch('app/index.html', function() {
      browserSync.reload();
   });

   watch('./app/sass/**/*.scss', function() {
      compileSass();
      injectCSS();
   });
});

function compileSass() {
   return gulp.src('app/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app/css'));
}

function injectCSS() {
   return gulp.src('./app/css/style.css')
      .pipe(browserSync.stream());
}