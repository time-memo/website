/* eslint-disable no-console */

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const sassVars = require('gulp-sass-vars');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const gulpHologram = require('gulp-hologram');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpNunjucks = require('gulp-nunjucks');
const yargs = require('yargs');
const browserSync = require('browser-sync').create();
const template = require('gulp-template');
const zip = require('gulp-zip');

let port = 8000;
let development = false;
const appVersion = (typeof (yargs.argv.appVersion) !== 'undefined') ? yargs.argv.appVersion : 'dev';

const sass = () => {
	return gulp.src('scss/style-*.scss')
		.pipe(sassVars({
			appVersion: appVersion,
		}, {verbose: true}))
		.pipe(gulpSass().on('error', gulpSass.logError))
		.pipe(gulp.dest('www/css'))
		.pipe(browserSync.stream());
};

const cssmin = () => {
	return gulp.src(['www/css/*.css', '!www/css/*.min.css'])
		.pipe(postcss([
			autoprefixer(),
			cssnano({
				reduceIdents: false,
			}),
		]))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('www/css'))
		.pipe(browserSync.stream());
};

const css = gulp.series(sass, cssmin);

const nunjucks = () => {
	return gulp.src([
		'html/**/*.njk',
		'!html/components/*.njk',
	])
		.pipe(gulpNunjucks.compile({}))
		.pipe(rename({extname: '.html'}))
		.pipe(gulp.dest('temp/html/'));
};

const htmlmin = () => {
	let stream = gulp.src([
		'temp/html/**/*.html',
		//'manifest.json',
	]);

	if (development) {
		stream = stream.pipe(template({
			version: '@dev',
		}));
	}

	return stream.pipe(gulpHtmlmin({
		collapseWhitespace: true,
	})).pipe(gulp.dest('www'))
		.pipe(browserSync.stream());
};

const html = gulp.series(nunjucks, htmlmin);

// Documentation
const hologram = () => {
	return gulp.src('docs/hologram/config.yml')
		.pipe(gulpHologram({
			bundler: true,
			logging: true,
		}));
};

const server = () => {
	return browserSync.init({
		open: false,
		port: port,
		//https: true,
		server: {
			baseDir: "www",
		},
	});
};

const watch = (callback) => {
	gulp.watch(['scss/**/*.scss'], {interval: 500}, gulp.parallel(css/*, hologram*/));
	gulp.watch(['html/**/*.njk'], {interval: 500}, html);

	callback();
};

const setDevelopmentEnvironment = (callback) => {
	development = true;
	callback();
};

const buildZip = () => {
	return gulp.src('production/build/**/*')
		.pipe(zip('ticha-website.zip'))
		.pipe(gulp.dest('production/release/'));
};


const production = gulp.series(gulp.parallel(css, html)/*, hologram*/);

const defaultTask = gulp.series(setDevelopmentEnvironment, production, gulp.parallel(watch, server));


module.exports.package = buildZip;
module.exports.production = production;
module.exports.default = defaultTask;
