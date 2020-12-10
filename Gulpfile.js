const Gulp = require("gulp");
const concat = require("gulp-concat");

const prefix = require("gulp-autoprefixer");

const sass = require("gulp-sass");

const Pug = require("gulp-pug");

const sourcemaps = require("gulp-sourcemaps");

const zip = require("gulp-zip");

const imagemin = require("gulp-imagemin");



Gulp.task("pug", () => {
    return Gulp
        .src("./src/pages/**/*.pug")
        .pipe(Pug({
            pretty: true
        }))
        .pipe(Gulp.dest("dist/pages"))
})



Gulp.task("sass", function () {
    return Gulp
        .src("./src/assets/styles/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(prefix("last 2 versions"))
        .pipe(sourcemaps.write("."))
        .pipe(Gulp.dest("dist/assets/css"))
});

// JavaScript Task For Every Organization
Gulp.task("js", function () {
    return Gulp
        .src("./src/assets/js/**/*.js")
        .pipe(sourcemaps.init())
        // .pipe(concat("scripts.js"))
        // .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(Gulp.dest("dist/assets/js"))

});

// Images Minify Task For Every Organization
Gulp.task("imagesminify", function () {
    return Gulp
        .src("./src/assets/images/**/*")
        .pipe(imagemin())
        .pipe(Gulp.dest("dist/assets/images"))
});


// Compress Task
Gulp.task("compress", function () {
    return Gulp.src("dist/**/*.*").pipe(zip("theme.zip")).pipe(Gulp.dest("."));
});

Gulp.task("watch", () => {
    Gulp.watch("./src/pages/**/*.pug", Gulp.series("pug"));
    Gulp.watch("./src/template/**/*.pug", Gulp.series("pug"));
    Gulp.watch("./src/assets/styles/*.scss", Gulp.series("sass"));
    Gulp.watch("./src/assets/styles/sass/**/*.scss", Gulp.series("sass"));
    Gulp.watch("./src/assets/js/**/*.js", Gulp.series("js"));
    Gulp.watch("./src/assets/images/**/*", Gulp.series("imagesminify"));
    // Gulp.watch("dist/**/*.*", Gulp.series("compress"));
})