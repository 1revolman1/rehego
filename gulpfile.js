var syntax = "scss", // Syntax: sass or scss;
  gulpVersion = "4"; // Gulp version: 3 or 4
gmWatch = false; // ON/OFF GraphicsMagick watching "img/_src" folder (true/false). Linux install gm: sudo apt update; sudo apt install graphicsmagick

var gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer"),
  notify = require("gulp-notify"),
  rsync = require("gulp-rsync"),
  del = require("del");

// Local Server
gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
  });
});

// Sass|Scss Styles
gulp.task("styles", function() {
  return gulp
    .src("app/" + syntax + "/**/*." + syntax + "")
    .pipe(sass({ outputStyle: "compact" }).on("error", sass.logError))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

// JS
gulp.task("scripts", function() {
  return gulp
    .src(["app/js/index.js"])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

// HTML Live Reload
gulp.task("code", function() {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});

// If Gulp Version 4
if (gulpVersion == 4) {
  gulp.task("watch", function() {
    gulp.watch(
      "app/" + syntax + "/**/*." + syntax + "",
      gulp.parallel("styles")
    );
    gulp.watch(["libs/**/*.js", "app/js/common.js"], gulp.parallel("scripts"));
    gulp.watch("app/*.html", gulp.parallel("code"));
  });
  gmWatch
    ? gulp.task(
        "start",
        gulp.parallel("styles", "scripts", "browser-sync", "watch")
      )
    : gulp.task(
        "start",
        gulp.parallel("styles", "scripts", "browser-sync", "watch")
      );
}
