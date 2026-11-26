"use strict";

const gulp = require("gulp");
const { src, series, parallel, dest, watch } = require("gulp");
const terser = require("gulp-terser");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const hb = require("gulp-hb");
const concat = require('gulp-concat');
const layouts = require("handlebars-layouts");

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

function clean() {
  return require("node:fs/promises").rm("dist", { recursive: true, force: true });
}

// Copy demo, img, js, fonts folders from src to dist
function copy() {
  return src([...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts], {
      base: "./src", encoding: false
    })
    .pipe(dest("dist"));

}

function copyJS() {
  return src(srcPaths.scripts).pipe(dest("dist/js"));
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
  return src(srcPaths.styles, { sourcemaps: true })

    .pipe(
      sass({
        precision: 10,
        outputStyle: "compressed"
      })
    )
    .pipe(rename({ suffix: ".min" }))

    .pipe( dest("./dist/css", { sourcemaps: "./maps" }) );
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

    // 'src/js/app.js',
    // 'src/js/settings.js'
  ], { sourcemaps: true })

      .pipe(concat('bundle.js'))
      .pipe(terser())

      .pipe(dest('dist/js', { sourcemaps: '.' }));
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

const build = parallel(hbs, styles, copy, copyJS, jsTask);
exports.build = build;
exports.default = series(clean, build);
