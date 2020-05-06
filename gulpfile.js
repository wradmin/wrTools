const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const csso = require("gulp-csso");
const terser = require("gulp-terser-js");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");

// ===================================
// SERVER
// ===================================

// Dev Server
gulp.task("dev", function() {
  browserSync.init({
    server: "src",
    host: "192.168.0.104",
    reloadDelay: 0,
    reloadDebounce: 100,
    notify: false,
  });

  gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
  gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
});

// Prod server
gulp.task("prod", function() {
  browserSync.init({
    server: "build",
    host: "192.168.0.104",
    reloadDelay: 0,
    reloadDebounce: 100,
    notify: false,
  });
});



// ===================================
// DEV TASKS
// ===================================

// Sass compilation
gulp.task("sass", function() {
  return gulp.src("src/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});



// ===================================
// BUILD TASKS
// ===================================

// Build step 1: Clean "build" folder
gulp.task("build-folder-clean", function() {
  return gulp.src("build/*")
    .pipe(clean());
});

// Build step 2: CSS min + autoprefixer + transfer
gulp.task("build-css-min", function() {
  return gulp.src("src/css/main.css")
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso())
    .pipe(gulp.dest("build/css/"));
});

// Build step 3: JS min + transfer
gulp.task("build-js-min", function() {
  return gulp.src("src/js/main.js")
    .pipe(terser())
    .pipe(gulp.dest("build/js/"));
});

// Build step 4: HTML min + transfer
gulp.task("build-html-min", function() {
  return gulp.src("src/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build/"));
});

// Build step 5: images transfer
gulp.task("build-img-transfer", function() {
  return gulp.src("src/img/*.*")
    .pipe(gulp.dest("build/img/"));
});

// Build task
gulp.task("build", gulp.series("build-folder-clean", "build-css-min", "build-js-min", "build-html-min", "build-img-transfer"));