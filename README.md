# classy-gulp

<img height="257" width="121" src="https://gist.githubusercontent.com/ParallelUniv3rse/69350bdcdb19ba9b180025cbaa71e8ef/raw/84690005c12e32fb586b42382b33fc896a5b178f/classy-gulp.svg?sanitize=true">

Classy gulp is a written on top of Gulp's undertaker-registry, which enables you to write your gulpfiles in a more readable manner with ES6 classes.

## Getting Started

Install the latest version from npm: 

* `npm install classy-gulp --save-dev`

### Usage
**WARNING: do not name any of your class methods `init`. `init` as an internal undertaker-registry method and your method will be replaced.**

In your gulpfile.js:

```javascript
const gulp = require('gulp'),
  ClassyGulp = require('classy-gulp');
 
class MyGulp extends ClassyGulp {
  constructor() {
    super();
  }
  
  // override the defineTasks function to return an object of your tasks. This is going to be called automatically by classy-gulp.
  defineTasks() {
     return {
       scripts: this.scripts,
       build: gulp.parallel(this.styles, 'scripts'),
       watch: this.watch,
       deploy: gulp.series('build'),
       default: gulp.series('build', 'watch'),
     };
   }
   
  scripts(){
      /* handling babel etc. */ 
  }
   
  styles(){
      /* handling sass etc. */  
  }
   
  watch(done) {
     gulp.watch('src/**/*.scss', this.styles);
     gulp.watch('src/**/*.js', gulp.series('scripts', /* reload browser etc. */));
     done();
  }
}
 
// register the regitstry instance with gulp.
gulp.registry(new MyGulp());
```

## Documentation

### MyClass extends ClassyGulp {

#### this.defineTasks
Type: `function`
Return: `Object`

A function returning an Object of tasks to be registered. An Object of `taskName: taskFunction` pairs.

example:
```javascript
defineTasks() {
  return {
    scripts: this.scripts,
    build: gulp.parallel(this.styles, 'scripts'),
    watch: this.watch,
    deploy: gulp.series('build'),
    default: gulp.series('build', 'watch'),
  };
}
```
### }
### Dependencies

* [undertaker-forward-reference](https://www.npmjs.com/package/undertaker-forward-reference)

## Development

Just download the package and run

```
npm install
```

## Built With

* [undertaker-forward-reference](https://www.npmjs.com/package/undertaker-forward-reference) - Enables to use gulp tasks before they're registered.
* [undertaker-registry](https://www.npmjs.com/package/undertaker-registry) - The core which classy-gulp extends. A dependency of undertaker-forward-reference.

## Contributing

* Javascript follows ESLint rules listed in the [.eslintrc.json](.eslintrc.json) file.
* Feel free to fork the repo and make pull requests :) 

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

* **UNCHAINED.studio** - *Initial work* - [https://unchained.studio](https://unchained.studio)

See also the list of [contributors](https://github.com/unchained/classy-gulp/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details  
