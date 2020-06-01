"use strict";

const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const hb = require("gulp-hb");
const concat = require('gulp-concat');
const layouts = require("handlebars-layouts");
const runSequence = require("run-sequence");
const sourcemaps = require("gulp-sourcemaps");

const srcPaths = {
  scripts: ["./src/js/**/*"],
  fonts: ["./src/fonts/**/*"],
  images: ["./src/img/**/*"],
  styles: ["./src/sass/*.scss"],
  cssEntries: "./src/sass/application.scss",
  static: ["./src/demo/**/*"],
  templates: ["src/*.hbs", "src/pages/**/*.hbs"],
  partials: ["./src/partials/*.hbs"],
  helpers: [
    "./node_modules/handlebars-layouts/index.js",
    "./src/helpers/index.js"
  ]
};

hb.handlebars.registerHelper(layouts(hb.handlebars));

async function clean(cb) {
  return del(["dist/*"]);
  cb();
}

// Copy demo, img, js, fonts folders from src to dist
async function copy(cb) {
  return gulp
    .src([...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts], {
      base: "./src"
    })
    .pipe(gulp.dest("dist"));

  cb();
}

async function copyJS(cb) {
  return gulp.src(srcPaths.scripts).pipe(gulp.dest("dist/js"));
  cb();
}

// Handle handlebars
function hbs() {
  // gulp.task("hbs", function() {
  return gulp
    .src(srcPaths.templates)
    .pipe(
      hb({
        partials: srcPaths.partials,
        helpers: srcPaths.helpers
      })
    )
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("dist"));
}

// Handle sass
function styles() {
  return gulp
    .src(srcPaths.styles)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        precision: 10,
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./dist/css"));
}

// function bundle() {
//     return gulp.src([
//         'node_modules/jquery/dist/jquery.min.js',
//         'node_modules/jquery-pjax/jquery.pjax.js',
//         'node_modules/popper.js/dist/umd/popper.js',
//         'node_modules/bootstrap/dist/js/bootstrap.js',
//         'node_modules/bootstrap/js/dist/util.js',
//         'node_modules/widgster/widgster.js',
//         'node_modules/hammerjs/hammer.js',
//         'node_modules/jquery-slimscroll/jquery.slimscroll.js',
//         'node_modules/jquery-hammerjs/jquery.hammer.js',
//         // 'src/js/app.js',
//         // 'src/js/settings.js',
//         // 'node_modules/apexcharts/dist/apexcharts.js'
//     ])
//         .pipe(concat('bundle.js'))
//         .pipe(gulp.dest('./dist/js')); //Destination where file to be exported
// }

// Development
exports.watch = function watch() {
  gulp.watch(srcPaths.scripts, gulp.series(copyJS));
  gulp.watch(srcPaths.styles, gulp.series(styles));
  gulp.watch([...srcPaths.templates, ...srcPaths.partials], gulp.series(hbs));
  gulp.watch(
    [...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts],
    gulp.series(copy)
  );
};

gulp.task("build", gulp.parallel( hbs, styles, copy, copyJS));


// Build Task
function build(cb) {
  return gulp.parallel(clean, "build");
  cb();
}


// Default Task
gulp.task("default", gulp.parallel(clean, "build"));
