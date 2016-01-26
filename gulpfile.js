var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssnano'),
    browserSync = require("browser-sync"),
    htmlMin = require('gulp-htmlmin'),
    plumber = require('gulp-plumber'),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        js: './dist/assets/js/',
        css: './dist/assets/css/',
        html: './dist/'
    },
    copyBaseJs: [
        './bower_components/requirejs/require.js',
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/backbone-amd/backbone-min.js',
        './bower_components/underscore-amd/underscore-min.js'
    ],
    src: { //Пути откуда брать исходники
        js: 'src/assets/js/**/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/assets/sass/*.scss',
        html: 'src/*.html'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/*.html',
        js: 'src/assets/js/**/*.js',
        style: 'src/assets/sass/*.scss'
    },
    copyTemplates: 'src/assets/js/templates/*.tpl',
    clean: './dist/'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9300,
    logPrefix: "Frontend_Build"
};



gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('copyLibsJs', function () {
    gulp.src(path.copyBaseJs)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/assets/js/libs/'))
});

gulp.task('copyTemplates', function () {
    gulp.src(path.copyTemplates)
        .pipe(plumber())
        .pipe(htmlMin())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/assets/js/templates/'))
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber())
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'js:build',
    'style:build',
    'html:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('default', ['copyLibsJs', 'copyTemplates', 'build', 'webserver', 'watch']);