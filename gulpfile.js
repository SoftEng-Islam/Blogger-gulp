
const gulp = require('gulp');
const clean = require('gulp-clean');
const gulpBabel = require('gulp-babel');
const gulpBabelMinify = require('gulp-babel-minify');
const gulpFileInclude = require('gulp-file-include');
const gulpRename = require('gulp-rename');
const gulpReplace = require('gulp-replace');
const gulpStripComments = require('gulp-strip-comments');
const gulpTokenReplace = require('gulp-token-replace');
const terserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const postcss = require('gulp-postcss');
const packages = './package.json';
const cleanCSS = require('gulp-clean-css');
const cssnano = require("cssnano");
var uglify = require('gulp-uglify');
// const  csso =  require('csso');
// var xmlescape = require('xml-escape');
// const entities = require("entities");
// var xml = require('gulp-xml');
// const csso = require('postcss-csso');
// const minify = require('gulp-minify');



// Clean everything inside ./build directory
gulp.task('clean', () => {
    return gulp.src('./build/*', { read: false }).pipe(clean());
});

var options = {

          aroundSelectorRelation: true,
          beforeBlockBegins: true,
          beforeValue: true,
          removeWhitespace: false,
    }


// Generate styles
gulp.task('styles', () => {
    return gulp.src('./src/assets/tailwind.css')
        .pipe(postcss([
            require('tailwindcss'),
            require('@tailwindcss/forms'),
            require('@tailwindcss/typography'),
            require('autoprefixer'),
            cssnano()
        ]))
        // .pipe(cleanCSS(options))
        .pipe(gulpRename('styles.min.css'))
        .pipe(gulp.dest('./build/styles/'));

});



// Generate scripts
gulp.task('scripts', () => {
    const sources = ['./build/scripts/scripts.js',];

    return gulp.src(sources)
        .pipe(webpackStream({
            mode: 'production',
            output: {
                clean: true,
                filename: 'bundle.js'
            },
            optimization: {
                minimize: true,
                minimizer: [
                    new terserWebpackPlugin({
                        extractComments: false,
                        terserOptions: {
                            mangle: true,
                            compress: true,
                            format: {
                                comments: false,
                            },
                        },
                    })
                ],
            },
            watch: false
        }, webpack))
        .pipe(gulp.dest('./build/scripts'));
});

gulp.task('scripts:babel', () => {
    const sources = [
		'./src/assets/scripts.js',
    ];
    return gulp.src(sources)
        .pipe(gulpBabel())
        .pipe(uglify())
        .pipe(gulpBabelMinify({
            mangle: {
                keepClassName: false
            },
            evaluate: true,
            builtIns: true,
            removeDebugger: true,
            removeConsole: true
        }))
        .pipe(gulp.dest('./build/scripts'));

});


var replace = require('gulp-replace');

// Remove all comments
gulp.task('comments', () => {
    const sources = ['./dist/theme.xml'];

    return gulp.src(sources)
        .pipe(gulpStripComments({ trim: true }))
        .pipe(replace(/\[\&/g, '[&amp;'))
        // .pipe(xml({
        //     parseOpts: { trim: true },
        //     buildOpts: {
        //         renderOpts: { pretty: false },
        //         allowSurrogateChars: true,
        //         cdata: true
        //     },
        // }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('start', () => {
    const tokenData = require(packages);
    const sources = ['./src/index.html'];

    return gulp.src(sources)
        .pipe(gulpTokenReplace({
            global: tokenData
        }))
        .pipe(gulpFileInclude({
            indent: true,
            basepath: '@@file',
            prefix: '@@'
        }))
        .pipe(gulpReplace('-tw', ''))
        .pipe(gulpRename({
            basename: 'theme',
            extname: '.xml'
        }))

        .pipe(gulp.dest('./dist'));
});



// Final task: Production Mode
gulp.task('build:production', gulp.series(
    'clean',
    'styles',
    'scripts:babel',
    'scripts',
    'start',
    'comments'
));

function watchFiles() {
    gulp.watch(
        `./src/**/*.{html,js,css}`,
        gulp.series('build:production')
    );
}

// Final task: Development Mode
gulp.task('build:development', gulp.series(
    'clean',
    'styles',
    'scripts',
    'start'
));


exports.default = gulp.series(
    watchFiles // Watch for Live Changes
);
