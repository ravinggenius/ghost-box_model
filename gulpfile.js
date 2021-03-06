var gulp = require('gulp');

var clean = require('gulp-clean');

var replace = require('gulp-replace');

var filter = require('gulp-filter');

var zip = require('gulp-zip');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var uglify = require('gulp-uglify');

var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');


var source = {
	markup: 'source/**/*.hbs',
	scripts: [
		'vendor/**/*.js',
		'source/assets/scripts/**/*.js'
	],
	styles: [
		'vendor/**/*.css',
		'source/assets/styles/**/*.scss'
	],
	static: [
		'source/**/*',
		'!source/**/*.hbs',
		'!source/assets/scripts/**/*.js',
		'!source/assets/styles/**/*.scss',
		'LICENSE.txt',
		'package.json',
		'README.md'
	]
};

var destination = {
	all: 'build/**/*',
	markup: 'build',
	scripts: 'build/assets/scripts',
	styles: 'build/assets/styles',
	static: 'build'
};

var package = {
	destination: 'packages',
	name: 'box-model-' + require('./package.json').version + '.zip'
};


gulp.task('clean', function () {
	return gulp.src(destination.all, { read: false })
		.pipe(clean());
});

gulp.task('lint', function () {
	return gulp.src(source.scripts)
		.pipe(filter('vendor'))
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});


gulp.task('build:markup', function () {
	return gulp.src(source.markup)
		.pipe(replace(/\n+[\t ]*/g, ''))
		.pipe(gulp.dest(destination.markup));
});

gulp.task('build:scripts', function () {
	return gulp.src(source.scripts)
		.pipe(uglify())
		.pipe(gulp.dest(destination.scripts));
});

gulp.task('build:styles', function () {
	return gulp.src(source.styles)
		.pipe(sass({
			outputStyle: 'nested'
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(destination.styles));
});

gulp.task('build:static', function () {
	return gulp.src(source.static)
		.pipe(gulp.dest(destination.static));
});

gulp.task('build', [ 'clean' ], function () {
	return [
		'build:markup',
		'build:scripts',
		'build:styles',
		'build:static'
	].map(function (taskName) {
		return gulp.tasks[taskName].fn();
	});
});


gulp.task('archive', [ 'lint' ], function () {
	return gulp.src(destination.all)
		.pipe(zip(package.name))
		.pipe(gulp.dest(package.destination));
});

gulp.task('watch', function () {
	gulp.watch(source.markup, [ 'build:markup' ]);
	gulp.watch(source.scripts, [ 'build:scripts' ]);
	gulp.watch(source.styles, [ 'build:styles' ]);
	gulp.watch(source.static, [ 'build:static' ]);
});

gulp.task('default', [ 'lint', 'build', 'watch' ]);
