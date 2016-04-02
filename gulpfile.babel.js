import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import path from 'path';

const mixin_paths = {
  es6: ['src/*.js'],
  es5: 'dist',
  sourceRoot: path.join(__dirname, 'dist'),
};
const builders_paths = {
  es6: ['src/builders/*.js'],
  es5: 'dist/builders',
  sourceRoot: path.join(__dirname, 'dist'),
};

gulp.task('mixin_babel', () => {
  return gulp.src(mixin_paths.es6)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(mixin_paths.es5));
});

gulp.task('builders_babel', () => {
  return gulp.src(builders_paths.es6)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(builders_paths.es5));
});

gulp.task('watch', () => {
  gulp.watch(mixin_paths.es6, ['mixin_babel']);
  gulp.watch(builders_paths.es6, ['builders_babel']);
});

gulp.task('default', ['mixin_babel', 'builders_babel']);