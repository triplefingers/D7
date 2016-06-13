var gulp = require("gulp");
var webpack = require('webpack-stream');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var eslint = require("gulp-eslint");
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  server: ["server/**/*.js"],
  client: ["client/**/*.js", "client/**/*.html", "!client/bundle.js"]
};

gulp.task("babel", () => {
  gulp.src(paths.server)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"))
});

gulp.task("webpack", () => {
  gulp.src("./client/index.js")
  .pipe(webpack(require("./webpack.config.js")))
  .pipe(gulp.dest("./client/"))
});

gulp.task("eslint", () => {
  gulp.src([paths.server[0], paths.client[0], "!node_modules/**"])
  .pipe(eslint({
    parser: "babel-eslint"
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

gulp.task('watch', () => {
  gulp.watch(paths.server, ["babel"]);
  gulp.watch(paths.client, ["webpack"]);
});

gulp.task("start", () => {
  nodemon({
    script: "build/server.js",
    watch: ["**/*"]
  })
});

gulp.task("default", ["babel", "webpack", "watch", "start"]);
