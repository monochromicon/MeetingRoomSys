var gulp = require("gulp"),
	minHTML = require("gulp-minify-html"),
	minCSS = require("gulp-minify-css"),
	jade = require("gulp-jade"),
	less = require("gulp-less"),
	uglify = require("gulp-uglify"),
	connect = require("gulp-connect");
	
gulp.task("build", function() {
	gulp.src("src/public/index.jade")
		.pipe(jade())
		.pipe(minHTML())
		.pipe(gulp.dest("dist/public/"));
		
	gulp.src("src/server.js")
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest("dist/"));
		
	gulp.src("src/public/js/**.js")
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest("dist/public/js/"));
		
	gulp.src("src/public/less/**.less")
		.pipe(less())
		.pipe(minCSS())
		.pipe(gulp.dest("dist/public/css/"));
});