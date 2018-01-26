var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    data = require('gulp-data'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
    order = require('gulp-order'),
    watch = require("gulp-watch"),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    gulpPugBeautify = require('gulp-pug-beautify'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    include = require("gulp-include"),
    browserSync = require('browser-sync'),
    prefix = require('gulp-autoprefixer');

var
source = '_application/',
dest = 'build/',
bower = 'bower_components/',
json = source + 'template/include/elements/girls_list_variables.json',
bower_components = {
    jquery: bower + 'jquery/',
    modernizer: bower + 'modernizer/',
    tether: bower + 'tether/',
    bootstrap: bower + 'bootstrap/',
    iCheck: bower + 'iCheck/',
    slickSlider: bower + 'slick-carousel/slick/',
    hover: bower + 'hover/',
    animate: bower + 'animate-sass/',
    FontAwesome: bower + 'components-font-awesome/',
    FontAwesomeAnimation: bower + 'font-awesome-animation/',
},
path = {
    pug: {
        compile: source + 'template/*.pug'
    },
    css: {
        in: [source + 'scss/main.scss'],
        out: dest + 'styles/css/',
        sassOpts: {
            outputStyle: 'nested',
            precison: 3,
            errLogToConsole: true
        },
        sassOptsMin: {
            outputStyle: 'compressed',
            precison: 3,
            errLogToConsole: true
        }
    },
    js: {
        in: source + 'js/**/*.*',
        out: dest + 'js/',
        lib_jQuery: bower_components.jquery + 'dist/jquery.min.js',
        lib_modernizer: bower_components.modernizer + 'modernizr.js',
        lib_tehter: bower_components.tether + 'dist/js/tether.min.js',
        lib_bootstrap: bower_components.bootstrap + 'dist/js/bootstrap.min.js',
        // bower_components.slickSlider + 'dist/js/slick.min.js',
        lib_iCheck: bower_components.iCheck + 'icheck.min.js'
    },
    img: {
        in: source + 'images/**/*.*',
        out: dest + 'images/'
    },
    fonts: {
        in: source + 'fonts/**/*.*',
        out: dest + 'fonts/',

        font_awesome_fonts: bower_components.FontAwesome + 'fonts/**/*.*',
        font_awesome_out: dest + 'fonts/FontAwesome/'
    },
    watch: {
        pug: source+'template/**/*.pug',
        js: source+'js/**/*.*',
        css: source + 'scss/**/*',
        bootstrapCSS: source + 'scss/**/*',
        fonts: source + 'fonts/**/*',
        images: source + 'images/**/*.*'
    }
},
js_libs = [
        path.js.lib_jQuery,
        path.js.lib_modernizer,
        path.js.lib_tehter,
        path.js.lib_bootstrap,
        path.js.lib_iCheck
];

//---------------------------------------------------------
// ---------------------- TASKS ---------------------------
//---------------------------------------------------------

// SCSS
gulp.task('sass', [/*'sass_source',*/ 'sass_min'], function () {
    return gulp.src(path.css.in)
                .pipe(plumber())
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
                .pipe(concat('styles.сss'))
                .pipe(sass(path.css.sassOpts).on('error', sass.logError))
                .pipe(sourcemaps.write('../maps/'))
                .pipe(gulp.dest(path.css.out));
});
gulp.task('sass_source', ['sass_min'], function () {
    return gulp.src(path.css.in)
                .pipe(plumber())
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
                .pipe(sass(path.css.sassOpts).on('error', sass.logError))
                .pipe(sourcemaps.write('maps/'))
                .pipe(gulp.dest(path.css.out + 'source/'));
});
gulp.task('sass_min', function () {
    return gulp.src(path.css.in)
                .pipe(plumber())
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
                .pipe(sass(path.css.sassOptsMin).on('error', sass.logError))
                .pipe(rename('styles.min.css'))
                .pipe(sourcemaps.write('../maps/'))
                .pipe(gulp.dest(path.css.out))
                .pipe(browserSync.reload({stream: true}));
});
// JADE (PUG)
gulp.task('pug', function () {
    // console.log("-- JADE (PUG) --");
    return gulp.src(path.pug.compile)
                .pipe(plumber())
                .pipe(data( function(file) {
                    return JSON.parse(
                        fs.readFileSync(json)
                    );
                }).on('error', console.log))
                .pipe(gulpPugBeautify({omit_empty: true}).on('error', console.log))
                .pipe(pug({pretty: true}).on('error', console.log))
                .pipe(gulp.dest(dest))
                .pipe(browserSync.reload({stream: true}));
});
// ECMA SCRIPT (JS)
gulp.task("scripts", ['scripts_min'], function() {
    return gulp.src([path.js.in])
                .pipe(plumber())
                .pipe(sourcemaps.init().on('error', console.log))
                .pipe(concat('script.js').on('error', console.log))
                .pipe(sourcemaps.write('maps/').on('error', console.log))
                .pipe(gulp.dest(path.js.out));
});
gulp.task("scripts_min", [/*'scripts_libs'*/], function() {
    return gulp.src([path.js.in])
                .pipe(sourcemaps.init().on('error', console.log))
                .pipe(concat('script.js').on('error', console.log))
                .pipe(uglify(
                    {
                        'ie8':true,
                    }
                ).on('error', console.log))
                .pipe(rename('script.min.js').on('error', console.log))
                .pipe(sourcemaps.write('maps/').on('error', console.log))
                .pipe(gulp.dest(path.js.out))
                .pipe(browserSync.reload({stream: true}));
});

gulp.task("scripts_libs", function() {
    return gulp.src(js_libs)
                .pipe(plumber())
                .pipe(sourcemaps.init())
                .pipe(concat('libs.js'))
                .pipe(uglify({'sourceMap':true}))
                .pipe(rename('libs.min.js'))
                .pipe(order([
                    path.js.lib_jQuery,
                    path.js.lib_modernizer,
                    path.js.lib_tehter,
                    path.js.lib_bootstrap,
                    path.js.lib_iCheck  
                ]))
                .pipe(sourcemaps.write('../maps/'))
                .pipe(gulp.dest(path.js.out + 'libs/'))
                .on('error', console.log)
                .pipe(browserSync.reload({stream: true}));
});

// IMAGES COPY
gulp.task('images', function () {
    // console.log("-- IMAGES COPY --");
    gulp.src(path.img.in)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.img.out))
        .pipe(browserSync.reload({stream: true}));
});
// FONTS COPY
gulp.task('awesome', function() {
    // console.log("-- FontAwesome COPY --");
    gulp.src(path.fonts.font_awesome_fonts)
    .pipe(gulp.dest(path.fonts.font_awesome_out));
});

gulp.task('fonts', ['awesome'], function() {
    // console.log("-- FONTS COPY --");
    gulp.src(path.fonts.in)
    .pipe(gulp.dest(path.fonts.out));
});

// Window reload on save
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

// default task
gulp.task('default', ['browser-sync', 'scripts', 'scripts_libs', 'fonts', 'images', 'pug', 'sass'], function () {
     gulp.watch(path.watch.css, ['sass']);
     gulp.watch(path.watch.bootstrapCSS, ['sass']);
     gulp.watch(path.watch.pug, ['pug']);
     gulp.watch(path.watch.js, ['scripts']);
     gulp.watch(path.watch.fonts, ['fonts']);
     gulp.watch(path.watch.images, ['images']);
    console.log("-- WATCH FINISH --");
});
