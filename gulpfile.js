const $ = require('jquery');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const uncss = require('gulp-uncss');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const pngquant = require('gulp-pngquant');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const prompt = require('gulp-prompt');
const deploy = require('gulp-gh-pages');

// DEV TASKS

// BrowserSync Server
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

// Compile Sass
gulp.task('sass', () => {
  return gulp.src('app/sass/main.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(uncss({
        html: ['app/index.html'],
        ignore: ['.navbar.open', '.top-bar-open', '.middle-bar-open', '.bottom-bar-open', '.previews-open', '.active'],
        ignoreSheets: [/fonts.googleapis/]
    }))
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass'], () =>{
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', ['babel', browserSync.reload]);
});

// OPTIMIZATION TASKS

// Optimizing CSS and JS
gulp.task('useref', () => {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel', () => {
  return gulp.src(['app/js/**/*.js', '!app/js/babel/**'])
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('app/js/babel'));
});


// BUILD TASKS
gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('video', () => {
  return gulp.src('app/video/*')
    .pipe(gulp.dest('dist/video'));
});

gulp.task('fonts', () => {
  return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('work', () => {
		return gulp.src(['app/work/**/**/*'])
			.pipe(gulp.dest('dist/work'))
});

// CLEANING
gulp.task('clean', () => {
  return del.sync('dist').then((cb) => {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', () => {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*', '!dist/video', '!dist/video/**/*']);
});

// BUILD SEQUENCES
gulp.task('default', (callback) => {
  runSequence('sass', 'babel', 'watch',
    callback
  );
});

gulp.task('folders', () => {
  runSequence('video', 'fonts', 'work');
});

gulp.task('build', (callback) => {
  runSequence(
    'clean:dist',
    'sass',
    'babel',
    ['useref', 'images', 'folders'],
    callback
  );
});

// Push build to gh-pages
gulp.task('deploy', ['build'], () => {
  return gulp.src('dist/**/**/**/*')
    .pipe(deploy());
});
