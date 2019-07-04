var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browsersync = require('browser-sync').create();
var imagemin = require("gulp-imagemin");

// Browser Sync Config
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

// CSS Task
gulp.task('css', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browsersync.stream());
});

// JS Task
gulp.task('js', function () {
    return gulp.src(['./js/plugins/*.js', './js/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browsersync.stream());
});

// Compression Image Task
gulp.task('img', function () {
    return gulp.src(['./img/**'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browsersync.stream());
});

// Watch Process
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('css'));
    gulp.watch('./js/**/*.js', gulp.series('js'));
    gulp.watch('./img/**', gulp.series('img'));
    gulp.watch('./**/*.html',browserSyncReload);
});

const build = gulp.series(gulp.parallel('css', 'js'), 'img');

gulp.task('dev', gulp.series(gulp.parallel(build, browserSync, 'watch')));

gulp.task('prod', gulp.series(build, browserSync));
