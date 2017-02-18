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
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
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
        ignoreSheets : [/fonts.googleapis/]
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
  gulp.watch('app/css/main.css', ['prefix']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', ['babel', browserSync.reload]);
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

gulp.task('images', () => {
  return gulp.src('app/images/**/*.(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

// CLEANING
gulp.task('clean', () => {
  return del.sync('dist').then((cb) => {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', () => {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// BUILD SEQUENCES
gulp.task('default', (callback) => {
  runSequence('sass', 'babel', 'watch',
    callback
  );
});

gulp.task('build', (callback) => {
  runSequence(
    'clean:dist',
    'sass',
    'babel',
    ['useref', 'images'],
    callback
  );
});

// Push build to gh-pages
gulp.task('deploy', ['build'], () => {
	gulp.src('package.json')
    .pipe(prompt.prompt({
      type: 'input',
      name: 'commit',
      message: 'Enter commit message'
    }, (res) => {
      return gulp.src('dist/**/*')
      .pipe(deploy({
        message: res
      }));
    }));
});
