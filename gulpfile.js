const gulp = require("gulp");
const less = require('gulp-less');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const del = require('del');



const paths = {
  styles: {
    src: 'src/styles/**/*.less',
    dest: 'dist/styles/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/scripts/'
  },
  html: {
    src: 'src/index.html',
    dest: 'dist/'
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets/'
  }
};

function clean() {
  return del(['dist']);
}


function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src([
    'src/js/libs/jquery-3.7.1.min.js',
    'src/js/libs/inputmask.dependencyLib.min.js',
    'src/js/libs/inputmask.min.js',
    'src/js/libs/popper.min.js',
    'src/js/libs/tippy-bundle.umd.min.js',
    'src/js/libs/swiper-bundle.min.js',
    'node_modules/wow.js/dist/wow.min.js',
    paths.scripts.src], { sourcemaps: true })
    .pipe(uglify())
    .pipe(babel())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

function assets() {
  return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}


const build = gulp.series(clean, gulp.parallel(html, styles, scripts, assets));

exports.default = build;

exports.watch = watch;