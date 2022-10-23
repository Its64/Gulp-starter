const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const sync = require('browser-sync').create()

function scss() {
	return src('./src/scss/style.scss')
		.pipe(sass())
		.pipe(csso())
		.pipe(concat('style.css'))
		.pipe(dest('./dist/css'))
}

function html() {
	return src('./src/index.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
    	.pipe(dest('./dist'));
}

function js() {
	return src('./src/js/script.js')
		.pipe(minify())
		.pipe(dest('./dist/js'))
}

function serve() {
	sync.init({
		server: './dist',
	})

	watch('./src/index.html', series(html)).on('change', sync.reload)
	watch('./src/scss/style.scss', series(scss)).on('change', sync.reload)
	watch('./src/js/script.js', series(js)).on('change', sync.reload)
}

exports.build = series(scss, html, js)
exports.serve = series(scss, html, serve)
exports.scss = scss
exports.html = html
exports.js = js