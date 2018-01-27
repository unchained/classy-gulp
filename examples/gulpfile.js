const gulp = require('gulp'),
  del = require('del'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  nodemon = require('gulp-nodemon'),
  ClassyGulp = require('classy-gulp');

class MyGulp extends ClassyGulp {
  constructor() {
    super();
    console.log('starting gulp...');
  }

  /**
   * @return {Object} - return all tasks to be registered.
   */
  defineTasks() {
    return {
      scripts: this.scripts,
      build: gulp.series(this.clean, gulp.parallel(this.styles, 'scripts')),
      server: gulp.series(this.server, this.startBrowserSync, (done) => {
        done();
      }),
      watch: this.watch,
      deploy: gulp.series('build'),
      default: gulp.series('build', 'server', 'watch'),
    };
  }

  /**
   * Runs everything we need to do with CSS.
   */
  styles() {
    return gulp.src('src/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream({match: '**/*.{css|map}'}));
  }

  /**
   * Runs everything we need to do with JS.
   */
  scripts() {
    // handle scripts
  }

  /**
   * Watches for changes and automatically performs a given task depending on the type of file changed.
   * @param {function} [done] - An automatically assigned and invoked callback to signal asynchronius completion
   */
  watch(done) {
    gulp.watch('src/**/*.scss', this.styles);
    gulp.watch('src/**/*.js', gulp.series('scripts', this.reload));
    done();
  }

  /**
   *      ========= BrowserSync =========
   */

  /**
   * Starts the browsersync proxy server
   * @param {function} [done] - An automatically assigned and invoked callback to signal asynchronius completion
   */
  startBrowserSync(done) {
    browserSync.init(/* options */);
    done();
  }

  /**
   * Reloads the whole page via browsersync
   * @param {function} [done] - An automatically assigned and invoked callback to signal asynchronius completion
   */
  reload(done) {
    browserSync.reload();
    done();
  }

  /**
   *      ======== Nodemon ========
   */

  /**
   * Initializes a nodemon server
   * @param {function} [done] - An automatically assigned and invoked callback to signal asynchronous completion
   */
  server(done) {
    let called = false;
    const server = nodemon(/* options */);

    server.on('start', () => {
      if (!called) {
        called = true;
        done();
      }
    });
  }

  /**
   *      ======== Misc ========
   */

  /**
   * cleans the dist directory
   */
  clean(done) {
    del.sync('dist');
    done();
  }
}

// register the regitstry instance with gulp.
gulp.registry(new MyGulp());
