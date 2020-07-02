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
  styles: ["./src/sass/*.scss", "./src/sass/application.scss"],
  cssEntries: "./src/sass/application.scss",
  static: ["./src/demo/**/*"],
  templates: ["src/*.hbs", "src/pages/**/*.hbs"],
  partials: ["./src/partials/*.hbs"],
  helpers: [
    "./node_modules/handlebars-layouts/index.js",
    "./src/helpers/index.js"
  ],
  jsLibs: [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery-pjax/jquery.pjax.js',
    'node_modules/popper.js/dist/umd/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/bootstrap/js/dist/util.js',
    'node_modules/widgster/widgster.js',
    'node_modules/hammerjs/hammer.js',
    'node_modules/jquery-slimscroll/jquery.slimscroll.js',
    'node_modules/jquery-hammerjs/jquery.hammer.js',
    'src/js/settings.js',
    'src/js/app.js',

    // Index
    'node_modules/apexcharts/dist/apexcharts.js',

    // Visits
    'node_modules/underscore/underscore.js',
    'node_modules/d3/d3.min.js',
    'node_modules/raphael/raphael.min.js',
    'node_modules/jquery-mapael/js/jquery.mapael.js',
    'node_modules/jquery-mapael/js/maps/usa_states.js',
    'node_modules/jquery-mapael/js/maps/world_countries.js',
    'node_modules/jquery.animate-number/jquery.animateNumber.min.js',
    'node_modules/jquery-mousewheel/jquery.mousewheel.js',

    // E-commerce
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/bootstrap-slider/dist/bootstrap-slider.min.js',

    // EMail
    'node_modules/underscore/underscore-min.js',
    'node_modules/backbone/backbone.js',
    'node_modules/underscore/underscore-min.js',
    'node_modules/summernote/dist/summernote.js',

    // Carousel
    'node_modules/owl.carousel/dist/owl.carousel.js',

    // List group
    'node_modules/components-jqueryui/jquery-ui.min.js',
    'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js',
    'node_modules/jquery-nestable/jquery.nestable.js',

    // Notifications
    'node_modules/messenger/build/js/messenger.js',
    'node_modules/messenger/build/js/messenger-theme-flat.js',
    'node_modules/messenger/docs/welcome/javascripts/location-sel.js',

    // Table dynamic
    'node_modules/backbone.paginator/lib/backbone.paginator.min.js',
    'node_modules/backgrid/lib/backgrid.js',
    'node_modules/backgrid-paginator/backgrid-paginator.js',
    'node_modules/datatables/media/js/jquery.dataTables.js',
    'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',

    // Form elements
    'node_modules/jquery-autosize/jquery.autosize.min.js',
    'node_modules/select2/dist/js/select2.min.js',
    'node_modules/switchery/dist/switchery.min.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js',
    'node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js',
    'node_modules/jasny-bootstrap/js/inputmask.js',
    'node_modules/jasny-bootstrap/js/fileinput.js',
    'node_modules/holderjs/holder.js',
    'node_modules/dropzone/dist/min/dropzone.min.js',
    'node_modules/markdown/lib/markdown.js',
    'node_modules/bootstrap-markdown/js/bootstrap-markdown.js',
    'node_modules/parsleyjs/dist/parsley.min.js',
    'node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js',
    'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
    'node_modules/jasny-bootstrap/js/inputmask.js',
    'node_modules/bootstrap-application-wizard/src/bootstrap-wizard.js',

    // Charts
    'node_modules/jquery-sparkline/jquery.sparkline.js',
    'node_modules/d3/d3.min.js',
    'node_modules/rickshaw/rickshaw.min.js',
    'node_modules/flotanimator/jquery.flot.animator.min.js',
    'node_modules/flot/jquery.flot.js',
    'node_modules/flot-orderbars/js/jquery.flot.orderBars.js',
    'node_modules/flot/jquery.flot.selection.js',
    'node_modules/flot/jquery.flot.time.js',
    'node_modules/nvd3/build/nv.d3.min.js',
    'node_modules/morris.js/morris.min.js',
    'node_modules/easy-pie-chart/dist/jquery.easypiechart.min.js',

    'node_modules/flot/jquery.flot.pie.js',
    'node_modules/flot/jquery.flot.stack.js',
    'node_modules/flot/jquery.flot.crosshair.js',
    'node_modules/flot/jquery.flot.symbol.js',

    // Grid
    'node_modules/components-jqueryui/ui/jquery-1-7.js',
    'node_modules/components-jqueryui/ui/widget.js',
    'node_modules/components-jqueryui/ui/data.js',

    'node_modules/components-jqueryui/ui/widgets/mouse.js',
    'node_modules/components-jqueryui/ui/widgets/droppable.js',
    'node_modules/components-jqueryui/ui/plugin.js',
    'node_modules/components-jqueryui/ui/widgets/draggable.js',

    'node_modules/components-jqueryui/ui/scroll-parent.js',
    'node_modules/components-jqueryui/ui/widgets/sortable.js',
    'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js',

    // Maps
    'node_modules/gmaps/gmaps.js',
    'node_modules/jvectormap/jquery-jvectormap.min.js',
    'node_modules/jvectormap/tests/assets/jquery-jvectormap-world-mill-en.js',

    // Gallery
    'node_modules/shufflejs/dist/shuffle.min.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
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
  return src([...srcPaths.jsLibs])
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
