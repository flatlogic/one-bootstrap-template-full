"use strict";

const gulp = require("gulp");
const { src, series, parallel, dest, watch } = require("gulp");
const del = require("del");
const prettier = require('gulp-prettier');
const terser = require("gulp-terser");
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
  return src([...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts], {
      base: "./src"
    })
    .pipe(dest("dist"));

  cb();
}

async function copyJS(cb) {
  return src(srcPaths.scripts).pipe(dest("dist/js"));
  cb();
}

// Handle handlebars
function hbs() {
  // gulp.task("hbs", function() {
  return src(srcPaths.templates)
    .pipe(
      hb({
        partials: srcPaths.partials,
        helpers: srcPaths.helpers
      })
    )
    .pipe(rename({ extname: ".html" }))
    .pipe( dest("dist") );
}

// Handle sass
function styles() {
  return src(srcPaths.styles)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        precision: 10,
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./maps"))
    .pipe( dest("./dist/css") );
}

function jsTask() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery-pjax/jquery.pjax.js',
    'node_modules/popper.js/dist/umd/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/bootstrap/js/dist/util.js',
    'node_modules/widgster/widgster.js',
    'node_modules/hammerjs/hammer.js',
    'node_modules/jquery-slimscroll/jquery.slimscroll.js',
    'node_modules/jquery-hammerjs/jquery.hammer.js',

    // 'src/js/app.js',
    // 'src/js/settings.js'
  ])
      .pipe(prettier({ semi: true }))
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/js'));
}

// Development
exports.watch = function watch() {
  gulp.watch(srcPaths.scripts, series(copyJS));
  gulp.watch(srcPaths.styles, series(styles));
  gulp.watch([...srcPaths.templates, ...srcPaths.partials], series(hbs));
  gulp.watch(
    [...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts],
    series(copy)
  );
};

gulp.task( "build", parallel(hbs, styles, copy, copyJS, jsTask) );

// Build Task
function build(cb) {
  return parallel(clean, "build");
  cb();
}

// Default Task
gulp.task("default", gulp.parallel( clean, "build") );
