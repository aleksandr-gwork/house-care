"use strict";

const { src, dest, watch, series } = require("gulp");
const less = require('gulp-less');
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const concatCss = require("gulp-concat-css");

exports.less = function () {
  return src("./src/less/*.less")
    .pipe(less())
    .pipe(concatCss("style.css"))
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./dist/css"));
};

exports.watch = function () {
  watch("./src/less/*.less", series("less"));
};
