const { src, dest, watch, series, parallel } = require("gulp");
const gulpScss = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const del = require("del");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const cache = require("gulp-cache");
const autoprefixer = require("gulp-autoprefixer");
const gulpPug = require("gulp-pug");
const browserSync = require("browser-sync").create();

function scss() {
    return src("src/scss/main.scss")
        .pipe(gulpScss())
        .pipe(
            autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
                cascade: true,
            })
        )
        .pipe(dest("build/css"));
}

function cssMin() {
    return src("build/css/main.css")
        .pipe(cssnano({ zindex: false }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("build/css"));
}

function cssLibMin() {
    return src([
        "./node_modules/normalize.css/normalize.css",
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        // "./node_modules/owl.carousel/dist/assets/owl.carousel.min.css",
        // "./node_modules/slick-carousel/slick/slick.css",
        // "./node_modules/slick-carousel/slick/slick-theme.css",
        //"./libs/jquery-ui/jquery-ui.min.css",
        "./node_modules/animate.css/animate.css",
        // "./node_modules/simplebar/dist/simplebar.min.css",
        //"./node_modules/air-datepicker/dist/css/datepicker.min.css",
        // "./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css",
    ])
        .pipe(concat("css-libs.min.css"))
        .pipe(dest("build/libs"));
}

function moveJs() {
    return src("src/js/**/*").pipe(dest("build/js"));
}

function jsMin() {
    return src("src/js/**/*")
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("build/js"));
}

function jsLibrariesMin() {
    return src([
        "./node_modules/jquery/dist/jquery.min.js",
        // "./libs/jquery-2.2.4.min.js",
        //"./libs/jquery-ui/jquery-ui.min.js",
        //"./node_modules/jquery-lazy/jquery.lazy.min.js",
        //"./libs/jquery.waterwheelCarousel.min.js",
        // "./node_modules/owl.carousel/dist/owl.carousel.min.js",
        // "./node_modules/slick-carousel/slick/slick.min.js",
        "./node_modules/@popperjs/core/dist/umd/popper.js",
        "./node_modules/bootstrap/dist/js/bootstrap.js",
        // "./node_modules/jquery-waypoints/waypoints.min.js",
        // "./node_modules/simplebar/dist/simplebar.min.js",
        //"./node_modules/inputmask/dist/jquery.inputmask.min.js",
        //"./node_modules/air-datepicker/dist/js/datepicker.min.js",
        // "./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",
    ])
        .pipe(concat("js-libs.min.js"))
        .pipe(uglify())
        .pipe(dest("build/libs"));
}

function images() {
    return src("src/images/**/*")
        .pipe(
            cache(
                imagemin({
                    interlaced: true,
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [pngquant()],
                })
            )
        )
        .pipe(dest("build/images"));
}

function pug() {
    return src("src/**/*.pug")
        .pipe(
            gulpPug({
                pretty: true,
            })
        )
        .pipe(dest("build/"));
}

function clean() {
    return del("build");
}

function fonts() {
    return src("src/fonts/**/*").pipe(dest("build/fonts"));
}

function favicon() {
    return src("src/*.ico").pipe(dest("build"));
}

// Production Build
exports.build = series(
    clean,
    images,
    cssLibMin,
    scss,
    cssMin,
    jsLibrariesMin,
    moveJs,
    jsMin,
    pug,
    fonts,
    favicon
);

/* Dev part */

function reloadFonts() {
    return src("src/fonts/**/*")
        .pipe(dest("build/fonts"))
        .pipe(browserSync.stream());
}

function reloadJs() {
    return src("src/js/**/*")
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("build/js"))
        .pipe(browserSync.stream());
}

function reloadImages() {
    return src("src/images/**/*")
        .pipe(
            cache(
                imagemin({
                    interlaced: true,
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [pngquant()],
                })
            )
        )
        .pipe(dest("build/images"))
        .pipe(browserSync.stream());
}

function reloadPug() {
    return src("src/**/*.pug")
        .pipe(
            gulpPug({
                pretty: true,
            })
        )
        .pipe(dest("./build/"))
        .pipe(browserSync.stream());
}

function reloadCss() {
    return src("src/scss/main.scss")
        .pipe(gulpScss().on("error", gulpScss.logError))
        .pipe(dest("./build/css/"))
        .pipe(browserSync.stream());
}

function reloadCssMin() {
    return src("build/css/main.css")
        .pipe(cssnano({ zindex: false }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("build/css"))
        .pipe(browserSync.stream());
}

function browsersync() {
    browserSync.init({
        server: { baseDir: "./build" },
        notify: false,
        online: true,
    });
}

function watchDev() {
    watch("./src/**/*.scss", series(reloadCss, reloadCssMin));
    watch("./src/**/*.pug", series(reloadPug));
    watch("./src/images/**/*", series(reloadImages));
    watch("./src/js/**/*", series(reloadJs));
    watch("./src/fonts/**/*", series(reloadFonts));
}

exports.watch = parallel(browsersync, watchDev);
