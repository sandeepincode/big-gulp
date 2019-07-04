var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browsersync = require('browser-sync').create();

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

function browserSyncReload(done){
    browsersync.reload();
    done();
}

gulp.task('css', function () {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browsersync.stream());
});

gulp.task('js', function () {
    return gulp.src(['./js/plugins/*.js', './js/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browsersync.stream());
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('css'));
    gulp.watch('./js/**/*.js', gulp.series('js'));
    gulp.watch("./**/*.html",browserSyncReload);
});

// gulp.task('dev', gulp.series('css', 'js', 'watch'));
// gulp.task('dev', gulp.series('watch'));
// gulp.task('default', ['sass', 'js', 'webpack']);

gulp.task('watch', gulp.series(gulp.parallel('css', 'js'), gulp.parallel('watch', browserSync)));
