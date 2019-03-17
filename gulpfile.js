const path = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const packageImporter = require('node-sass-package-importer');

const paths = {
  src: path.join(process.cwd(), 'src'),
  styles: path.join(process.cwd(), 'src', 'styles'),
  components: path.join(process.cwd(), 'src', 'styles'),
  input: path.join(process.cwd(), 'src', 'styles', '*.scss'),
  output: path.join(process.cwd(), 'assets'),
};

const config = {
  importer: packageImporter({
    extensions: ['.scss', '.css'],
  }),
};

gulp.task('style', () =>
  gulp
    .src(paths.input)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(config).on('error', sass.logError))
    .pipe(postcss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.output)),
);

gulp.task('style:build', () =>
  gulp
    .src(paths.input)
    .pipe(sass(config).on('error', sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest(paths.output)),
);

gulp.task(
  'default',
  gulp.series('style', () => {
    gulp.watch([path.join(paths.src, '**', '*.scss')], gulp.task('style'));
  }),
);

gulp.task('build', gulp.series('style:build'));
