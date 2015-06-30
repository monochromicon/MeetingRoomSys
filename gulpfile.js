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

gulp.task("connect", function () {
	connect.server({
		port: 80,
		root: "dist/public",
		livereload: true
	});
});

gulp.task("reload", function () {
	connect.reload();
});

gulp.task("default", ["build", "connect"], function () {
	gulp.watch("src/public/index.jade", ["build", "reload"]);
	gulp.watch("src/public/js/**.js", ["build", "reload"]);
	gulp.watch("src/public/less/**.less", ["build", "reload"]);
});